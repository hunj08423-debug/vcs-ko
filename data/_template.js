/* 그림으로 읽는 성경 — 새 전시 자료의 틀.
   쓰는 법: 이 파일을 data/<전시 이름>.js 로 복사해 채운다. <전시 이름>은 VCS 주소의 끝말을 그대로 쓴다.
   (예: https://thevcs.org/annunciation → annunciation)

   지킬 것
   - VCS 해설의 문장(원문이든 번역이든)은 여기에 넣지 않는다. 번역은 make.html이 대조본에서 만든 text/<전시 이름>.js에만 들어간다.
   - 여기에는 사이트가 덧붙이는 글만 넣는다: 먼저 보기, 그림에서 볼 것, 구절 지도, 낱말 풀이, 질문.
   - 그림 위 번호(spots)는 spots.html에서 찍어 내보낸 자료를 그대로 옮긴다.
   - 그림은 자유롭게 쓸 수 있는 파일만(위키미디어 공용 등) 쓰고, credit을 빠짐없이 채운다.
     사진가가 이름을 밝혀 달라는 사진(CC BY, CC BY-SA)은 author·license를 채우면 그림 바로 아래에도 저절로 적힌다. */
window.VCS_EXHIBIT = {
  id: 'EXHIBIT-ID',                      // 파일 이름과 같게
  title: '전시의 한국어 이름',
  original: 'Original English title of the exhibition',
  passage: { ko: '책 0:0–0', en: 'Book 0:0–0', bible: 'https://bible.bskorea.or.kr/bible/NKRV/LUK.1' },  // 개역개정 장 주소
  vcs: 'https://thevcs.org/EXHIBIT-ID',
  author: '해설 필자 이름 (원문 그대로)',
  translator: { ko: '홍지훈', en: 'Hong Ji-Hun' },
  book: '성경 책 이름 (예: 누가복음)',
  order: ['work1', 'work2', 'work3', 'comparative'],   // VCS 원문의 순서 그대로
  readPerMinute: 500,                                  // 읽는 시간 계산: 1분에 500자

  sections: {
    work1: {
      kind: 'work', no: 1,
      en: 'English title of this commentary',
      match: ['대조본 제목에 들어 있는 낱말'],      // make.html이 대조본에서 이 해설을 찾을 때 쓴다 (예: '로세티')
      sentences: 0,                                // 이 해설의 문장 수 (대조본 표의 줄 수)
      paras: [1],                                  // 문단이 시작하는 문장 번호들
      firstLook: '먼저 보기 — 그림에서 하나만 찾아보게 하는 짧은 물음',
      work: { artist: '화가 이름', title: '〈작품 제목〉', date: '연도', medium: '재료', place: '소장처 (작품 번호)' },
      image: {
        w: 0, h: 0, ref: 1000, smax: 5,           // w·h: 큰 그림의 실제 크기, ref: spots.html에서 나온 ref 값
        lo: 'img/EXHIBIT-ID/work1-1400.jpg',       // 처음에 보여 줄 작은 그림 (가로 1400px 안팎)
        hi: 'img/EXHIBIT-ID/work1-3400.jpg',       // 크게 볼 때 불러올 큰 그림
        alt: '그림을 보지 못하는 분을 위한 설명 한두 문장'
      },
      credit: {
        file: '위키미디어 공용 파일 이름.jpg', url: 'https://commons.wikimedia.org/wiki/File:...',
        license: '퍼블릭 도메인'                   // 또는 'CC BY-SA 4.0' 등
        // 사진가가 이름을 밝혀 달라는 사진이면 아래도 채운다:
        // author: '사진가', authorSite: '사진가 사이트', authorUrl: 'https://...', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.ko',
        // changes: '일부를 잘라 내고 크기를 줄임', sa: '이렇게 고친 사진도 같은 CC BY-SA 4.0을 따릅니다'
      },
      viewNote: '그림의 특정 부분을 가리키지 않는 문장 번호 안내 (예: 4·11번 문장은 그림의 특정 부분을 가리키지 않습니다.)',
      spots: [
        // spots.html에서 내보낸 자료를 붙여 넣는다. 한 칸의 모양:
        // { n: 1, label: '그림 위 이름', look: '그림에서 볼 것', boxes: [[x0, y0, x1, y1]], tags: ['네모 위 이름'], pins: [[x, y]] }
      ]
      // 도판이 더 필요하면 figure: { after: 문장 번호, title, lead, items: [{ src, w, h, alt, cap }], verses, credit } (수태고지 리피 12번 참고)
      // 뒷이야기(더 궁금한 독자를 위한 사이트의 글)가 있으면, 해설 끝에 접어서 보인다. 비교 해설에도 쓸 수 있다:
      // backstory: [{ n: [문장 번호], title: '물음 꼴 제목', text: '~요 말투의 짧은 글', en: 'Background note: VCS 검토용 영어 한 줄', src: [{ label: '출처 이름(영어)', href: 'https://…' }] }]
      // 원문이 틀렸을 수 있는 곳은 뒷이야기가 아니라 VCS 메일로 묻는다. 원문은 맞지만 더 알면 좋은 이야기만 뒷이야기로 쓴다.
    },

    work2: { /* work1과 같은 모양, no: 2 */ },
    work3: { /* work1과 같은 모양, no: 3 */ },

    comparative: {
      kind: 'comparative',
      en: 'English title of the comparative commentary',
      url: 'https://thevcs.org/...',               // 비교 해설 원문 주소
      match: ['비교'], sentences: 0, paras: [1],
      firstLook: '세 그림을 함께 보게 하는 짧은 물음'
    }
  },

  // 구절 지도: 본문의 한 구절 → 그 구절을 그린 그림 번호. 성경 문장은 개역개정을 짧게만 인용한다.
  verses: [
    { v: '00절', text: '짧은 성경 구절', go: [['work1', 1]] }
    // 성경 구절이 아닌 설명이면 text 대신 desc: '…'
  ],

  // 낱말 풀이: 쉬운 말로, '~예요' 말투로. 각 해설에서 처음 나오는 곳에 점선이 붙는다.
  glossary: [
    { t: '낱말', d: '쉬운 풀이예요.' }
  ],

  // 함께 이야기해 볼 질문 (사이트가 덧붙이는 글)
  questions: ['질문 하나', '질문 둘', '질문 셋'],
  course: null   // 이어 볼 과정이 있으면 { label: '…에서 이어 보기', href: 'https://…' }
};
