/* 그림으로 읽는 성경 — 전시 페이지 공통 그리기 코드
   window.VCS_EXHIBIT(사이트 쪽 자료)와 번역문을 받아 페이지를 그린다.
   번역문은 공개용 window.VCS_TEXT, 또는 검토용 window.VCS_REVIEW(링크의 #review= 열쇠로만 열림)에서 온다.
   그림 확대 보기는 홍지훈의 「수태고지 그림 확대 보기」를 바탕으로 했다.
   번역문은 언제나 textContent로만 넣는다. */
(function () {
  'use strict';
  const calm = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  const narrow = () => window.matchMedia ? window.matchMedia('(max-width: 900px)').matches : false;
  const smooth = () => (calm.matches ? 'auto' : 'smooth');

  function el(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k of Object.keys(attrs)) {
        const v = attrs[k];
        if (v === null || v === undefined || v === false) continue;
        if (k === 'class') e.className = v;
        else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
        else e.setAttribute(k, v === true ? '' : String(v));
      }
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid === null || kid === undefined || kid === false) continue;
      e.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return e;
  }

  /* 낱말 풀이 말풍선 */
  const pop = {
    box: null, owner: null,
    ensure() {
      if (this.box) return;
      this.box = el('div', { class: 'vx-pop', role: 'dialog', 'aria-label': '낱말 풀이', hidden: true });
      document.body.append(this.box);
      document.addEventListener('click', e => { if (this.owner && !this.box.contains(e.target) && e.target !== this.owner) this.close(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape' && this.owner) { const o = this.owner; this.close(); o.focus(); } });
      window.addEventListener('resize', () => this.close());
    },
    open(btn, g) {
      this.ensure();
      if (this.owner === btn) { this.close(); return; }
      this.close();
      this.box.replaceChildren(el('b', null, g.t), el('span', null, g.d));
      this.box.hidden = false;
      const r = btn.getBoundingClientRect();
      const w = Math.min(340, window.innerWidth * 0.86);
      const left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8));
      this.box.style.left = (left + window.scrollX) + 'px';
      this.box.style.top = (r.bottom + window.scrollY + 6) + 'px';
      btn.setAttribute('aria-expanded', 'true');
      this.owner = btn;
    },
    close() {
      if (!this.box) return;
      this.box.hidden = true;
      if (this.owner) this.owner.setAttribute('aria-expanded', 'false');
      this.owner = null;
    }
  };

  function glossify(str, used, list) {
    const out = [];
    let rest = str;
    while (rest) {
      let best = null;
      for (const g of list) {
        if (used.has(g.t)) continue;
        const i = rest.indexOf(g.t);
        if (i >= 0 && (!best || i < best.i)) best = { i, g };
      }
      if (!best) { out.push(rest); break; }
      if (best.i > 0) out.push(rest.slice(0, best.i));
      const g = best.g;
      used.add(g.t);
      out.push(el('button', { type: 'button', class: 'vx-gl', 'aria-expanded': 'false', title: '낱말 풀이 보기', onclick: e => { e.stopPropagation(); pop.open(e.currentTarget, g); } }, g.t));
      rest = rest.slice(best.i + g.t.length);
    }
    return out;
  }

  const segsOf = v => (v === undefined || v === null ? null : Array.isArray(v) ? v : [String(v)]);
  const charCount = segs => segs.reduce((a, s) => a + (typeof s === 'string' ? s.length : (s && s.tn ? s.tn.length : 0)), 0);

  /* 그림 확대 보기 하나 */
  function Viewer(id, sec, nWorks, onPick) {
    const im = sec.image, self = this;
    this.id = id; this.sec = sec;
    this.W0 = im.ref; this.H0 = im.ref * im.h / im.w; this.SMAX = im.smax || 6;
    this.by = new Map((sec.spots || []).map(s => [s.n, s]));
    this.order = (sec.spots || []).map(s => s.n);
    this.v = { s: 1, tx: 0, ty: 0 }; this.W = 1; this.H = 1; this.active = null; this.anim = 0;

    this.img = el('img', { src: im.lo, alt: im.alt, decoding: 'async' });
    this.world = el('div', { class: 'vx-world' }, this.img);
    this.boxes = el('div');
    this.ov = el('div', { class: 'vx-ov' });
    this.pins = [];
    for (const s of sec.spots || []) {
      s.pins.forEach((q, i) => {
        const b = el('button', { type: 'button', class: 'vx-pin', 'data-n': s.n, 'data-i': i, 'aria-label': `${s.n}번 문장: ${s.label}` }, String(s.n));
        b.addEventListener('click', () => { if (!self.moved) onPick(s.n, 'pin'); });
        this.pins.push(b); this.ov.append(b);
      });
    }
    this.ov.append(this.boxes);
    this.load = el('div', { class: 'vx-load' }, '고화질 그림을 불러오는 중');
    this.stage = el('div', { class: 'vx-stage', role: 'group', tabindex: '0', 'aria-label': `${sec.work.title} 확대 보기. 번호 단추를 누르면 그 부분으로 다가갑니다.` }, this.world, this.ov, this.load);
    this.stage.style.setProperty('--ar', String(im.w / im.h));
    const zb = (label, txt, fn) => el('button', { type: 'button', 'aria-label': label, onclick: fn }, txt);
    this.ctl = el('div', { class: 'vx-ctl' },
      zb('줄이기', '−', () => this.zoomAt(1 / 1.6, this.W / 2, this.H / 2, 300)),
      zb('키우기', '+', () => this.zoomAt(1.6, this.W / 2, this.H / 2, 300)),
      zb('그림 전체 보기', '전체', () => onPick(null, 'home')),
      el('span', { class: 'hint' }, '끌어서 옮기기 · 두 손가락이나 Ctrl+휠로 확대'));
    const w = sec.work;
    this.cap = el('p', { class: 'vx-cap' }, el('b', null, w.artist), el('br'), `${w.title}, ${w.date}`, el('br'), `${w.medium} · ${w.place}`);
    this.card = el('div', { class: 'vx-spot', 'aria-live': 'polite' });
    this.root = el('div', { class: 'vx-viewer' }, this.stage, this.ctl, this.cap, this.card);
    this.root.style.setProperty('--ar', String(im.w / im.h));
    this.onPick = onPick;
    this.showCard();
    this.bind();
    this.loadHi();
  }
  Viewer.prototype = {
    measure() { const r = this.stage.getBoundingClientRect(); this.W = r.width || 1; this.H = r.height || 1; },
    clamp(t) {
      const s = Math.min(this.SMAX, Math.max(1, t.s));
      return { s, tx: Math.min(0, Math.max(this.W - s * this.W, t.tx)), ty: Math.min(0, Math.max(this.H - s * this.H, t.ty)) };
    },
    sx(x) { return this.v.tx + this.v.s * x / this.W0 * this.W; },
    sy(y) { return this.v.ty + this.v.s * y / this.H0 * this.H; },
    draw() {
      const v = this.v;
      this.world.style.transform = `translate(${v.tx}px,${v.ty}px) scale(${v.s})`;
      for (const p of this.pins) {
        const q = this.by.get(+p.dataset.n).pins[+p.dataset.i];
        p.style.left = this.sx(q[0]) + 'px'; p.style.top = this.sy(q[1]) + 'px';
      }
      this.boxes.replaceChildren();
      const a = this.by.get(this.active);
      if (a) {
        a.boxes.forEach((b, j) => {
          const d = el('div', { class: 'vx-box' });
          d.style.left = this.sx(b[0]) + 'px'; d.style.top = this.sy(b[1]) + 'px';
          d.style.width = (this.sx(b[2]) - this.sx(b[0])) + 'px'; d.style.height = (this.sy(b[3]) - this.sy(b[1])) + 'px';
          const t = a.tags ? a.tags[j] : '';
          if (t) {
            const at = (a.tagAt && a.tagAt[j]) || 'above';
            const cls = at === 'under' ? (this.sy(b[3]) > this.H - 26 ? ' in' : ' under') : (this.sy(b[1]) < 26 ? ' in' : '');
            d.append(el('span', { class: 'vx-tag' + cls }, t));
          }
          this.boxes.append(d);
        });
      }
      this.stage.classList.toggle('zoomed', v.s > 1.01);
    },
    go(t, ms) {
      t = this.clamp(t); cancelAnimationFrame(this.anim);
      if (calm.matches || !ms) { this.v = t; this.draw(); return; }
      const f = { ...this.v }, t0 = performance.now();
      const step = now => {
        const k = Math.min(1, (now - t0) / ms), e = k < 0.5 ? 4 * k * k * k : 1 - ((-2 * k + 2) ** 3) / 2;
        this.v = { s: f.s + (t.s - f.s) * e, tx: f.tx + (t.tx - f.tx) * e, ty: f.ty + (t.ty - f.ty) * e };
        this.draw(); if (k < 1) this.anim = requestAnimationFrame(step);
      };
      this.anim = requestAnimationFrame(step);
    },
    fit(boxes) {
      const W0 = this.W0, H0 = this.H0, W = this.W, H = this.H;
      const x0 = Math.min(...boxes.map(b => b[0])), y0 = Math.min(...boxes.map(b => b[1]));
      const x1 = Math.max(...boxes.map(b => b[2])), y1 = Math.max(...boxes.map(b => b[3]));
      const bw = (x1 - x0) / W0 * W, bh = (y1 - y0) / H0 * H;
      const s = Math.min(this.SMAX, Math.max(1, Math.min(W / (bw * 1.6), H / (bh * 1.6))));
      const cx = (x0 + x1) / 2 / W0 * W, cy = (y0 + y1) / 2 / H0 * H;
      return { s, tx: W / 2 - s * cx, ty: H / 2 - s * cy };
    },
    select(n, ms = 650) {
      this.measure();
      this.active = this.by.has(n) ? n : null;
      for (const p of this.pins) p.classList.toggle('dim', this.active !== null && +p.dataset.n !== this.active);
      this.showCard();
      this.go(this.active ? this.fit(this.by.get(this.active).boxes) : { s: 1, tx: 0, ty: 0 }, ms);
    },
    showCard() {
      const a = this.by.get(this.active), sec = this.sec;
      if (!a) {
        this.card.replaceChildren(
          el('p', { style: 'margin:0' }, '그림 위 번호는 해설의 문장 번호예요. 번호를 누르면 그 문장이 말하는 곳으로 다가갑니다.'),
          sec.viewNote ? el('p', { style: 'margin:6px 0 0;color:var(--muted);font-size:14px' }, sec.viewNote) : null,
          this.order.length ? el('div', { class: 'nav' }, el('button', { type: 'button', onclick: () => this.onPick(this.order[0], 'nav') }, `${this.order[0]}번부터 보기`)) : null);
        return;
      }
      const i = this.order.indexOf(a.n);
      const prev = i > 0 ? this.order[i - 1] : null, next = i < this.order.length - 1 ? this.order[i + 1] : null;
      this.card.replaceChildren(
        el('h3', null, el('span', { class: 'no' }, String(a.n)), a.label),
        a.look ? el('p', { class: 'look' }, el('b', null, '그림에서 볼 것'), a.look) : null,
        el('div', { class: 'nav' },
          el('button', { type: 'button', disabled: prev === null, onclick: () => prev !== null && this.onPick(prev, 'nav') }, '이전'),
          el('button', { type: 'button', disabled: next === null, onclick: () => next !== null && this.onPick(next, 'nav') }, '다음'),
          el('button', { type: 'button', onclick: () => this.onPick(null, 'home') }, '전체 그림'),
          el('button', { type: 'button', class: 'back', onclick: () => { const s = document.getElementById(`${this.id}-s${a.n}`); if (s) s.scrollIntoView({ behavior: smooth(), block: 'center' }); } }, '해설로 돌아가기')));
    },
    zoomAt(f, px, py, ms) {
      this.measure();
      const v = this.v, s = Math.min(this.SMAX, Math.max(1, v.s * f));
      this.go({ s, tx: px - (px - v.tx) * s / v.s, ty: py - (py - v.ty) * s / v.s }, ms);
    },
    loadHi() {
      const im = this.sec.image;
      const start = () => {
        const hi = new Image(); hi.src = im.hi;
        (hi.decode ? hi.decode() : Promise.resolve())
          .then(() => { this.img.src = hi.src; this.load.hidden = true; })
          .catch(() => { this.load.textContent = '고화질 그림을 불러오지 못해 작은 그림으로 보여 드려요'; });
      };
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); start(); } }, { rootMargin: '300px' });
        io.observe(this.stage);
      } else start();
    },
    bind() {
      const stage = this.stage, pts = new Map();
      let last = null;
      this.moved = false;
      stage.addEventListener('wheel', e => {
        if (!(e.ctrlKey || e.metaKey)) return;
        e.preventDefault(); cancelAnimationFrame(this.anim); this.measure();
        const r = stage.getBoundingClientRect();
        this.zoomAt(Math.exp(-e.deltaY * (e.deltaMode ? 0.05 : 0.0025)), e.clientX - r.left, e.clientY - r.top, 0);
      }, { passive: false });
      stage.addEventListener('dblclick', e => {
        if (e.target.closest('button')) return;
        const r = stage.getBoundingClientRect(); this.zoomAt(2, e.clientX - r.left, e.clientY - r.top, 300);
      });
      stage.addEventListener('pointerdown', e => { pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); this.moved = false; last = null; cancelAnimationFrame(this.anim); this.measure(); });
      stage.addEventListener('pointermove', e => {
        if (!pts.has(e.pointerId)) return;
        const prev = pts.get(e.pointerId), r = stage.getBoundingClientRect();
        pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pts.size === 1) {
          if (this.v.s <= 1.01) return;
          const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
          if (Math.abs(dx) + Math.abs(dy) > 2 && !this.moved) { this.moved = true; try { stage.setPointerCapture(e.pointerId); } catch (_) { } stage.classList.add('drag'); }
          if (this.moved) { this.v = this.clamp({ s: this.v.s, tx: this.v.tx + dx, ty: this.v.ty + dy }); this.draw(); }
        } else if (pts.size === 2) {
          const [a, b] = [...pts.values()], d = Math.hypot(a.x - b.x, a.y - b.y), m = { x: (a.x + b.x) / 2 - r.left, y: (a.y + b.y) / 2 - r.top };
          if (last) {
            this.moved = true;
            const s = Math.min(this.SMAX, Math.max(1, this.v.s * d / last.d));
            this.v = this.clamp({ s, tx: m.x - (last.m.x - this.v.tx) * s / this.v.s, ty: m.y - (last.m.y - this.v.ty) * s / this.v.s }); this.draw();
          }
          last = { d, m };
        }
      });
      const up = e => { pts.delete(e.pointerId); if (pts.size < 2) last = null; if (!pts.size) { stage.classList.remove('drag'); setTimeout(() => { this.moved = false; }, 0); } };
      stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
      this.root.addEventListener('keydown', e => {
        if (e.target.closest('input,textarea')) return;
        const i = this.order.indexOf(this.active);
        if (e.key === 'ArrowRight' && this.order.length) { e.preventDefault(); this.onPick(this.order[Math.min(this.order.length - 1, i + 1)], 'nav'); }
        else if (e.key === 'ArrowLeft' && i > 0) { e.preventDefault(); this.onPick(this.order[i - 1], 'nav'); }
        else if (e.key === 'Escape') this.onPick(null, 'home');
      });
      if ('ResizeObserver' in window) {
        new ResizeObserver(() => {
          const W = this.W, H = this.H, v = this.v;
          const cx = (W / 2 - v.tx) / (v.s * W), cy = (H / 2 - v.ty) / (v.s * H);
          this.measure();
          this.v = this.clamp({ s: v.s, tx: this.W / 2 - cx * v.s * this.W, ty: this.H / 2 - cy * v.s * this.H }); this.draw();
        }).observe(stage);
      }
      requestAnimationFrame(() => { this.measure(); this.draw(); });
    }
  };

  function render(root, ex, text, opts) {
    opts = opts || {};
    const T = text && text.exhibit === ex.id && text.sections ? text : null;
    const works = ex.order.filter(id => ex.sections[id].kind === 'work');
    const viewers = {};
    const gl = ex.glossary || [];
    const perMin = ex.readPerMinute || 500;
    const site = opts.site || window.VCS_SITE || { name: '그림으로 읽는 성경', sub: 'VCS 해설 한국어 번역', home: 'index.html' };
    const orig = opts.orig || null;
    root.replaceChildren();
    root.classList.remove('vx-en-on');

    const workLabel = id => { const s = ex.sections[id]; return s.kind === 'work' ? `그림 ${s.no}` : '비교 해설'; };
    let current = null;
    const mark = (id, n) => {
      if (current) current.classList.remove('on');
      current = n ? document.getElementById(`${id}-s${n}`) : null;
      if (current) current.classList.add('on');
      if (n && history.replaceState && !opts.preview) history.replaceState(null, '', `#${id}-s${n}`);
    };
    const api = {
      pick(id, n, from) {
        const vw = viewers[id];
        mark(id, n);
        if (vw) {
          vw.select(vw.by.has(n) ? n : null);
          if (from === 'text' && narrow() && vw.by.has(n)) vw.root.scrollIntoView({ behavior: smooth(), block: 'start' });
          if ((from === 'pin' || from === 'nav') && !narrow() && current) {
            const r = current.getBoundingClientRect();
            if (r.top < 0 || r.bottom > window.innerHeight) current.scrollIntoView({ behavior: smooth(), block: 'center' });
          }
        }
      },
      go(id, n) {
        const sec = document.getElementById(id);
        const vw = viewers[id];
        if (vw && vw.by.has(n)) {
          (narrow() ? vw.root : sec).scrollIntoView({ behavior: smooth(), block: 'start' });
          setTimeout(() => api.pick(id, n, 'map'), calm.matches ? 0 : 450);
        } else {
          const s = document.getElementById(`${id}-s${n}`);
          if (s) s.scrollIntoView({ behavior: smooth(), block: 'center' });
          mark(id, n);
        }
      }
    };

    /* 머리 */
    root.append(el('header', { class: 'vx-top' }, el('div', { class: 'vx-wrap' },
      el('div', { class: 'vx-bar' },
        el('nav', { class: 'vx-crumb', 'aria-label': '현재 위치' },
          el('a', { class: 'vx-brand', href: site.home }, el('b', null, site.name), el('small', null, site.sub)),
          el('span', { 'aria-hidden': 'true' }, '›'), el('span', null, ex.book)),
        el('a', { class: 'vx-pill', href: ex.vcs }, '원문 보기 (English) ↗')),
      el('p', { class: 'vx-ref' }, ex.passage.ko),
      el('h1', null, ex.title),
      el('p', { class: 'vx-orig', lang: 'en' }, ex.original),
      el('p', { class: 'vx-meta' }, `해설 ${ex.author} · 그림 ${works.length}점 · 옮긴이 ${ex.translator.ko}`))));

    root.append(el('div', { class: 'vx-notice' }, el('div', { class: 'vx-wrap' }, el('p', null,
      T ? `이 글은 Visual Commentary on Scripture(VCS, 킹스 칼리지 런던)의 전시 「${ex.original}」의 한국어 번역입니다. VCS의 허락을 받아 옮겼습니다. `
        : `Visual Commentary on Scripture(VCS, 킹스 칼리지 런던)의 전시 「${ex.original}」 한국어판을 준비하는 페이지입니다. `,
      el('a', { href: ex.vcs }, '원문 보기 →')))));

    const main = el('main', { class: 'vx-wrap vx-main', id: 'main' });
    root.append(main);

    if (opts.preview) {
      const bar = el('div', { class: 'vx-pending vx-review' },
        el('p', null, el('b', null, 'VCS 검토용 미리보기'), ' · ', el('span', { lang: 'en' }, 'Preview for review by the VCS — not yet published.')));
      if (orig) {
        const t = el('button', { type: 'button', class: 'vx-btn', 'aria-pressed': 'false', lang: 'en' }, 'Show English original · 영어 원문 보기');
        t.addEventListener('click', () => {
          const on = root.classList.toggle('vx-en-on');
          t.setAttribute('aria-pressed', String(on));
          t.textContent = on ? 'Hide English original · 영어 원문 숨기기' : 'Show English original · 영어 원문 보기';
        });
        bar.append(el('p', { class: 'vx-en-note', lang: 'en' }, 'Each Korean sentence carries the number of the sentence it translates. Switch on the original to read them side by side.'), t);
      }
      main.append(bar);
    }
    if (opts.reviewFailed) main.append(el('p', { class: 'vx-pending' }, '검토용 링크로 번역을 열지 못했어요. 링크가 끝까지 복사됐는지, 지금 올라가 있는 잠금 파일과 한 쌍인지 확인해 주세요. 파일을 막 올렸다면 1~2분 뒤에 다시 열어 보세요. · ', el('span', { lang: 'en' }, 'This preview link could not open the translation. If the file was just updated, please try again in a minute or two.')));
    if (!T) main.append(el('p', { class: 'vx-pending' }, '해설 번역은 VCS의 확인을 받은 뒤 이 자리에 실립니다. 지금은 문장 번호와 그림 속 자리만 보입니다.'));

    /* 본문과 구절 지도 */
    main.append(el('section', { class: 'vx-card vx-passage', 'aria-labelledby': 'vx-passage' },
      el('div', null, el('p', { class: 'vx-eyebrow' }, '본문'), el('h2', { id: 'vx-passage' }, ex.passage.ko)),
      el('div', { class: 'vx-btns' },
        el('a', { class: 'vx-btn solid', href: ex.passage.bible }, '개역개정으로 읽기 ↗'),
        el('a', { class: 'vx-btn', href: ex.vcs }, '영어 본문 (VCS) ↗'))));

    if (ex.verses && ex.verses.length) {
      main.append(el('section', { class: 'vx-card vx-map', 'aria-labelledby': 'vx-map' },
        el('h2', { id: 'vx-map' }, '구절 지도'),
        el('p', { class: 'vx-lead' }, '본문의 한 구절을 화가들은 어떻게 그렸을까요? 단추를 누르면 그 자리로 갑니다.'),
        el('ul', null, ex.verses.map(v => el('li', null,
          el('div', null, el('span', { class: 'v' }, v.v),
            v.desc ? el('span', { class: 'd' }, v.desc)
              : v.url ? el('a', { href: v.url }, el('q', null, v.text)) : el('q', null, v.text)),
          el('div', { class: 'go' }, v.go.map(([id, n]) => el('button', { type: 'button', class: 'vx-chip', onclick: () => api.go(id, n) }, `${workLabel(id)} · ${n}번`))))))));
    }

    /* 해설 한 편의 글 */
    const textBlock = (id, sec) => {
      const tsec = T && T.sections[id];
      const spotSet = new Set((sec.spots || []).map(s => s.n));
      const labels = new Map((sec.spots || []).map(s => [s.n, s.label]));
      const used = new Set();
      const box = el('div', { class: 'vx-text' });
      let chars = 0;
      const starts = sec.paras && sec.paras.length ? sec.paras : [1];
      for (let p = 0; p < starts.length; p++) {
        const a = starts[p], b = p + 1 < starts.length ? starts[p + 1] - 1 : sec.sentences;
        const para = el('p', tsec ? null : { class: 'vx-php' });
        for (let n = a; n <= b; n++) {
          const segs = tsec ? segsOf(tsec.s[String(n)]) : null;
          const span = el('span', { class: 'vx-s', id: `${id}-s${n}` });
          span.append(spotSet.has(n)
            ? el('button', { type: 'button', class: 'vx-sn', 'aria-label': `${n}번 문장: 그림에서 보기`, onclick: () => api.pick(id, n, 'text') }, String(n))
            : el('span', { class: 'vx-sn plain', title: '그림의 특정 부분을 말하지 않는 문장' }, String(n)));
          if (segs) {
            const en = orig && orig[id] && orig[id][String(n)];
            if (en) span.classList.add('has-en');
            for (const s of segs) {
              if (typeof s === 'string') span.append(...glossify(s, used, gl));
              else if (s && s.tn) span.append(el('span', { class: 'vx-tn' }, el('b', null, '옮긴이'), s.tn));
            }
            if (en) span.append(el('span', { class: 'vx-en', lang: 'en' }, en));
            chars += charCount(segs);
          } else {
            span.append(el('span', { class: 'vx-ph' }, el('i'), labels.has(n) ? `[번역 자리] ${labels.get(n)}` : '[번역 자리]'));
          }
          para.append(span, ' ');
        }
        box.append(para);
        if (sec.figure && sec.figure.after >= a && sec.figure.after <= b) box.append(figureBlock(sec.figure));
      }
      box.append(el('p', { class: 'vx-refs' }, '참고 문헌은 ', el('a', { href: sec.url || ex.vcs }, 'VCS 원문'), '에 그대로 있습니다.'));
      const minutes = tsec ? Math.max(1, Math.round(chars / perMin)) : 0;
      return { box, minutes, title: tsec && tsec.title };
    };

    const figureBlock = f => el('div', { class: 'vx-fig' },
      el('h3', null, f.title),
      el('p', { style: 'margin:0' }, f.lead),
      el('div', { class: 'row' }, f.items.map(it => el('figure', null,
        el('img', { src: it.src, alt: it.alt, width: it.w, height: it.h, loading: 'lazy' }),
        el('figcaption', null, it.cap)))),
      f.verses ? el('p', { style: 'margin:0' }, '성경 근거 (개역개정)') : null,
      f.verses ? el('ul', null, f.verses.map(v => el('li', null, el('a', { href: v.url }, v.ref), ` “${v.text}”`))) : null,
      f.credit ? el('p', { class: 'cr' }, creditNode(f.credit)) : null);

    /* 위키미디어 공용 출처 한 줄 */
    const fileLink = c => el('a', { href: c.url }, `위키미디어 공용 「${c.file}」`);
    const licNode = c => c.license
      ? [c.author ? `${c.author}, ` : '', c.licenseUrl ? el('a', { href: c.licenseUrl }, c.license) : c.license]
      : el('span', { class: 'vx-todo' }, '[사진가·라이선스를 적어 주세요]');
    const creditNode = cr => typeof cr === 'string' ? cr : [cr.text, ' 이미지: ',
      cr.files.map((f, i) => [i ? ', ' : '', fileLink(f), ' (', licNode(f), ')'])];

    const firstLook = txt => el('p', { class: 'vx-first' }, el('b', null, '먼저 보기'), el('span', null, txt), el('span', { class: 'vx-ours' }, '사이트 안내'));

    for (const id of ex.order) {
      const sec = ex.sections[id];
      const t = textBlock(id, sec);
      const sub = [sec.en, `해설 ${ex.author}`];
      if (t.minutes) sub.push(`읽는 시간 약 ${t.minutes}분`);
      if (sec.kind === 'work') {
        const ar = sec.image.w / sec.image.h;
        const layout = ar > 1.6 ? 'wide' : ar < 0.8 ? 'tall' : '';
        const vw = new Viewer(id, sec, works.length, (n, from) => api.pick(id, n, from));
        viewers[id] = vw;
        main.append(el('section', { class: 'vx-work', id, 'aria-labelledby': `${id}-h` },
          el('div', { class: 'vx-head' },
            el('p', { class: 'vx-eyebrow' }, `그림 ${sec.no} / ${works.length}`),
            el('h2', { id: `${id}-h` }, t.title || sec.en),
            el('p', { class: 'vx-sub' }, (t.title ? sub : sub.slice(1)).join(' · '))),
          sec.firstLook ? firstLook(sec.firstLook) : null,
          el('div', { class: 'vx-body ' + layout }, vw.root, t.box)));
      } else {
        main.append(el('section', { class: 'vx-work vx-comp', id, 'aria-labelledby': `${id}-h` },
          el('div', { class: 'vx-head' },
            el('p', { class: 'vx-eyebrow' }, '비교 해설'),
            el('h2', { id: `${id}-h` }, t.title || sec.en),
            el('p', { class: 'vx-sub' }, (t.title ? sub : sub.slice(1)).join(' · '))),
          sec.firstLook ? firstLook(sec.firstLook) : null,
          el('div', { class: 'vx-thumbs' }, works.map(w => {
            const s = ex.sections[w];
            return el('a', { href: `#${w}` }, el('img', { src: s.image.lo, alt: '', loading: 'lazy' }), `그림 ${s.no} · ${s.work.artist}`);
          })),
          t.box));
      }
    }

    /* 우리 질문 */
    if (ex.questions && ex.questions.length) {
      main.append(el('section', { class: 'vx-qs', 'aria-labelledby': 'vx-qs' },
        el('p', { class: 'tag' }, '이 사이트가 덧붙인 질문 · VCS의 글이 아닙니다'),
        el('h2', { id: 'vx-qs' }, '함께 이야기해 볼 질문'),
        el('ol', null, ex.questions.map(q => el('li', null, q))),
        ex.course ? el('a', { href: ex.course.href, style: 'font-weight:700' }, ex.course.label + ' →') : null));
    }

    /* 출처 */
    const imgLine = id => {
      const s = ex.sections[id], w = s.work, c = s.credit || {};
      const head = `그림 ${s.no} — ${w.artist}, ${w.title}, ${w.date}, ${w.place}. 이미지: `;
      return el('li', null, head, c.file
        ? [fileLink(c), ', ', licNode(c), c.changes ? ` — ${c.changes}` : '']
        : el('span', { class: 'vx-todo' }, '[이미지 출처를 적어 주세요]'));
    };
    const figs = works.map(id => ex.sections[id].figure).filter(Boolean);
    main.append(el('section', { class: 'vx-credits', 'aria-labelledby': 'vx-credits' },
      el('h2', { id: 'vx-credits' }, '출처와 저작권 · Source and copyright'),
      el('div', { class: 'cols' },
        el('div', null,
          el('p', null, `원문: 「${ex.original}」, The Visual Commentary on Scripture, `, el('a', { href: ex.vcs }, ex.vcs.replace(/^https?:\/\//, '')),
            `. 해설: ${ex.author}. 글의 저작권은 필자와 VCS에 있으며, VCS의 허락을 받아 한국어로 옮겼습니다. 번역 글을 다른 곳에 옮겨 실으려면 VCS의 허락이 필요합니다.`),
          el('p', null, ex.translatorNote || `옮긴이: ${ex.translator.ko}. AI 번역 도구로 초벌을 만든 뒤 원문과 대조해 다듬었습니다. 잘못 옮긴 곳을 알려 주시면 고치겠습니다.`),
          el('p', null, '‘먼저 보기’, ‘그림에서 볼 것’, 낱말 풀이, 구절 지도, 함께 이야기해 볼 질문은 이 사이트가 덧붙인 글입니다.')),
        el('div', { lang: 'en' },
          el('p', null, `Original: “${ex.original}”, The Visual Commentary on Scripture, `, el('a', { href: ex.vcs }, ex.vcs.replace(/^https?:\/\//, '')),
            `. Commentary by ${ex.author}. Korean translation by ${ex.translator.en}, published with the permission of the VCS.`),
          el('p', null, 'Copyright in the text remains with the author and the VCS. Please ask the VCS before reproducing the translation elsewhere. The translation began as a machine draft and was checked against the original by hand.'),
          el('p', null, 'The “look first” prompts, picture notes, glossary, verse map and discussion questions are additions by this site.'))),
      el('h3', null, '그림 · Images'),
      el('ul', null, works.map(imgLine), figs.map(f => el('li', null, creditNode(f.credit))))));

    root.append(footer(site));

    const h = /^#([a-z0-9]+)-s(\d+)$/.exec(location.hash);
    if (h && ex.sections[h[1]] && !opts.preview) setTimeout(() => api.go(h[1], +h[2]), 60);
    return api;
  }

  function footer(site) {
    return el('footer', { class: 'vx-foot' }, el('div', { class: 'vx-wrap' },
      el('span', null, el('a', { href: site.home }, site.name), ` · ${site.sub}`),
      el('span', null, '해설과 번역의 저작권은 필자와 VCS에 있습니다 · 그림은 각 출처의 라이선스를 따릅니다')));
  }

  /* 검토용 잠금 — 브라우저의 Web Crypto(AES-GCM)만 쓴다. 열쇠는 링크의 # 뒤에만 있고 서버로 가지 않는다. */
  const b64u = {
    enc(buf) { const u = new Uint8Array(buf); let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); },
    dec(str) { let t = String(str).replace(/-/g, '+').replace(/_/g, '/'); while (t.length % 4) t += '='; const s = atob(t), u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; }
  };
  async function seal(obj, keyStr) {
    const raw = keyStr ? b64u.dec(keyStr) : crypto.getRandomValues(new Uint8Array(32)), iv = crypto.getRandomValues(new Uint8Array(12));
    if (raw.length !== 32) throw new Error('열쇠의 길이가 맞지 않아요.');
    const key = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['encrypt']);
    const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(obj)));
    return { box: { v: 1, iv: b64u.enc(iv), ct: b64u.enc(ct) }, key: b64u.enc(raw) };
  }
  async function unseal(box, keyStr) {
    const key = await crypto.subtle.importKey('raw', b64u.dec(keyStr), 'AES-GCM', false, ['decrypt']);
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64u.dec(box.iv) }, key, b64u.dec(box.ct));
    return JSON.parse(new TextDecoder().decode(pt));
  }

  /* 검토 파일은 브라우저에 남은 예전 것이 아니라 언제나 사이트의 지금 파일을 받아 온다. */
  const loadFresh = src => new Promise(res => {
    const s = document.createElement('script');
    s.src = location.protocol === 'file:' ? src : `${src}?t=${Date.now()}`;
    s.onload = () => res(true); s.onerror = () => res(false);
    document.head.append(s);
  });

  /* 전시 페이지 시작: 검토용 링크면 잠긴 번역을 열고, 아니면 공개 번역(없으면 빈 틀)을 그린다. */
  async function boot(root, ex) {
    const site = window.VCS_SITE;
    const m = /(?:^#|&)review=([A-Za-z0-9_-]{20,})/.exec(location.hash);
    const store = 'vcs-review-' + ex.id;
    let key = m ? m[1] : null;
    try { if (key) sessionStorage.setItem(store, key); else key = sessionStorage.getItem(store); } catch (_) { }
    if (!key) return render(root, ex, window.VCS_TEXT || null, { site });
    root.replaceChildren(el('p', { class: 'vx-opening' }, '검토용 번역을 여는 중… · Opening the preview…'));
    window.VCS_REVIEW = null;
    await loadFresh(`text/${ex.id}.review.js`);
    if (window.VCS_REVIEW && window.crypto && crypto.subtle) {
      try {
        const p = await unseal(window.VCS_REVIEW, key);
        if (p && p.text && p.text.exhibit === ex.id) return render(root, ex, p.text, { site, preview: true, orig: p.orig || null });
      } catch (_) { }
    }
    if (!m) { try { sessionStorage.removeItem(store); } catch (_) { } }
    return render(root, ex, window.VCS_TEXT || null, { site, reviewFailed: !!m });
  }

  window.VCSExhibit = { render, boot, seal, unseal, footer, version: '3' };
})();
