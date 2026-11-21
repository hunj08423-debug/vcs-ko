/* 그림으로 읽는 성경 — 「수태고지」의 사이트 쪽 자료.
   VCS 해설의 번역문은 여기에 넣지 않는다. 번역문은 make.html이 대조본에서 만든 text/annunciation.js에 들어간다.
   그림 위 번호(spots)의 자리·이름·'그림에서 볼 것'은 홍지훈의 「수태고지 그림 확대 보기」에서 가져왔다.
   자리 숫자는 그림 가로를 ref로 잡은 좌표다(세로는 ref × h / w). */
window.VCS_EXHIBIT = {
  id: 'annunciation',
  title: '수태고지',
  original: 'The Annunciation',
  passage: { ko: '누가복음 1:26–38', en: 'Luke 1:26–38', bible: 'https://bible.bskorea.or.kr/bible/NKRV/LUK.1' },
  vcs: 'https://thevcs.org/annunciation',
  author: 'Dillian Gordon',
  translator: { ko: '홍지훈', en: 'Hong Ji-Hun' },
  book: '누가복음',
  order: ['rossetti', 'simone', 'lippi', 'comparative'],
  readPerMinute: 500,

  sections: {
    rossetti: {
      kind: 'work', no: 1,
      en: 'A White Annunciation',
      match: ['로세티'], sentences: 12, paras: [1, 4, 10, 12],
      firstLook: '천사에게 날개가 있나요? 마리아의 눈은 천사를 향하고 있나요?',
      work: { artist: '단테 가브리엘 로세티', title: '〈에케 안킬라 도미니!(수태고지)〉', date: '1849–50', medium: '캔버스에 유채', place: '런던 테이트 (N01210)' },
      image: {
        w: 1299, h: 2286, ref: 1299, smax: 4,
        lo: 'img/annunciation/rossetti-650.jpg', hi: 'img/annunciation/rossetti-1299.jpg',
        alt: '단테 가브리엘 로세티의 〈에케 안킬라 도미니!〉. 왼쪽에 백합을 든 흰옷의 가브리엘, 오른쪽 침대 구석에 앉은 흰옷의 성모.'
      },
      credit: { file: 'Dante Gabriel Rossetti - Ecce Ancilla Domini! - Google Art Project.jpg', url: 'https://commons.wikimedia.org/wiki/File:Dante_Gabriel_Rossetti_-_Ecce_Ancilla_Domini!_-_Google_Art_Project.jpg', license: '퍼블릭 도메인' },
      viewNote: '4·11·12번 문장은 그림의 특정 부분을 가리키지 않습니다.',
      spots: [
        { n: 1, label: '남은 두 상징: 백합과 비둘기', look: '가브리엘이 든 백합 한 줄기와 창가의 흰 비둘기입니다. 후광은 6번에서 천사임을 알리는 표시로 따로 다룹니다.', boxes: [[440, 590, 880, 915], [415, 450, 612, 540]], tags: ['백합', '흰 비둘기'], pins: [[705, 690], [385, 470]] },
        { n: 2, label: '백합 줄기와 붉은 휘장', look: '수틀의 붉은 천에 백합 줄기와 흰 꽃 세 송이가 수놓여 있습니다. 가브리엘이 든 것은 백합 한 줄기입니다.', boxes: [[440, 590, 880, 915], [1095, 955, 1270, 2286]], tags: ['가브리엘의 백합', '붉은 휘장'], pins: [[560, 830], [1148, 1350]] },
        { n: 3, label: '열린 창과 비둘기', look: '가브리엘 뒤로 하늘과 나무가 보이는 창이 열려 있고, 비둘기는 창 바로 안쪽에서 성모 쪽으로 날고 있습니다. 비둘기 머리 둘레에 가는 금빛 선으로 후광 고리가 그려져 있습니다.', boxes: [[0, 50, 455, 560], [415, 450, 612, 540]], tags: ['열린 창', '비둘기와 후광 고리'], pins: [[425, 250], [640, 470]] },
        { n: 5, label: '무늬 없는 푸른 휘장', look: '침대 뒤에 무늬 없는 푸른 천 한 장이 걸려 있습니다.', boxes: [[525, 180, 955, 995]], pins: [[800, 300]] },
        { n: 6, label: '날개 없는 가브리엘', look: '등에 날개가 없고, 머리 뒤에 반투명한 금빛 원판이 있습니다. 발 둘레에 작은 불꽃이 일렁이고, 그 아래 바닥에 노란 빛 웅덩이가 있습니다. 두 발은 바닥에서 떠 있습니다.', boxes: [[100, 65, 420, 345], [0, 1760, 470, 2080], [20, 2085, 430, 2275]], tags: ['머리 둘레의 빛', '불꽃과 뜬 발', '빛 웅덩이'], tagAt: ['above', 'above', 'under'], pins: [[75, 200], [60, 1720], [460, 2180]] },
        { n: 7, label: '침대 위 그림자', look: '매트리스 옆면과 성모 발치의 이불이 회색 그늘에 잠겨 있습니다.', boxes: [[560, 1380, 1100, 1800]], tags: ['회색 그늘'], pins: [[820, 1650]] },
        { n: 8, label: '성모의 흰 홑옷', look: '성모의 옷도 가브리엘의 옷처럼 꾸밈 없는 흰 천입니다.', boxes: [[600, 590, 1160, 1560]], pins: [[1060, 900]] },
        { n: 9, label: '성모의 눈길과 백합 줄기', look: '성모는 침대 구석 벽에 기대 무릎을 세우고 앉아 있습니다. 눈길은 가브리엘이 아니라 왼쪽 아래, 가브리엘이 쥔 백합 줄기 끝 쪽을 향합니다.', boxes: [[890, 495, 1100, 705], [690, 780, 905, 935]], tags: ['성모의 눈길', '태를 가리키는 줄기 끝'], pins: [[1135, 560], [955, 965]] },
        { n: 10, label: 'March라는 글자', look: '왼쪽 아래 구석에 DGR과 March 1850이 적혀 있습니다. 필자는 이 March를 수태고지의 달로 읽었습니다.', boxes: [[10, 2165, 175, 2278]], tags: ['DGR / March 1850'], pins: [[205, 2215]] }
      ],
      backstory: [
        {
          n: [12], title: '모델은 몇 사람이었을까요?',
          text: '12번 문장은 남동생이 가브리엘의, 여동생이 마리아의 모델을 섰다고 짧게 말해요. 로세티 아카이브의 기록은 조금 더 자세해요. 가브리엘의 머리는 남동생 윌리엄 마이클과 조각가 토머스 울너를 보고 그렸고, 직업 모델 세 사람도 가브리엘의 모델을 섰어요. 마리아는 처음에 여동생 크리스티나를 보고 그렸고, 머리카락은 러브(Miss Love)라는 직업 모델을 보고 그렸대요.',
          en: 'Background note: according to the Rossetti Archive, William Michael Rossetti and the sculptor Thomas Woolner sat for Gabriel’s head, and three professional models also sat for Gabriel; Christina sat for the Virgin at first, and a professional model, Miss Love, for her hair.',
          src: [{ label: '로세티 아카이브(영어)', href: 'https://rossettiarchive.iath.virginia.edu/docs/s44.rap.html' }]
        }
      ]
    },

    simone: {
      kind: 'work', no: 2,
      en: 'The Angel’s Greeting',
      match: ['시모네', '마르티니'], sentences: 10, paras: [1, 6, 9],
      firstLook: '천사의 입에서 나온 금빛 글자를 손가락으로 따라가 보세요. 어디에 닿나요?',
      work: { artist: '시모네 마르티니·리포 멤미', title: '〈수태고지〉', date: '1333', medium: '목판에 템페라, 금박', place: '피렌체 우피치 미술관' },
      image: {
        w: 5386, h: 4208, ref: 1530, smax: 6,
        lo: 'img/annunciation/simone-1400.jpg', hi: 'img/annunciation/simone-3400.jpg',
        alt: '시모네 마르티니와 리포 멤미의 〈수태고지〉 제단화 전체. 가운데 왼쪽에 무릎 꿇은 가브리엘, 오른쪽 옥좌에 앉은 성모, 양옆에 두 성인.'
      },
      // 2022년 9월 18일 미술관에서 액자째 찍은 사진(Diego Delso, CC BY-SA 4.0). 사진가는 "Diego Delso, delso.photo, License CC BY-SA"를 그림 곁에 읽기 쉽게 적어 달라고 했다.
      credit: {
        file: 'Galería Uffizi, Florencia, Italia, 2022-09-18, DD 26.jpg', url: 'https://commons.wikimedia.org/wiki/File:Galer%C3%ADa_Uffizi,_Florencia,_Italia,_2022-09-18,_DD_26.jpg',
        author: 'Diego Delso', authorSite: 'delso.photo', authorUrl: 'https://delso.photo',
        license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.ko',
        changes: '일부를 잘라 내고 크기를 줄임', sa: '이렇게 고친 사진도 같은 CC BY-SA 4.0을 따릅니다'
      },
      viewNote: '9번 문장은 그림의 특정 부분을 가리키지 않습니다. 사진은 액자째 찍은 것이라 양옆의 두 성인과 위쪽의 예언자 메달까지 보입니다.',
      spots: [
        { n: 1, label: '막 내려앉은 가브리엘', look: '공작 깃털 날개가 아직 위로 치켜 올라가 있고, 가브리엘은 막 무릎을 꿇었습니다.', boxes: [[330, 445, 690, 1110]], pins: [[355, 485]] },
        { n: 2, label: '휘날리는 망토와 관의 끈', look: '체크무늬 망토가 등 뒤에서 크게 휘감겨 날리고, 목 앞에서 매듭지어져 있습니다. 머리 뒤로는 관을 고정하는 끈이 나부낍니다.', boxes: [[330, 670, 515, 995], [572, 730, 616, 766], [495, 610, 572, 725]], tags: ['휘날리는 망토', '목의 매듭', '관의 끈'], pins: [[375, 940], [480, 620]] },
        { n: 3, label: '올리브 관과 올리브 가지', look: '머리에 올리브 잎 관을 썼고, 그 안에 보석 박힌 작은 관이 보입니다. 손에 든 가지에는 올리브 열매가 달려 있습니다.', boxes: [[548, 626, 674, 696], [610, 682, 752, 936]], tags: ['올리브 관', '올리브 가지'], pins: [[535, 665], [600, 920]] },
        { n: 4, label: '집게손가락과 비둘기', look: '들어 올린 손의 집게손가락이 위를 가리키고, 맨 위 가운데 금빛 원반 안에 비둘기가 있습니다. 원반 둘레를 천사 여덟이 감싸고 있습니다.', boxes: [[610, 752, 688, 822], [648, 315, 878, 542]], tags: ['집게손가락', '금빛 원반 속 비둘기'], pins: [[610, 745], [905, 380]] },
        { n: 5, label: '흰 백합이 꽂힌 꽃병', look: '금빛 꽃병에 흰 백합이 꽂혀 있습니다.', boxes: [[698, 655, 865, 1035]], pins: [[682, 1015]] },
        { n: 6, label: '성모에게 가는 천사의 인사', look: '글귀가 가브리엘의 입 앞에서 시작해 성모의 얼굴 쪽으로 비스듬히 올라갑니다. 성모는 고개를 기울이고 한 손으로 목 언저리의 망토를 여미고 있습니다.', boxes: [[650, 630, 1005, 730], [1000, 570, 1122, 736]], tags: ['천사의 인사', '고개를 기울인 성모'], pins: [[820, 620], [1155, 630]] },
        { n: 7, label: '책과 예언자 메달', look: '성모가 붉은 책을 쥔 채 책장 사이에 손가락을 끼우고 있습니다. 메달은 왼쪽부터 예레미야·에스겔·이사야·다니엘이고, 성모 바로 위가 이사야입니다.', boxes: [[1020, 800, 1132, 880], [122, 272, 228, 378], [387, 272, 493, 378], [1032, 272, 1138, 378], [1292, 272, 1398, 378]], tags: ['책', '예레미야', '에스겔', '이사야', '다니엘'], pins: [[1145, 835], [1150, 325]] },
        { n: 8, label: '영대와 소매', look: '영대는 가슴을 가로질러 바닥까지 늘어진 금빛 띠입니다. 띠와 소매의 글귀는 이 사진으로는 읽을 수 없습니다.', boxes: [[460, 760, 695, 1105], [578, 798, 632, 842]], tags: ['영대', '소매'], pins: [[445, 1050], [560, 835]] },
        { n: 10, label: '눈길이 머무는 표면들', look: '체크무늬 비단 망토, 대리석 바닥, 꽃무늬 금란 달마티카, 무늬를 새긴 후광, 나무 상감 옥좌, 옥좌 위의 금란 휘장, 백합이 모두 한 장면에 있습니다.', boxes: [[330, 670, 515, 995], [320, 982, 1200, 1122], [380, 730, 660, 1100], [558, 618, 682, 735], [988, 566, 1150, 700], [1040, 810, 1192, 1042], [1110, 645, 1205, 890], [698, 655, 865, 930]], tags: ['타타르 비단', '대리석 바닥', '금란 달마티카', '후광', '후광', '인타르시아 옥좌', '금란 휘장', '백합'], pins: [[940, 1090]] }
      ]
    },

    lippi: {
      kind: 'work', no: 3,
      en: 'Openings',
      match: ['리피'], sentences: 15, paras: [1, 10, 13],
      firstLook: '이 그림에서 움직이고 있는 것을 하나만 찾아보세요.',
      work: { artist: '필리포 리피', title: '〈수태고지〉', date: '1450–53', medium: '목판에 템페라', place: '런던 내셔널 갤러리 (NG666)' },
      image: {
        w: 7689, h: 3474, ref: 1920, smax: 8,
        lo: 'img/annunciation/lippi-1600.jpg', hi: 'img/annunciation/lippi-4400.jpg',
        alt: '필리포 리피의 〈수태고지〉. 왼쪽 정원에 무릎 꿇은 가브리엘, 오른쪽 방 안에 앉은 성모.'
      },
      credit: { file: 'Fra Filippo Lippi.png', url: 'https://commons.wikimedia.org/wiki/File:Fra_Filippo_Lippi.png', license: '퍼블릭 도메인' },
      viewNote: '1·10·11·13·14·15번 문장은 그림의 특정 부분을 가리키지 않습니다. 12번은 아래 ‘12번 그림으로 보기’에서 〈일곱 성인〉과 나란히 봅니다.',
      spots: [
        { n: 2, label: '가브리엘과 꽃 핀 잔디', look: '무릎 꿇은 가브리엘의 옷자락이 꽃 핀 잔디 위로 넓게 펼쳐져 있습니다.', boxes: [[230, 130, 800, 750]], pins: [[520, 610]] },
        { n: 3, label: '공작 깃털 날개', look: '날개 끝이 그림의 둥근 윗변을 따라 왼쪽 아래로 휘어 내려옵니다.', boxes: [[90, 100, 630, 530]], pins: [[300, 300]] },
        { n: 4, label: '하나님의 손과 비둘기', look: '맨 위 어두운 구름에서 하나님의 손이 나오고, 흰 비둘기는 성모 앞에서 금빛 점선 고리에 싸여 있습니다.', boxes: [[860, 0, 1140, 150], [1060, 370, 1230, 480]], tags: ['하나님의 손', '비둘기와 금빛 고리'], pins: [[925, 70], [1085, 490]] },
        { n: 5, label: '내리깐 시선', look: '성모가 고개를 숙이고 눈길을 아래로 내리고 있습니다.', boxes: [[1125, 135, 1295, 315]], pins: [[1110, 165]] },
        { n: 6, label: '오른손과 옷의 트임', look: '오른손 바로 아래, 파란 망토 자락 옆 분홍 옷에 짧게 세로로 트인 곳이 있고, 그 둘레에 금빛 점이 흩뿌려져 있습니다. 왼쪽 비둘기 쪽에서 오는 금빛 점선도 이쪽으로 이어지는 것으로 보입니다. 아주 작아서 크게 키워야 보입니다.', boxes: [[1236, 354, 1302, 402], [1264, 403, 1312, 444]], tags: ['오른손', '옷의 트임과 금빛 점'], tagAt: ['above', 'under'], pins: [[1335, 395]] },
        { n: 7, label: '타일 바닥과 침대', look: '앞쪽의 붉은 타일 바닥이 오른쪽 안쪽의 나무 침대까지 이어집니다.', boxes: [[880, 690, 1780, 867], [1490, 150, 1700, 600]], tags: ['타일 바닥', '침대'], pins: [[1250, 800], [1595, 445]] },
        { n: 8, label: '닫힌 정원과 백합', look: '가브리엘 뒤로 낮은 담이 정원을 두르고 있습니다. 백합은 항아리와 가브리엘 머리 뒤쪽에 피어 있습니다.', boxes: [[40, 470, 800, 860], [770, 300, 910, 520], [680, 50, 810, 210]], tags: ['닫힌 정원', '백합', '백합'], pins: [[170, 600], [765, 420], [650, 75]] },
        { n: 9, label: '백합 항아리와 메디치 문양', look: '반지와 깃털, 늘어진 리본으로 된 문양을 찾아보세요. 아주 작아서 크게 키워야 잘 보입니다.', boxes: [[785, 515, 905, 645], [795, 690, 875, 795]], tags: ['백합 항아리', '메디치 문양'], pins: [[915, 745]] }
      ],
      figure: {
        after: 12,
        title: '12번 그림으로 보기',
        lead: '12번 문장이 말하는 두 눈길을 그림에서 짚었습니다. 두 도판 모두 왼쪽은 〈일곱 성인〉, 오른쪽은 〈수태고지〉입니다. 윗줄은 그 부분의 자리를, 아랫줄은 그 부분을 크게 보여 줍니다. 눈길이 이어진다는 것은 필자의 해석이고, 두 그림이 실제로 어떻게 걸렸는지는 알 수 없어서 눈길을 잇는 화살표는 그리지 않았습니다.',
        items: [
          { src: 'img/annunciation/lippi-s12-cosmas.jpg', w: 1600, h: 1371, alt: '리피 〈일곱 성인〉의 코스마스와 〈수태고지〉의 하나님의 손을 네모로 표시하고 크게 키운 도판', cap: '① 코스마스가 올려다보는 것: 〈수태고지〉 맨 위, 구름에서 나온 하나님의 손. 코스마스는 〈일곱 성인〉에서 두 손을 들고 위를 올려다보는 이입니다.' },
          { src: 'img/annunciation/lippi-s12-john.jpg', w: 1600, h: 1371, alt: '리피 〈일곱 성인〉의 세례 요한과 〈수태고지〉의 성령 비둘기를 네모로 표시하고 크게 키운 도판', cap: '② 세례 요한이 내려다보는 것: 〈수태고지〉 성모 곁, 금빛 고리 속을 날아가는 흰 비둘기(성령). 요한은 〈일곱 성인〉 가운데 앉아 가느다란 십자가를 든 이입니다.' }
        ],
        verses: [
          { ref: '누가복음 3:22', text: '성령이 비둘기 같은 형체로 그의 위에 강림하시더니', url: 'https://bible.bskorea.or.kr/bible/NKRV/LUK.3' },
          { ref: '요한복음 1:32', text: '내가 보매 성령이 비둘기 같이 하늘로부터 내려와서 그의 위에 머물렀더라', url: 'https://bible.bskorea.or.kr/bible/NKRV/JHN.1' }
        ],
        credit: {
          text: '도판: 런던 내셔널 갤러리 소장 〈일곱 성인〉(NG667)과 〈수태고지〉(NG666)의 사진에서 해당 부분을 잘라 냄.',
          files: [
            { file: 'Lippi, sette santi.jpg', url: 'https://commons.wikimedia.org/wiki/File:Lippi,_sette_santi.jpg', license: '퍼블릭 도메인' },
            { file: 'Fra Filippo Lippi.png', url: 'https://commons.wikimedia.org/wiki/File:Fra_Filippo_Lippi.png', license: '퍼블릭 도메인' }
          ]
        }
      },
      backstory: [
        {
          n: [3], title: '둥근 그림은 처음부터 둥글었을까요?',
          text: '지금 이 그림은 위쪽이 둥근 반원 모양이에요. 그런데 런던 내셔널 갤러리는 이 반원 모양이 처음부터 그랬던 것은 아닐 수 있다고 소개해요. 처음에는 네모난 그림이었을 수도 있고, 침대 머리판으로 쓰였을 수도 있대요. 3번 문장이 말하는 그림의 윤곽은 지금 모습을 두고 한 말로 읽으면 돼요.',
          en: 'Background note: the National Gallery notes that the semicircular shape may not be original; the panel may have been designed as a rectangle, possibly as a bedhead. Sentence 3 can be read as describing its present shape.',
          src: [{ label: '런던 내셔널 갤러리 작품 소개(영어)', href: 'https://www.nationalgallery.org.uk/paintings/fra-filippo-lippi-the-annunciation' }]
        }
      ]
    },

    comparative: {
      kind: 'comparative',
      en: 'Phases of the Annunciation',
      url: 'https://thevcs.org/campaign/phases-annunciation',
      match: ['비교'], sentences: 34, paras: [1, 2, 3, 4, 6, 7, 10, 11, 15, 19, 23, 29],
      firstLook: '세 그림의 마리아를 나란히 보고, 가장 마음이 가는 마리아를 골라 보세요.',
      backstory: [
        {
          n: [11], title: '오른쪽 성녀의 이름은?',
          text: '11번 문장은 시모네 마르티니 제단화의 오른쪽 성녀를 안사노의 어머니 마시마라고 해요. 이탈리아 문화재 목록도 이 성녀를 마시마로 보지만, 성녀의 발치에 ‘S(ANCTA) IULITTA’(성녀 율리타)라는 글씨가 있고 1458년 목록에는 ‘성녀 마르가리타’로 나온다고 함께 적어 두었어요. 우피치 미술관도 이 그림을 〈성녀 마르가리타와 성 안사노가 있는 수태고지〉라고 불러요. 이름은 달라도 같은 그림이에요.',
          en: 'Background note: the Italian heritage catalogue identifies the saint as Massima, but also records the inscription S(ANCTA) IULITTA at her feet and the name Saint Margaret in a 1458 inventory; the Uffizi titles the work “Annunciation with St Margaret and St Ansanus”.',
          src: [
            { label: '이탈리아 문화재 목록(이탈리아어)', href: 'https://sigecweb.beniculturali.it/sigec/item/print/ICCD15767446' },
            { label: '우피치 미술관(영어)', href: 'https://www.uffizi.it/en/artworks/annunciation-with-st-margaret-and-st-ansanus' }
          ]
        },
        {
          n: [13], title: '로렌체티 형제와 두 이름의 그림',
          text: '런던 내셔널 갤러리는 암브로조 로렌체티를 피에트로의 ‘아마도’ 동생이라고, 한발 물러서서 소개해요. 또 13번 문장의 〈성모의 정결례〉를 우피치 미술관은 〈성전 봉헌〉이라는 이름으로 소개해요. 두 이름은 누가복음 2:22–38의 같은 장면을 가리켜요. 마리아 쪽에서 보면 아이를 낳은 뒤 치르는 정결 예식이고, 아기 예수 쪽에서 보면 하나님께 드리는 봉헌이에요.',
          en: 'Background note: the National Gallery describes Ambrogio as “probably” Pietro’s brother, and the Uffizi titles Ambrogio’s panel “Presentation at the Temple”; both names refer to the same scene in Luke 2:22–38.',
          src: [
            { label: '런던 내셔널 갤러리(영어)', href: 'https://nationalgallery.org.uk/artists/ambrogio-lorenzetti' },
            { label: '우피치 미술관(영어)', href: 'https://www.uffizi.it/en/artworks/presentation-at-the-temple' },
            { label: '누가복음 2장(개역개정)', href: 'https://bible.bskorea.or.kr/bible/NKRV/LUK.2' }
          ]
        }
      ]
    }
  },

  verses: [
    { v: '28절', text: '은혜를 받은 자여 평안할지어다', go: [['simone', 6]] },
    { v: '29절', text: '놀라', go: [['simone', 6], ['rossetti', 9]] },
    { v: '30·31·35절', desc: '천사의 영대에 새긴 글귀', go: [['simone', 8]] },
    { v: '35절', text: '지극히 높으신 이의 능력이 너를 덮으시리니', go: [['rossetti', 7], ['lippi', 4]] },
    { v: '38절', text: '주의 여종이오니 말씀대로 내게 이루어지이다', go: [['lippi', 5], ['comparative', 4]] },
    { v: '함께 읽기 · 이사야 7:14', text: '보라 처녀가 잉태하여', go: [['simone', 7]], url: 'https://bible.bskorea.or.kr/bible/NKRV/ISA.7' }
  ],

  glossary: [
    { t: '라파엘 전파', d: '1848년 영국에서 로세티 등이 만든 젊은 화가 모임이에요. 라파엘로 이전의 그림처럼 자연을 정직하게 그리자고 했어요.' },
    { t: '영예의 휘장', d: '왕이나 성인 뒤에 드리워 그분을 높이던 천이에요.' },
    { t: '홑옷', d: '안감 없이 한 겹으로 지은 옷이에요.' },
    { t: '시에나', d: '이탈리아 토스카나의 도시예요. 14세기에 금빛 바탕 그림으로 이름났어요.' },
    { t: '케루빔과 세라핌', d: '하나님 곁을 지키는 천사들이에요. 개역개정 성경은 ‘그룹’과 ‘스랍’이라고 불러요(창 3:24, 사 6:2).' },
    { t: '젯소', d: '그림 바탕에 바르는 석고 반죽이에요. 도드라진 무늬를 만들 때도 써요.' },
    { t: '제단화', d: '교회 제단 뒤나 위에 세우는 그림이에요.' },
    { t: '타타르 비단', d: '몽골 제국을 거쳐 이탈리아로 들어온 귀한 비단이에요.' },
    { t: '금란', d: '금실을 섞어 짠 화려한 비단이에요.' },
    { t: '달마티카', d: '집사(부제)가 예배 때 입는, 소매가 넓은 겉옷이에요.' },
    { t: '가르멜회', d: '중세에 갈멜산에서 시작된 수도회예요.' },
    { t: '닫힌 정원', d: '아가 4:12의 ‘잠근 동산’에서 온, 성모의 순결을 뜻하는 상징이에요.' },
    { t: '메디치', d: '15세기 피렌체를 이끈 은행가 가문이에요.' },
    { t: '짝 그림', d: '둘이 한 쌍이 되도록 함께 그린 그림이에요.' },
    { t: '코스마스', d: '의사였던 성인으로, 메디치 가문의 수호성인이에요. 코시모 데 메디치의 이름이 이 성인에서 왔어요.' },
    { t: '산티시마 안눈치아타', d: '피렌체의 성당이에요. 이름의 뜻은 ‘지극히 거룩한 수태고지’예요.' },
    { t: '프레스코', d: '마르지 않은 회벽에 물감이 스며들게 그리는 벽화예요.' },
    { t: '보나벤투라', d: '13세기 프란치스코회 신학자예요.' },
    { t: '성육신', d: '하나님의 아들이 사람의 몸을 입고 오신 일이에요.' },
    { t: '묵주기도', d: '묵주 알을 하나씩 세며 기도문을 거듭 바치는 가톨릭 기도예요.' },
    { t: '정결례', d: '아이를 낳은 어머니가 율법에 따라 치르던 정결 예식이에요(눅 2:22).' },
    { t: '하늘의 여왕', d: '가톨릭 전통에서 성모를 높여 부르는 이름이에요.' }
  ],

  questions: [
    '마리아는 왜 몸을 움츠렸을까요?',
    '세 그림에서 천사와 마리아 사이의 거리는 어떻게 다른가요?',
    '세 그림 가운데 어느 마리아 곁에 앉아 보고 싶나요? 왜 그런가요?'
  ],
  course: { label: '질문 받기 연습실의 대림절 1주 과정에서 이어 보기', href: 'https://hunj08423-debug.github.io/hun/advent.html#week1' }
};
