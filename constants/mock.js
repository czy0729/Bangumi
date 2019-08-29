/* eslint-disable max-len, quotes, quote-props */
/*
 * Mock数据
 * @Author: czy0729
 * @Date: 2019-04-14 21:47:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-29 16:03:16
 */
export const DATA_USER_INFO = {
  id: 456208,
  url: 'http://bgm.tv/user/456208',
  username: '456208',
  nickname: 'chen4027',
  avatar: {
    large: 'http://lain.bgm.tv/pic/user/l/000/45/62/456208.jpg?r=1548574892',
    medium: 'http://lain.bgm.tv/pic/user/m/000/45/62/456208.jpg?r=1548574892',
    small: 'http://lain.bgm.tv/pic/user/s/000/45/62/456208.jpg?r=1548574892'
  },
  sign: '',
  usergroup: 10
}

// ?cat=watching
export const DATA_USER_COLLECTION = [
  {
    name: '約束のネバーランド',
    subject_id: 243916,
    ep_status: 6,
    vol_status: 0,
    lasttouch: 1551126209,
    subject: {
      id: 243916,
      url: 'http://bgm.tv/subject/243916',
      type: 2,
      name: '約束のネバーランド',
      name_cn: '约定的梦幻岛',
      summary: '',
      eps: 12,
      eps_count: 12,
      air_date: '2019-01-10',
      air_weekday: 4,
      images: {
        large: 'http://lain.bgm.tv/pic/cover/l/ff/49/243916_XXJsd.jpg',
        common: 'http://lain.bgm.tv/pic/cover/c/ff/49/243916_XXJsd.jpg',
        medium: 'http://lain.bgm.tv/pic/cover/m/ff/49/243916_XXJsd.jpg',
        small: 'http://lain.bgm.tv/pic/cover/s/ff/49/243916_XXJsd.jpg',
        grid: 'http://lain.bgm.tv/pic/cover/g/ff/49/243916_XXJsd.jpg'
      },
      collection: { doing: 2215 }
    }
  },
  {
    name: '盾の勇者の成り上がり',
    subject_id: 217660,
    ep_status: 7,
    vol_status: 0,
    lasttouch: 1550908098,
    subject: {
      id: 217660,
      url: 'http://bgm.tv/subject/217660',
      type: 2,
      name: '盾の勇者の成り上がり',
      name_cn: '盾之勇者成名录',
      summary: '',
      eps: 25,
      eps_count: 25,
      air_date: '2019-01-09',
      air_weekday: 3,
      images: {
        large: 'http://lain.bgm.tv/pic/cover/l/b9/9b/217660_h3554.jpg',
        common: 'http://lain.bgm.tv/pic/cover/c/b9/9b/217660_h3554.jpg',
        medium: 'http://lain.bgm.tv/pic/cover/m/b9/9b/217660_h3554.jpg',
        small: 'http://lain.bgm.tv/pic/cover/s/b9/9b/217660_h3554.jpg',
        grid: 'http://lain.bgm.tv/pic/cover/g/b9/9b/217660_h3554.jpg'
      },
      collection: { doing: 1465 }
    }
  }
]

// /anime
export const DATA_USER_COLLECTIONS = [
  {
    type: 2,
    name: 'anime',
    name_cn: '动画',
    collects: [
      {
        status: { id: 3, type: 'do', name: '在看' },
        count: 2,
        list: [
          {
            subject_id: 243916,
            subject: {
              id: 243916,
              url: 'http://bgm.tv/subject/243916',
              type: 2,
              name: '約束のネバーランド',
              name_cn: '约定的梦幻岛',
              summary: '',
              air_date: '',
              air_weekday: 0,
              images: {
                large: 'http://lain.bgm.tv/pic/cover/l/ff/49/243916_XXJsd.jpg',
                common: 'http://lain.bgm.tv/pic/cover/c/ff/49/243916_XXJsd.jpg',
                medium: 'http://lain.bgm.tv/pic/cover/m/ff/49/243916_XXJsd.jpg',
                small: 'http://lain.bgm.tv/pic/cover/s/ff/49/243916_XXJsd.jpg',
                grid: 'http://lain.bgm.tv/pic/cover/g/ff/49/243916_XXJsd.jpg'
              }
            }
          },
          {
            subject_id: 217660,
            subject: {
              id: 217660,
              url: 'http://bgm.tv/subject/217660',
              type: 2,
              name: '盾の勇者の成り上がり',
              name_cn: '盾之勇者成名录',
              summary: '',
              air_date: '',
              air_weekday: 0,
              images: {
                large: 'http://lain.bgm.tv/pic/cover/l/b9/9b/217660_h3554.jpg',
                common: 'http://lain.bgm.tv/pic/cover/c/b9/9b/217660_h3554.jpg',
                medium: 'http://lain.bgm.tv/pic/cover/m/b9/9b/217660_h3554.jpg',
                small: 'http://lain.bgm.tv/pic/cover/s/b9/9b/217660_h3554.jpg',
                grid: 'http://lain.bgm.tv/pic/cover/g/b9/9b/217660_h3554.jpg'
              }
            }
          }
        ]
      },
      {
        status: { id: 2, type: 'collect', name: '看过' },
        count: 2,
        list: [
          {
            subject_id: 209408,
            subject: {
              id: 209408,
              url: 'http://bgm.tv/subject/209408',
              type: 2,
              name: '賭ケグルイ',
              name_cn: '狂赌之渊',
              summary: '',
              air_date: '',
              air_weekday: 0,
              images: {
                large: 'http://lain.bgm.tv/pic/cover/l/41/1f/209408_33kK3.jpg',
                common: 'http://lain.bgm.tv/pic/cover/c/41/1f/209408_33kK3.jpg',
                medium: 'http://lain.bgm.tv/pic/cover/m/41/1f/209408_33kK3.jpg',
                small: 'http://lain.bgm.tv/pic/cover/s/41/1f/209408_33kK3.jpg',
                grid: 'http://lain.bgm.tv/pic/cover/g/41/1f/209408_33kK3.jpg'
              }
            }
          },
          {
            subject_id: 240038,
            subject: {
              id: 240038,
              url: 'http://bgm.tv/subject/240038',
              type: 2,
              name: '青春ブタ野郎はバニーガール先輩の夢を見ない',
              name_cn: '青春期笨蛋不做兔女郎学姐的梦',
              summary: '',
              air_date: '',
              air_weekday: 0,
              images: {
                large: 'http://lain.bgm.tv/pic/cover/l/b9/45/240038_M7CB5.jpg',
                common: 'http://lain.bgm.tv/pic/cover/c/b9/45/240038_M7CB5.jpg',
                medium: 'http://lain.bgm.tv/pic/cover/m/b9/45/240038_M7CB5.jpg',
                small: 'http://lain.bgm.tv/pic/cover/s/b9/45/240038_M7CB5.jpg',
                grid: 'http://lain.bgm.tv/pic/cover/g/b9/45/240038_M7CB5.jpg'
              }
            }
          }
        ]
      },
      {
        status: { id: 4, type: 'on_hold', name: '搁置' },
        count: 2,
        list: [
          {
            subject_id: 235612,
            subject: {
              id: 235612,
              url: 'http://bgm.tv/subject/235612',
              type: 2,
              name: 'はたらく細胞',
              name_cn: '工作细胞',
              summary: '',
              air_date: '',
              air_weekday: 0,
              images: {
                large: 'http://lain.bgm.tv/pic/cover/l/84/fc/235612_EHO4Q.jpg',
                common: 'http://lain.bgm.tv/pic/cover/c/84/fc/235612_EHO4Q.jpg',
                medium: 'http://lain.bgm.tv/pic/cover/m/84/fc/235612_EHO4Q.jpg',
                small: 'http://lain.bgm.tv/pic/cover/s/84/fc/235612_EHO4Q.jpg',
                grid: 'http://lain.bgm.tv/pic/cover/g/84/fc/235612_EHO4Q.jpg'
              }
            }
          },
          {
            subject_id: 236790,
            subject: {
              id: 236790,
              url: 'http://bgm.tv/subject/236790',
              type: 2,
              name: 'ガンダムビルドダイバーズ',
              name_cn: '高达创形者',
              summary: '',
              air_date: '',
              air_weekday: 0,
              images: {
                large: 'http://lain.bgm.tv/pic/cover/l/b3/ae/236790_601mn.jpg',
                common: 'http://lain.bgm.tv/pic/cover/c/b3/ae/236790_601mn.jpg',
                medium: 'http://lain.bgm.tv/pic/cover/m/b3/ae/236790_601mn.jpg',
                small: 'http://lain.bgm.tv/pic/cover/s/b3/ae/236790_601mn.jpg',
                grid: 'http://lain.bgm.tv/pic/cover/g/b3/ae/236790_601mn.jpg'
              }
            }
          }
        ]
      }
    ]
  }
]

//
export const DATA_USER_COLLECTIONS_STATUS = [
  {
    type: 2,
    name: 'anime',
    name_cn: '动画',
    collects: [
      { status: { id: 3, type: 'do', name: '在看' }, count: 2 },
      { status: { id: 2, type: 'collect', name: '看过' }, count: 2 },
      { status: { id: 4, type: 'on_hold', name: '搁置' }, count: 2 }
    ]
  }
]

// X
export const DATA_USER_PROGRESS = [
  {
    subject_id: 217660,
    eps: [
      {
        id: 849351,
        status: {
          id: 2,
          css_name: 'Watched',
          url_name: 'watched',
          cn_name: '看过'
        }
      },
      {
        id: 850121,
        status: {
          id: 2,
          css_name: 'Watched',
          url_name: 'watched',
          cn_name: '看过'
        }
      },
      {
        id: 850122,
        status: {
          id: 2,
          css_name: 'Watched',
          url_name: 'watched',
          cn_name: '看过'
        }
      },
      {
        id: 850123,
        status: {
          id: 2,
          css_name: 'Watched',
          url_name: 'watched',
          cn_name: '看过'
        }
      },
      {
        id: 850124,
        status: {
          id: 2,
          css_name: 'Watched',
          url_name: 'watched',
          cn_name: '看过'
        }
      },
      {
        id: 850125,
        status: {
          id: 2,
          css_name: 'Watched',
          url_name: 'watched',
          cn_name: '看过'
        }
      },
      {
        id: 850126,
        status: {
          id: 2,
          css_name: 'Watched',
          url_name: 'watched',
          cn_name: '看过'
        }
      }
    ]
  },
  {
    subject_id: 243916,
    eps: [
      {
        id: 850168,
        status: {
          id: 2,
          css_name: 'Watched',
          url_name: 'watched',
          cn_name: '看过'
        }
      },
      {
        id: 850169,
        status: {
          id: 2,
          css_name: 'Watched',
          url_name: 'watched',
          cn_name: '看过'
        }
      },
      {
        id: 850170,
        status: {
          id: 2,
          css_name: 'Watched',
          url_name: 'watched',
          cn_name: '看过'
        }
      },
      {
        id: 850171,
        status: {
          id: 2,
          css_name: 'Watched',
          url_name: 'watched',
          cn_name: '看过'
        }
      },
      {
        id: 850172,
        status: {
          id: 2,
          css_name: 'Watched',
          url_name: 'watched',
          cn_name: '看过'
        }
      },
      {
        id: 850173,
        status: {
          id: 2,
          css_name: 'Watched',
          url_name: 'watched',
          cn_name: '看过'
        }
      }
    ]
  }
]

// /217660
export const DATA_SUBJECT = {
  id: 217660,
  url: 'http://bgm.tv/subject/217660',
  type: 2,
  name: '盾の勇者の成り上がり',
  name_cn: '盾之勇者成名录',
  summary:
    'ごく平凡なオタク大学生・岩谷尚文は、図書館で出会った1冊の本に導かれ異世界へと召喚されてしまう。\r\n与えられた使命は、剣、槍、弓、盾をまとう四聖勇者の一人「盾の勇者」として、世界に混沌をもたらす災い「波」を振り払うこと。\r\n大冒険に胸を膨らませ、仲間とともに旅立った尚文。\r\nところが、出発から数日目にして裏切りに遭い、金も立場もすべて失ってしまう。\r\n他人を信じられなくなった尚文は奴隷の少女・ラフタリアを使役し、波に、世界に、立ち向かおうとするが―。\r\n果たして、この絶望的状況を打破することはできるのか?\r\nすべてを失った男の成り上がりファンタジー、開幕。',
  eps: 25,
  eps_count: 25,
  air_date: '2019-01-09',
  air_weekday: 3,
  rating: {
    total: 585,
    count: {
      '1': 18,
      '2': 8,
      '3': 11,
      '4': 29,
      '5': 56,
      '6': 130,
      '7': 226,
      '8': 79,
      '9': 14,
      '10': 14
    },
    score: 6.4
  },
  rank: 3849,
  images: {
    large: 'http://lain.bgm.tv/pic/cover/l/b9/9b/217660_h3554.jpg',
    common: 'http://lain.bgm.tv/pic/cover/c/b9/9b/217660_h3554.jpg',
    medium: 'http://lain.bgm.tv/pic/cover/m/b9/9b/217660_h3554.jpg',
    small: 'http://lain.bgm.tv/pic/cover/s/b9/9b/217660_h3554.jpg',
    grid: 'http://lain.bgm.tv/pic/cover/g/b9/9b/217660_h3554.jpg'
  },
  collection: { wish: 154, collect: 63, doing: 1466, on_hold: 43, dropped: 125 }
}

// /217660
export const DATA_SUBJECT_EP = {
  id: 217660,
  url: 'http://bgm.tv/subject/217660',
  type: 2,
  name: '盾の勇者の成り上がり',
  name_cn: '盾之勇者成名录',
  summary: '',
  air_date: '',
  air_weekday: 0,
  images: {
    large: 'http://lain.bgm.tv/pic/cover/l/b9/9b/217660_h3554.jpg',
    common: 'http://lain.bgm.tv/pic/cover/c/b9/9b/217660_h3554.jpg',
    medium: 'http://lain.bgm.tv/pic/cover/m/b9/9b/217660_h3554.jpg',
    small: 'http://lain.bgm.tv/pic/cover/s/b9/9b/217660_h3554.jpg',
    grid: 'http://lain.bgm.tv/pic/cover/g/b9/9b/217660_h3554.jpg'
  },
  eps: [
    {
      id: 849351,
      url: 'http://bgm.tv/ep/849351',
      type: 0,
      sort: 1,
      name: '盾の勇者',
      name_cn: '盾之勇者',
      duration: '00:47:20',
      airdate: '2019-01-09',
      comment: 84,
      desc:
        '図書館で『四聖武器書』という本を読んでいたところ、突如として異世界へ召喚された大学生・岩谷尚文。伝説の勇者の一人「盾の勇者」として世界を救うことになるが、ある朝、金と装備が盗まれてしまう。\r\n\r\n脚本：小柳啓伍　絵コンテ：阿保孝雄　演出：垪和等　作画監督：世良コータ/山村俊了/山本善哉/大高雄太/谷口義明/粟井重紀/飯飼一幸',
      status: 'Air'
    },
    {
      id: 850121,
      url: 'http://bgm.tv/ep/850121',
      type: 0,
      sort: 2,
      name: '奴隷の少女',
      name_cn: '奴隶少女',
      duration: '00:23:40',
      airdate: '2019-01-16',
      comment: 61,
      desc:
        '奴隷商に案内され、自らの剣となるパートナーを探す尚文。だが、手持ちの少ない尚文が買えるのは、病を患った亜人の少女のみだった。尚文はラフタリアと名乗る生気のない少女に、過酷な戦いを強いる。\r\n\r\n脚本：江嵜大兄　絵コンテ・演出：孫承希　作画監督：樋口香里/池津寿恵/大高雄太',
      status: 'Air'
    },
    {
      id: 850122,
      url: 'http://bgm.tv/ep/850122',
      type: 0,
      sort: 3,
      name: '災厄の波',
      name_cn: '灾厄的大浪',
      duration: '00:23:40',
      airdate: '2019-01-23',
      comment: 50,
      desc:
        '様々なスキルと技能を習得し、ラフタリアとの連携も抜群によくなった尚文。迫りくる波に対抗して武器と防具を新調し、波の刻限を示すという龍刻の砂時計へ向かう。すると、そこへ元康たちがやってきて……。\r\n\r\n脚本：江嵜大兄　絵コンテ・演出：森賢　作画監督：森賢/多田靖子',
      status: 'Air'
    },
    {
      id: 850123,
      url: 'http://bgm.tv/ep/850123',
      type: 0,
      sort: 4,
      name: '暁の子守唄',
      name_cn: '拂晓的摇篮曲',
      duration: '00:23:40',
      airdate: '2019-01-30',
      comment: 78,
      desc:
        '波が去ったのも束の間、メルロマルク城での祝宴のさなか尚文は元康から決闘を挑まれてしまう。奴隷を使役するのは勇者にあるまじき行為であり、即刻、ラフタリアを解放せよというのが元康の言い分なのだが……。\r\n\r\n脚本：江嵜大兄　絵コンテ：阿保孝雄/黒田結花　演出：孫承希\r\n作画監督：山村俊了/山本善哉/大高雄太/志賀道憲/池津寿恵/樋口香里',
      status: 'Air'
    },
    {
      id: 850124,
      url: 'http://bgm.tv/ep/850124',
      type: 0,
      sort: 5,
      name: 'フィーロ',
      name_cn: '菲洛',
      duration: '00:23:40',
      airdate: '2019-02-06',
      comment: 51,
      desc:
        'オルトクレイからなけなしの報酬を渡された尚文は、ラフタリアの要望で再び奴隷紋を入れ直した。数日後、奴隷商から購入した魔物の卵くじも孵化。新たな仲間を加えるが、滞在中のリユート村にマインが現れ……。\r\n\r\n脚本：田沢大典　絵コンテ：垪和等　演出：工藤利春　作画監督：﨑口さおり/樋口香里',
      status: 'Air'
    },
    {
      id: 850125,
      url: 'http://bgm.tv/ep/850125',
      type: 0,
      sort: 6,
      name: '新しい仲間',
      name_cn: '新的伙伴',
      duration: '00:23:40',
      airdate: '2019-02-13',
      comment: 37,
      desc:
        '謎の少女の正体はフィーロだった。フィーロは変身能力を持つフィロリアル・クイーンであり、人間の姿にもなれるという。しかし、変身のたびに服が破けるため魔法の服が必要に。尚文は素材を求め、新たな冒険に出発する。\r\n\r\n脚本：田沢大典　絵コンテ：名村英敏　演出：粟井重紀\r\n作画監督：胡陽樹/そらもとかん/服部益実/日高真由美',
      status: 'Air'
    },
    {
      id: 850126,
      url: 'http://bgm.tv/ep/850126',
      type: 0,
      sort: 7,
      name: '神鳥の聖人',
      name_cn: '神鸟圣人',
      duration: '00:23:40',
      airdate: '2019-02-20',
      comment: 30,
      desc:
        '除草剤を必要としている村があると聞き、行商に向かう尚文たち。村は魔物化した植物に飲み込まれ、住民は避難を余儀なくされていた。人間にも寄生するこの植物、どうやら原因を作ったのは元康のようで……。\r\n\r\n脚本：田沢大典　絵コンテ：孫承希/黒田結花　演出：徳野雄士\r\n作画監督：山村俊了/小島絵美/川島尚/一ノ瀬結梨/青木真理子/大高雄太/佐藤このみ/山本貴則',
      status: 'Air'
    },
    {
      id: 850127,
      url: 'http://bgm.tv/ep/850127',
      type: 0,
      sort: 8,
      name: '呪いの盾',
      name_cn: '诅咒之盾',
      duration: '00:23:40',
      airdate: '2019-02-27',
      comment: 0,
      desc: '',
      status: 'Today'
    },
    {
      id: 850128,
      url: 'http://bgm.tv/ep/850128',
      type: 0,
      sort: 9,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-03-06',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 850129,
      url: 'http://bgm.tv/ep/850129',
      type: 0,
      sort: 10,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-03-13',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 850130,
      url: 'http://bgm.tv/ep/850130',
      type: 0,
      sort: 11,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-03-20',
      comment: 1,
      desc: '',
      status: 'NA'
    },
    {
      id: 850131,
      url: 'http://bgm.tv/ep/850131',
      type: 0,
      sort: 12,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-03-27',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 851538,
      url: 'http://bgm.tv/ep/851538',
      type: 0,
      sort: 13,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-4-3',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 851539,
      url: 'http://bgm.tv/ep/851539',
      type: 0,
      sort: 14,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-4-10',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 851540,
      url: 'http://bgm.tv/ep/851540',
      type: 0,
      sort: 15,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-4-17',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 851541,
      url: 'http://bgm.tv/ep/851541',
      type: 0,
      sort: 16,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-4-24',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 851542,
      url: 'http://bgm.tv/ep/851542',
      type: 0,
      sort: 17,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-5-1',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 851543,
      url: 'http://bgm.tv/ep/851543',
      type: 0,
      sort: 18,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-5-8',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 851544,
      url: 'http://bgm.tv/ep/851544',
      type: 0,
      sort: 19,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-5-15',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 851545,
      url: 'http://bgm.tv/ep/851545',
      type: 0,
      sort: 20,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-5-22',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 851546,
      url: 'http://bgm.tv/ep/851546',
      type: 0,
      sort: 21,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-5-29',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 851547,
      url: 'http://bgm.tv/ep/851547',
      type: 0,
      sort: 22,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-6-5',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 851548,
      url: 'http://bgm.tv/ep/851548',
      type: 0,
      sort: 23,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-6-12',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 851549,
      url: 'http://bgm.tv/ep/851549',
      type: 0,
      sort: 24,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-6-19',
      comment: 0,
      desc: '',
      status: 'NA'
    },
    {
      id: 851550,
      url: 'http://bgm.tv/ep/851550',
      type: 0,
      sort: 25,
      name: '',
      name_cn: '',
      duration: '00:23:40',
      airdate: '2019-6-26',
      comment: 0,
      desc: '',
      status: 'NA'
    }
  ]
}

//
export const DATA_CALENDAR = [
  {
    weekday: { en: 'Mon', cn: '星期一', ja: '月耀日', id: 1 },
    items: [
      {
        id: 212186,
        url: 'http://bgm.tv/subject/212186',
        type: 2,
        name: 'けものフレンズ2',
        name_cn: '兽娘动物园2',
        summary: '',
        air_date: '2019-01-14',
        air_weekday: 1,
        rating: {
          total: 125,
          count: {
            '1': 68,
            '2': 4,
            '3': 8,
            '4': 8,
            '5': 12,
            '6': 14,
            '7': 8,
            '8': 1,
            '9': 0,
            '10': 2
          },
          score: 2.9
        },
        rank: 5159,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/66/71/212186_VVyYd.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/66/71/212186_VVyYd.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/66/71/212186_VVyYd.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/66/71/212186_VVyYd.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/66/71/212186_VVyYd.jpg'
        },
        collection: { doing: 204 }
      },
      {
        id: 238640,
        url: 'http://bgm.tv/subject/238640',
        type: 2,
        name: 'ぱすてるメモリーズ',
        name_cn: '粉彩回忆',
        summary: '',
        air_date: '2019-01-07',
        air_weekday: 1,
        rating: {
          total: 43,
          count: {
            '1': 2,
            '2': 4,
            '3': 1,
            '4': 13,
            '5': 9,
            '6': 5,
            '7': 6,
            '8': 0,
            '9': 1,
            '10': 2
          },
          score: 4.9
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/77/8a/238640_hmZhe.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/77/8a/238640_hmZhe.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/77/8a/238640_hmZhe.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/77/8a/238640_hmZhe.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/77/8a/238640_hmZhe.jpg'
        },
        collection: { doing: 102 }
      },
      {
        id: 240760,
        url: 'http://bgm.tv/subject/240760',
        type: 2,
        name: 'モブサイコ100 II',
        name_cn: '灵能百分百 第二季',
        summary: '',
        air_date: '2019-01-07',
        air_weekday: 1,
        rating: {
          total: 681,
          count: {
            '1': 4,
            '2': 2,
            '3': 2,
            '4': 3,
            '5': 7,
            '6': 24,
            '7': 64,
            '8': 271,
            '9': 207,
            '10': 97
          },
          score: 8.3
        },
        rank: 101,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/8e/c7/240760_368N6.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/8e/c7/240760_368N6.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/8e/c7/240760_368N6.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/8e/c7/240760_368N6.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/8e/c7/240760_368N6.jpg'
        },
        collection: { doing: 1899 }
      },
      {
        id: 240838,
        url: 'http://bgm.tv/subject/240838',
        type: 2,
        name: 'どろろ',
        name_cn: '多罗罗',
        summary: '',
        air_date: '2019-01-07',
        air_weekday: 1,
        rating: {
          total: 707,
          count: {
            '1': 5,
            '2': 1,
            '3': 0,
            '4': 6,
            '5': 10,
            '6': 55,
            '7': 207,
            '8': 300,
            '9': 89,
            '10': 34
          },
          score: 7.6
        },
        rank: 596,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/d3/da/240838_5Ax95.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/d3/da/240838_5Ax95.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/d3/da/240838_5Ax95.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/d3/da/240838_5Ax95.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/d3/da/240838_5Ax95.jpg'
        },
        collection: { doing: 2146 }
      },
      {
        id: 269533,
        url: 'http://bgm.tv/subject/269533',
        type: 2,
        name: '领风者',
        name_cn: '',
        summary: '',
        air_date: '2019-01-28',
        air_weekday: 1,
        rating: {
          total: 65,
          count: {
            '1': 24,
            '2': 7,
            '3': 2,
            '4': 7,
            '5': 4,
            '6': 9,
            '7': 4,
            '8': 4,
            '9': 1,
            '10': 3
          },
          score: 3.8
        },
        rank: 5107,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/3d/43/269533_LrX3Y.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/3d/43/269533_LrX3Y.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/3d/43/269533_LrX3Y.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/3d/43/269533_LrX3Y.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/3d/43/269533_LrX3Y.jpg'
        },
        collection: { doing: 69 }
      }
    ]
  },
  {
    weekday: { en: 'Tue', cn: '星期二', ja: '火耀日', id: 2 },
    items: [
      {
        id: 234778,
        url: 'http://bgm.tv/subject/234778',
        type: 2,
        name: '賭ケグルイ××',
        name_cn: '狂赌之渊 ××',
        summary: '',
        air_date: '2019-01-08',
        air_weekday: 2,
        rating: {
          total: 221,
          count: {
            '1': 2,
            '2': 3,
            '3': 1,
            '4': 2,
            '5': 7,
            '6': 29,
            '7': 96,
            '8': 64,
            '9': 8,
            '10': 9
          },
          score: 7.1
        },
        rank: 1707,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/cd/ca/234778_GDBgO.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/cd/ca/234778_GDBgO.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/cd/ca/234778_GDBgO.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/cd/ca/234778_GDBgO.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/cd/ca/234778_GDBgO.jpg'
        },
        collection: { doing: 913 }
      },
      {
        id: 249637,
        url: 'http://bgm.tv/subject/249637',
        type: 2,
        name: '私に天使が舞い降りた！',
        name_cn: '天使降临到了我身边',
        summary: '',
        air_date: '2019-01-08',
        air_weekday: 2,
        rating: {
          total: 502,
          count: {
            '1': 5,
            '2': 1,
            '3': 1,
            '4': 6,
            '5': 13,
            '6': 48,
            '7': 171,
            '8': 175,
            '9': 48,
            '10': 34
          },
          score: 7.5
        },
        rank: 891,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/f3/2d/249637_2r3gw.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/f3/2d/249637_2r3gw.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/f3/2d/249637_2r3gw.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/f3/2d/249637_2r3gw.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/f3/2d/249637_2r3gw.jpg'
        },
        collection: { doing: 1343 }
      },
      {
        id: 250514,
        url: 'http://bgm.tv/subject/250514',
        type: 2,
        name: '3D彼女 リアルガール 第2シリーズ',
        name_cn: '3D彼女 第二季',
        summary: '',
        air_date: '2019-01-08',
        air_weekday: 2,
        rating: {
          total: 22,
          count: {
            '1': 1,
            '2': 1,
            '3': 0,
            '4': 1,
            '5': 4,
            '6': 11,
            '7': 3,
            '8': 1,
            '9': 0,
            '10': 0
          },
          score: 5.5
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/28/a4/250514_BNBt6.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/28/a4/250514_BNBt6.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/28/a4/250514_BNBt6.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/28/a4/250514_BNBt6.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/28/a4/250514_BNBt6.jpg'
        },
        collection: { doing: 94 }
      },
      {
        id: 256552,
        url: 'http://bgm.tv/subject/256552',
        type: 2,
        name: 'サークレット・プリンセス',
        name_cn: '环战公主 CIRCLET PRINCESS',
        summary: '',
        air_date: '2019-01-08',
        air_weekday: 2,
        rating: {
          total: 82,
          count: {
            '1': 3,
            '2': 5,
            '3': 2,
            '4': 9,
            '5': 20,
            '6': 21,
            '7': 14,
            '8': 3,
            '9': 4,
            '10': 1
          },
          score: 5.5
        },
        rank: 4478,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/23/1e/256552_nuxxe.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/23/1e/256552_nuxxe.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/23/1e/256552_nuxxe.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/23/1e/256552_nuxxe.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/23/1e/256552_nuxxe.jpg'
        },
        collection: { doing: 183 }
      },
      {
        id: 256660,
        url: 'http://bgm.tv/subject/256660',
        type: 2,
        name: '臨死!! 江古田ちゃん',
        name_cn: '临死！！江古田',
        summary: '',
        air_date: '2019-01-08',
        air_weekday: 2,
        rating: {
          total: 34,
          count: {
            '1': 2,
            '2': 0,
            '3': 1,
            '4': 3,
            '5': 2,
            '6': 13,
            '7': 10,
            '8': 3,
            '9': 0,
            '10': 0
          },
          score: 5.9
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/1e/a2/256660_6U3i6.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/1e/a2/256660_6U3i6.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/1e/a2/256660_6U3i6.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/1e/a2/256660_6U3i6.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/1e/a2/256660_6U3i6.jpg'
        },
        collection: { doing: 168 }
      },
      {
        id: 264358,
        url: 'http://bgm.tv/subject/264358',
        type: 2,
        name: '雨色ココアside G',
        name_cn: '雨色可可 side G',
        summary: '',
        air_date: '2019-01-08',
        air_weekday: 2,
        rating: {
          total: 34,
          count: {
            '1': 3,
            '2': 1,
            '3': 0,
            '4': 2,
            '5': 5,
            '6': 10,
            '7': 4,
            '8': 5,
            '9': 1,
            '10': 3
          },
          score: 6
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/43/4e/264358_zqQO3.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/43/4e/264358_zqQO3.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/43/4e/264358_zqQO3.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/43/4e/264358_zqQO3.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/43/4e/264358_zqQO3.jpg'
        },
        collection: { doing: 118 }
      },
      {
        id: 269422,
        url: 'http://bgm.tv/subject/269422',
        type: 2,
        name: 'ぷそ煮コミ',
        name_cn: '',
        summary: '',
        air_date: '2019-01-08',
        air_weekday: 2,
        rating: {
          total: 2,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 2,
            '8': 0,
            '9': 0,
            '10': 0
          },
          score: 7
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/74/46/269422_y0kSE.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/74/46/269422_y0kSE.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/74/46/269422_y0kSE.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/74/46/269422_y0kSE.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/74/46/269422_y0kSE.jpg'
        },
        collection: { doing: 7 }
      },
      {
        id: 271256,
        url: 'http://bgm.tv/subject/271256',
        type: 2,
        name: '灵剑尊',
        name_cn: '',
        summary: '',
        air_date: '2019-01-15',
        air_weekday: 2,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/06/c6/271256_zR2r0.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/06/c6/271256_zR2r0.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/06/c6/271256_zR2r0.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/06/c6/271256_zR2r0.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/06/c6/271256_zR2r0.jpg'
        },
        collection: { doing: 3 }
      },
      {
        id: 274113,
        url: 'http://bgm.tv/subject/274113',
        type: 2,
        name: '荒野のコトブキ飛行隊 コトブキ通信',
        name_cn: '荒野的寿飞行队 寿通信',
        summary: '',
        air_date: '2019-01-15',
        air_weekday: 2,
        rating: {
          total: 1,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 1,
            '8': 0,
            '9': 0,
            '10': 0
          },
          score: 7
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/ce/d6/274113_k6DJe.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/ce/d6/274113_k6DJe.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/ce/d6/274113_k6DJe.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/ce/d6/274113_k6DJe.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/ce/d6/274113_k6DJe.jpg'
        },
        collection: { doing: 7 }
      }
    ]
  },
  {
    weekday: { en: 'Wed', cn: '星期三', ja: '水耀日', id: 3 },
    items: [
      {
        id: 194858,
        url: 'http://bgm.tv/subject/194858',
        type: 2,
        name: '明治東亰恋伽',
        name_cn: '明治东京恋伽',
        summary: '',
        air_date: '2019-01-09',
        air_weekday: 3,
        rating: {
          total: 26,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 4,
            '6': 7,
            '7': 10,
            '8': 4,
            '9': 1,
            '10': 0
          },
          score: 6.7
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/67/23/194858_GPGDa.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/67/23/194858_GPGDa.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/67/23/194858_GPGDa.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/67/23/194858_GPGDa.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/67/23/194858_GPGDa.jpg'
        },
        collection: { doing: 98 }
      },
      {
        id: 217660,
        url: 'http://bgm.tv/subject/217660',
        type: 2,
        name: '盾の勇者の成り上がり',
        name_cn: '盾之勇者成名录',
        summary: '',
        air_date: '2019-01-09',
        air_weekday: 3,
        rating: {
          total: 585,
          count: {
            '1': 18,
            '2': 8,
            '3': 11,
            '4': 29,
            '5': 56,
            '6': 130,
            '7': 226,
            '8': 79,
            '9': 14,
            '10': 14
          },
          score: 6.4
        },
        rank: 3849,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/b9/9b/217660_h3554.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/b9/9b/217660_h3554.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/b9/9b/217660_h3554.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/b9/9b/217660_h3554.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/b9/9b/217660_h3554.jpg'
        },
        collection: { doing: 1466 }
      },
      {
        id: 237423,
        url: 'http://bgm.tv/subject/237423',
        type: 2,
        name: 'ケムリクサ',
        name_cn: '烟草',
        summary: '',
        air_date: '2019-01-09',
        air_weekday: 3,
        rating: {
          total: 280,
          count: {
            '1': 6,
            '2': 4,
            '3': 2,
            '4': 8,
            '5': 12,
            '6': 47,
            '7': 100,
            '8': 77,
            '9': 13,
            '10': 11
          },
          score: 6.9
        },
        rank: 2239,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/b2/01/237423_S1Sxz.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/b2/01/237423_S1Sxz.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/b2/01/237423_S1Sxz.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/b2/01/237423_S1Sxz.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/b2/01/237423_S1Sxz.jpg'
        },
        collection: { doing: 1037 }
      },
      {
        id: 239911,
        url: 'http://bgm.tv/subject/239911',
        type: 2,
        name: 'revisions リヴィジョンズ',
        name_cn: 'revisions',
        summary: '',
        air_date: '2019-01-09',
        air_weekday: 3,
        rating: {
          total: 553,
          count: {
            '1': 14,
            '2': 6,
            '3': 6,
            '4': 22,
            '5': 63,
            '6': 153,
            '7': 199,
            '8': 81,
            '9': 6,
            '10': 3
          },
          score: 6.3
        },
        rank: 3938,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/2a/06/239911_A7Jd2.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/2a/06/239911_A7Jd2.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/2a/06/239911_A7Jd2.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/2a/06/239911_A7Jd2.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/2a/06/239911_A7Jd2.jpg'
        },
        collection: { doing: 308 }
      },
      {
        id: 256528,
        url: 'http://bgm.tv/subject/256528',
        type: 2,
        name: '同居人はひざ、時々、頭のうえ。',
        name_cn: '同居人时而在腿上、时而跑到脑袋上',
        summary: '',
        air_date: '2019-01-09',
        air_weekday: 3,
        rating: {
          total: 116,
          count: {
            '1': 2,
            '2': 0,
            '3': 0,
            '4': 4,
            '5': 7,
            '6': 14,
            '7': 47,
            '8': 34,
            '9': 4,
            '10': 4
          },
          score: 7
        },
        rank: 1901,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/7f/44/256528_L1mli.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/7f/44/256528_L1mli.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/7f/44/256528_L1mli.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/7f/44/256528_L1mli.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/7f/44/256528_L1mli.jpg'
        },
        collection: { doing: 389 }
      },
      {
        id: 269534,
        url: 'http://bgm.tv/subject/269534',
        type: 2,
        name: 'バーチャルさんはみている',
        name_cn: '虚拟小姐在看着你',
        summary: '',
        air_date: '2019-01-09',
        air_weekday: 3,
        rating: {
          total: 120,
          count: {
            '1': 12,
            '2': 9,
            '3': 5,
            '4': 17,
            '5': 16,
            '6': 35,
            '7': 11,
            '8': 5,
            '9': 2,
            '10': 8
          },
          score: 5.2
        },
        rank: 4874,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/54/82/269534_5b454.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/54/82/269534_5b454.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/54/82/269534_5b454.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/54/82/269534_5b454.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/54/82/269534_5b454.jpg'
        },
        collection: { doing: 245 }
      },
      {
        id: 271248,
        url: 'http://bgm.tv/subject/271248',
        type: 2,
        name: '王者歪传 第2季',
        name_cn: '',
        summary: '',
        air_date: '2019-01-02',
        air_weekday: 3,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/8f/74/271248_33PzS.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/8f/74/271248_33PzS.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/8f/74/271248_33PzS.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/8f/74/271248_33PzS.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/8f/74/271248_33PzS.jpg'
        },
        collection: { doing: 1 }
      },
      {
        id: 274248,
        url: 'http://bgm.tv/subject/274248',
        type: 2,
        name: 'Marvel Rising: Chasing Ghosts',
        name_cn: '漫威崛起：幽灵蜘蛛',
        summary: '',
        air_date: '2019-01-16',
        air_weekday: 3,
        rating: {
          total: 1,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 1,
            '7': 0,
            '8': 0,
            '9': 0,
            '10': 0
          },
          score: 6
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/4d/74/274248_mOVZ4.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/4d/74/274248_mOVZ4.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/4d/74/274248_mOVZ4.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/4d/74/274248_mOVZ4.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/4d/74/274248_mOVZ4.jpg'
        }
      },
      {
        id: 274256,
        url: 'http://bgm.tv/subject/274256',
        type: 2,
        name: 'ナツオ整備班長の戦闘機講座',
        name_cn: '夏生整备班长的战斗机讲座',
        summary: '',
        air_date: '2019-01-23',
        air_weekday: 3,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/a3/6d/274256_vHCpc.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/a3/6d/274256_vHCpc.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/a3/6d/274256_vHCpc.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/a3/6d/274256_vHCpc.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/a3/6d/274256_vHCpc.jpg'
        },
        collection: { doing: 18 }
      }
    ]
  },
  {
    weekday: { en: 'Thu', cn: '星期四', ja: '木耀日', id: 4 },
    items: [
      {
        id: 2782,
        url: 'http://bgm.tv/subject/2782',
        type: 2,
        name: 'NARUTO -ナルト- 疾風伝',
        name_cn: '火影忍者疾风传',
        summary: '',
        air_date: '2007-02-15',
        air_weekday: 4,
        rating: {
          total: 2167,
          count: {
            '1': 24,
            '2': 7,
            '3': 17,
            '4': 48,
            '5': 141,
            '6': 314,
            '7': 658,
            '8': 492,
            '9': 238,
            '10': 228
          },
          score: 7.3
        },
        rank: 1210,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/60/24/2782_r0650.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/60/24/2782_r0650.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/60/24/2782_r0650.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/60/24/2782_r0650.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/60/24/2782_r0650.jpg'
        },
        collection: { doing: 1073 }
      },
      {
        id: 197162,
        url: 'http://bgm.tv/subject/197162',
        type: 2,
        name: 'フライングベイビーズ',
        name_cn: '草裙舞女孩',
        summary: '',
        air_date: '2019-01-10',
        air_weekday: 4,
        rating: {
          total: 34,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 4,
            '5': 3,
            '6': 3,
            '7': 8,
            '8': 10,
            '9': 3,
            '10': 3
          },
          score: 7.1
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/62/67/197162_TOJjC.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/62/67/197162_TOJjC.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/62/67/197162_TOJjC.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/62/67/197162_TOJjC.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/62/67/197162_TOJjC.jpg'
        },
        collection: { doing: 108 }
      },
      {
        id: 223129,
        url: 'http://bgm.tv/subject/223129',
        type: 2,
        name: '邪王追妻',
        name_cn: '邪王追妻',
        summary: '',
        air_date: '2019-01-24',
        air_weekday: 4,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/0e/43/223129_Dsg0H.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/0e/43/223129_Dsg0H.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/0e/43/223129_Dsg0H.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/0e/43/223129_Dsg0H.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/0e/43/223129_Dsg0H.jpg'
        },
        collection: { doing: 2 }
      },
      {
        id: 235722,
        url: 'http://bgm.tv/subject/235722',
        type: 2,
        name: 'グリムノーツ The Animation',
        name_cn: '格林笔记',
        summary: '',
        air_date: '2019-01-10',
        air_weekday: 4,
        rating: {
          total: 170,
          count: {
            '1': 2,
            '2': 0,
            '3': 1,
            '4': 3,
            '5': 18,
            '6': 33,
            '7': 49,
            '8': 33,
            '9': 23,
            '10': 8
          },
          score: 7.1
        },
        rank: 1874,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/59/5d/235722_hq54e.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/59/5d/235722_hq54e.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/59/5d/235722_hq54e.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/59/5d/235722_hq54e.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/59/5d/235722_hq54e.jpg'
        },
        collection: { doing: 406 }
      },
      {
        id: 243916,
        url: 'http://bgm.tv/subject/243916',
        type: 2,
        name: '約束のネバーランド',
        name_cn: '约定的梦幻岛',
        summary: '',
        air_date: '2019-01-10',
        air_weekday: 4,
        rating: {
          total: 671,
          count: {
            '1': 6,
            '2': 0,
            '3': 3,
            '4': 7,
            '5': 10,
            '6': 56,
            '7': 179,
            '8': 341,
            '9': 53,
            '10': 16
          },
          score: 7.5
        },
        rank: 798,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/ff/49/243916_XXJsd.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/ff/49/243916_XXJsd.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/ff/49/243916_XXJsd.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/ff/49/243916_XXJsd.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/ff/49/243916_XXJsd.jpg'
        },
        collection: { doing: 2219 }
      },
      {
        id: 244232,
        url: 'http://bgm.tv/subject/244232',
        type: 2,
        name: '雄兵连之诸天降临',
        name_cn: '雄兵连之诸天降临',
        summary: '',
        air_date: '2019-01-24',
        air_weekday: 4,
        rating: {
          total: 1,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 1,
            '8': 0,
            '9': 0,
            '10': 0
          },
          score: 7
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/71/ec/244232_lwjHn.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/71/ec/244232_lwjHn.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/71/ec/244232_lwjHn.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/71/ec/244232_lwjHn.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/71/ec/244232_lwjHn.jpg'
        },
        collection: { doing: 9 }
      },
      {
        id: 246429,
        url: 'http://bgm.tv/subject/246429',
        type: 2,
        name: 'BanG Dream! 2nd Season',
        name_cn: 'BanG Dream! 第二季',
        summary: '',
        air_date: '2019-01-03',
        air_weekday: 4,
        rating: {
          total: 298,
          count: {
            '1': 5,
            '2': 0,
            '3': 1,
            '4': 4,
            '5': 9,
            '6': 10,
            '7': 35,
            '8': 82,
            '9': 120,
            '10': 32
          },
          score: 8.2
        },
        rank: 192,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/d9/f3/246429_L8TbT.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/d9/f3/246429_L8TbT.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/d9/f3/246429_L8TbT.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/d9/f3/246429_L8TbT.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/d9/f3/246429_L8TbT.jpg'
        },
        collection: { doing: 516 }
      },
      {
        id: 248208,
        url: 'http://bgm.tv/subject/248208',
        type: 2,
        name: 'ガーリー・エアフォース',
        name_cn: '飞翔吧！战机少女',
        summary: '',
        air_date: '2019-01-10',
        air_weekday: 4,
        rating: {
          total: 110,
          count: {
            '1': 10,
            '2': 4,
            '3': 6,
            '4': 12,
            '5': 24,
            '6': 26,
            '7': 20,
            '8': 3,
            '9': 2,
            '10': 3
          },
          score: 5.2
        },
        rank: 4820,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/0f/5f/248208_y3M3x.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/0f/5f/248208_y3M3x.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/0f/5f/248208_y3M3x.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/0f/5f/248208_y3M3x.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/0f/5f/248208_y3M3x.jpg'
        },
        collection: { doing: 237 }
      },
      {
        id: 256114,
        url: 'http://bgm.tv/subject/256114',
        type: 2,
        name: '五等分の花嫁',
        name_cn: '五等分的新娘',
        summary: '',
        air_date: '2019-01-10',
        air_weekday: 4,
        rating: {
          total: 742,
          count: {
            '1': 21,
            '2': 14,
            '3': 18,
            '4': 65,
            '5': 101,
            '6': 208,
            '7': 214,
            '8': 65,
            '9': 19,
            '10': 17
          },
          score: 6
        },
        rank: 4500,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/fd/cd/256114_2S1Yj.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/fd/cd/256114_2S1Yj.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/fd/cd/256114_2S1Yj.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/fd/cd/256114_2S1Yj.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/fd/cd/256114_2S1Yj.jpg'
        },
        collection: { doing: 1697 }
      },
      {
        id: 262276,
        url: 'http://bgm.tv/subject/262276',
        type: 2,
        name: '一騎当千 Western Wolves',
        name_cn: '一骑当千 Western Wolves',
        summary: '',
        air_date: '2019-01-03',
        air_weekday: 4,
        rating: {
          total: 14,
          count: {
            '1': 0,
            '2': 0,
            '3': 1,
            '4': 0,
            '5': 3,
            '6': 2,
            '7': 5,
            '8': 1,
            '9': 0,
            '10': 2
          },
          score: 6.6
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/02/38/262276_grZMm.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/02/38/262276_grZMm.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/02/38/262276_grZMm.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/02/38/262276_grZMm.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/02/38/262276_grZMm.jpg'
        },
        collection: { doing: 73 }
      },
      {
        id: 262505,
        url: 'http://bgm.tv/subject/262505',
        type: 2,
        name: 'Dimensionハイスクール',
        name_cn: 'Dimension高中',
        summary: '',
        air_date: '2019-01-10',
        air_weekday: 4,
        rating: {
          total: 3,
          count: {
            '1': 1,
            '2': 0,
            '3': 1,
            '4': 0,
            '5': 1,
            '6': 0,
            '7': 0,
            '8': 0,
            '9': 0,
            '10': 0
          },
          score: 3
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/fa/e0/262505_5kcD5.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/fa/e0/262505_5kcD5.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/fa/e0/262505_5kcD5.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/fa/e0/262505_5kcD5.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/fa/e0/262505_5kcD5.jpg'
        },
        collection: { doing: 9 }
      },
      {
        id: 269092,
        url: 'http://bgm.tv/subject/269092',
        type: 2,
        name: '池袋PRアニメ',
        name_cn: '池袋PR动画',
        summary: '',
        air_date: '2019-01-17',
        air_weekday: 4,
        rating: {
          total: 35,
          count: {
            '1': 2,
            '2': 2,
            '3': 0,
            '4': 2,
            '5': 10,
            '6': 11,
            '7': 6,
            '8': 2,
            '9': 0,
            '10': 0
          },
          score: 5.4
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/0d/3e/269092_WpgDq.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/0d/3e/269092_WpgDq.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/0d/3e/269092_WpgDq.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/0d/3e/269092_WpgDq.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/0d/3e/269092_WpgDq.jpg'
        },
        collection: { doing: 3 }
      },
      {
        id: 269548,
        url: 'http://bgm.tv/subject/269548',
        type: 2,
        name: '请吃红小豆吧！ 第二季',
        name_cn: '',
        summary: '',
        air_date: '2019-01-13',
        air_weekday: 4,
        rating: {
          total: 16,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 1,
            '5': 1,
            '6': 1,
            '7': 6,
            '8': 6,
            '9': 0,
            '10': 1
          },
          score: 7.2
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/23/62/269548_xf3Vz.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/23/62/269548_xf3Vz.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/23/62/269548_xf3Vz.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/23/62/269548_xf3Vz.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/23/62/269548_xf3Vz.jpg'
        },
        collection: { doing: 39 }
      }
    ]
  },
  {
    weekday: { en: 'Fri', cn: '星期五', ja: '金耀日', id: 5 },
    items: [
      {
        id: 83124,
        url: 'http://bgm.tv/subject/83124',
        type: 2,
        name: '妖怪ウォッチ',
        name_cn: '妖怪手表',
        summary: '',
        air_date: '2014-01-08',
        air_weekday: 5,
        rating: {
          total: 144,
          count: {
            '1': 0,
            '2': 1,
            '3': 1,
            '4': 1,
            '5': 9,
            '6': 19,
            '7': 50,
            '8': 40,
            '9': 13,
            '10': 10
          },
          score: 7.3
        },
        rank: 1270,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/da/bf/83124_t8vg0.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/da/bf/83124_t8vg0.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/da/bf/83124_t8vg0.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/da/bf/83124_t8vg0.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/da/bf/83124_t8vg0.jpg'
        },
        collection: { doing: 137 }
      },
      {
        id: 197417,
        url: 'http://bgm.tv/subject/197417',
        type: 2,
        name: 'Young Justice: Outsiders',
        name_cn: '少年正义联盟 局外人',
        summary: '',
        air_date: '2019-01-04',
        air_weekday: 5,
        rating: {
          total: 9,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 1,
            '7': 0,
            '8': 6,
            '9': 1,
            '10': 1
          },
          score: 8.1
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/09/31/197417_noXX6.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/09/31/197417_noXX6.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/09/31/197417_noXX6.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/09/31/197417_noXX6.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/09/31/197417_noXX6.jpg'
        },
        collection: { doing: 17 }
      },
      {
        id: 221539,
        url: 'http://bgm.tv/subject/221539',
        type: 2,
        name: 'Carmen Sandiego Season 1',
        name_cn: '神偷卡门 新作',
        summary: '',
        air_date: '2019-01-18',
        air_weekday: 5,
        rating: {
          total: 6,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 1,
            '6': 3,
            '7': 1,
            '8': 0,
            '9': 0,
            '10': 1
          },
          score: 6.7
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/e0/bd/221539_PTxN1.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/e0/bd/221539_PTxN1.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/e0/bd/221539_PTxN1.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/e0/bd/221539_PTxN1.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/e0/bd/221539_PTxN1.jpg'
        },
        collection: { doing: 11 }
      },
      {
        id: 226806,
        url: 'http://bgm.tv/subject/226806',
        type: 2,
        name: 'B-PROJECT～絶頂＊エモーション～',
        name_cn: 'B-PROJECT～绝顶＊Emotion～',
        summary: '',
        air_date: '2019-01-11',
        air_weekday: 5,
        rating: {
          total: 9,
          count: {
            '1': 1,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 4,
            '6': 1,
            '7': 2,
            '8': 1,
            '9': 0,
            '10': 0
          },
          score: 5.4
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/ae/35/226806_2rZjZ.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/ae/35/226806_2rZjZ.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/ae/35/226806_2rZjZ.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/ae/35/226806_2rZjZ.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/ae/35/226806_2rZjZ.jpg'
        },
        collection: { doing: 36 }
      },
      {
        id: 228254,
        url: 'http://bgm.tv/subject/228254',
        type: 2,
        name: 'デート・ア・ライブⅢ',
        name_cn: '约会大作战 第三季',
        summary: '',
        air_date: '2019-01-11',
        air_weekday: 5,
        rating: {
          total: 287,
          count: {
            '1': 28,
            '2': 12,
            '3': 14,
            '4': 34,
            '5': 59,
            '6': 76,
            '7': 43,
            '8': 9,
            '9': 4,
            '10': 8
          },
          score: 5.1
        },
        rank: 5063,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/73/8c/228254_X7Y56.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/73/8c/228254_X7Y56.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/73/8c/228254_X7Y56.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/73/8c/228254_X7Y56.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/73/8c/228254_X7Y56.jpg'
        },
        collection: { doing: 660 }
      },
      {
        id: 237991,
        url: 'http://bgm.tv/subject/237991',
        type: 2,
        name: '凹凸世界 第三季',
        name_cn: '',
        summary: '',
        air_date: '2019-01-25',
        air_weekday: 5,
        rating: {
          total: 8,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 2,
            '7': 3,
            '8': 2,
            '9': 0,
            '10': 1
          },
          score: 7.4
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/f8/93/237991_8itLl.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/f8/93/237991_8itLl.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/f8/93/237991_8itLl.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/f8/93/237991_8itLl.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/f8/93/237991_8itLl.jpg'
        },
        collection: { doing: 22 }
      },
      {
        id: 240039,
        url: 'http://bgm.tv/subject/240039',
        type: 2,
        name: 'ブギーポップは笑わない',
        name_cn: '不吉波普不笑',
        summary: '',
        air_date: '2019-01-04',
        air_weekday: 5,
        rating: {
          total: 607,
          count: {
            '1': 5,
            '2': 1,
            '3': 8,
            '4': 7,
            '5': 23,
            '6': 90,
            '7': 193,
            '8': 217,
            '9': 47,
            '10': 16
          },
          score: 7.2
        },
        rank: 1419,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/41/2a/240039_DSzs2.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/41/2a/240039_DSzs2.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/41/2a/240039_DSzs2.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/41/2a/240039_DSzs2.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/41/2a/240039_DSzs2.jpg'
        },
        collection: { doing: 1838 }
      },
      {
        id: 253628,
        url: 'http://bgm.tv/subject/253628',
        type: 2,
        name: 'ドメスティックな彼女',
        name_cn: '家有女友',
        summary: '',
        air_date: '2019-01-11',
        air_weekday: 5,
        rating: {
          total: 339,
          count: {
            '1': 4,
            '2': 1,
            '3': 0,
            '4': 9,
            '5': 21,
            '6': 77,
            '7': 125,
            '8': 80,
            '9': 8,
            '10': 14
          },
          score: 6.9
        },
        rank: 2285,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/33/f9/253628_F42y2.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/33/f9/253628_F42y2.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/33/f9/253628_F42y2.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/33/f9/253628_F42y2.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/33/f9/253628_F42y2.jpg'
        },
        collection: { doing: 1064 }
      },
      {
        id: 254716,
        url: 'http://bgm.tv/subject/254716',
        type: 2,
        name: '魔法少女特殊戦あすか',
        name_cn: '魔法少女特殊战明日香',
        summary: '',
        air_date: '2019-01-11',
        air_weekday: 5,
        rating: {
          total: 127,
          count: {
            '1': 2,
            '2': 1,
            '3': 5,
            '4': 5,
            '5': 15,
            '6': 54,
            '7': 34,
            '8': 8,
            '9': 0,
            '10': 3
          },
          score: 6.1
        },
        rank: 3944,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/e2/a7/254716_ODniN.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/e2/a7/254716_ODniN.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/e2/a7/254716_ODniN.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/e2/a7/254716_ODniN.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/e2/a7/254716_ODniN.jpg'
        },
        collection: { doing: 389 }
      },
      {
        id: 263907,
        url: 'http://bgm.tv/subject/263907',
        type: 2,
        name: 'エガオノダイカ',
        name_cn: '笑容的代价',
        summary: '',
        air_date: '2019-01-04',
        air_weekday: 5,
        rating: {
          total: 224,
          count: {
            '1': 9,
            '2': 6,
            '3': 14,
            '4': 33,
            '5': 51,
            '6': 70,
            '7': 32,
            '8': 4,
            '9': 3,
            '10': 2
          },
          score: 5.2
        },
        rank: 4991,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/f4/c4/263907_ug4y0.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/f4/c4/263907_ug4y0.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/f4/c4/263907_ug4y0.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/f4/c4/263907_ug4y0.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/f4/c4/263907_ug4y0.jpg'
        },
        collection: { doing: 511 }
      },
      {
        id: 267481,
        url: 'http://bgm.tv/subject/267481',
        type: 2,
        name: 'ルパン三世 グッバイ・パートナー',
        name_cn: '鲁邦三世 Goodbye Partner',
        summary: '',
        air_date: '2019-01-25',
        air_weekday: 5,
        rating: {
          total: 16,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 1,
            '5': 1,
            '6': 8,
            '7': 2,
            '8': 4,
            '9': 0,
            '10': 0
          },
          score: 6.4
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/26/04/267481_zuLcJ.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/26/04/267481_zuLcJ.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/26/04/267481_zuLcJ.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/26/04/267481_zuLcJ.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/26/04/267481_zuLcJ.jpg'
        },
        collection: { doing: 9 }
      },
      {
        id: 273517,
        url: 'http://bgm.tv/subject/273517',
        type: 2,
        name: '真夜中のボイトレ男子',
        name_cn: '',
        summary: '',
        air_date: '2019-01-04',
        air_weekday: 5,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/97/6d/273517_JJP11.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/97/6d/273517_JJP11.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/97/6d/273517_JJP11.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/97/6d/273517_JJP11.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/97/6d/273517_JJP11.jpg'
        }
      }
    ]
  },
  {
    weekday: { en: 'Sat', cn: '星期六', ja: '土耀日', id: 6 },
    items: [
      {
        id: 899,
        url: 'http://bgm.tv/subject/899',
        type: 2,
        name: '名探偵コナン',
        name_cn: '名侦探柯南',
        summary: '',
        air_date: '1996-01-08',
        air_weekday: 6,
        rating: {
          total: 3456,
          count: {
            '1': 7,
            '2': 2,
            '3': 3,
            '4': 19,
            '5': 109,
            '6': 431,
            '7': 1096,
            '8': 1016,
            '9': 384,
            '10': 389
          },
          score: 7.6
        },
        rank: 579,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/01/88/899_Q3F3X.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/01/88/899_Q3F3X.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/01/88/899_Q3F3X.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/01/88/899_Q3F3X.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/01/88/899_Q3F3X.jpg'
        },
        collection: { doing: 2255 }
      },
      {
        id: 240757,
        url: 'http://bgm.tv/subject/240757',
        type: 2,
        name: "W'z《ウィズ》",
        name_cn: "W'Z",
        summary: '',
        air_date: '2019-01-05',
        air_weekday: 6,
        rating: {
          total: 52,
          count: {
            '1': 2,
            '2': 4,
            '3': 3,
            '4': 11,
            '5': 4,
            '6': 15,
            '7': 5,
            '8': 7,
            '9': 1,
            '10': 0
          },
          score: 5.3
        },
        rank: 4314,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/94/d0/240757_3vU3I.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/94/d0/240757_3vU3I.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/94/d0/240757_3vU3I.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/94/d0/240757_3vU3I.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/94/d0/240757_3vU3I.jpg'
        },
        collection: { doing: 128 }
      },
      {
        id: 248175,
        url: 'http://bgm.tv/subject/248175',
        type: 2,
        name: 'かぐや様は告らせたい～天才たちの恋愛頭脳戦～',
        name_cn: '辉夜大小姐想让我告白～天才们的恋爱头脑战～',
        summary: '',
        air_date: '2019-01-12',
        air_weekday: 6,
        rating: {
          total: 1187,
          count: {
            '1': 4,
            '2': 1,
            '3': 1,
            '4': 6,
            '5': 17,
            '6': 89,
            '7': 282,
            '8': 502,
            '9': 200,
            '10': 85
          },
          score: 7.8
        },
        rank: 367,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/2a/f7/248175_sZKzd.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/2a/f7/248175_sZKzd.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/2a/f7/248175_sZKzd.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/2a/f7/248175_sZKzd.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/2a/f7/248175_sZKzd.jpg'
        },
        collection: { doing: 2966 }
      },
      {
        id: 251009,
        url: 'http://bgm.tv/subject/251009',
        type: 2,
        name: '不機嫌なモノノケ庵 續',
        name_cn: '忧郁的物怪庵 续',
        summary: '',
        air_date: '2019-01-05',
        air_weekday: 6,
        rating: {
          total: 18,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 1,
            '5': 2,
            '6': 1,
            '7': 14,
            '8': 0,
            '9': 0,
            '10': 0
          },
          score: 6.6
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/28/ce/251009_II2b0.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/28/ce/251009_II2b0.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/28/ce/251009_II2b0.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/28/ce/251009_II2b0.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/28/ce/251009_II2b0.jpg'
        },
        collection: { doing: 118 }
      },
      {
        id: 254895,
        url: 'http://bgm.tv/subject/254895',
        type: 2,
        name: 'えんどろ〜！',
        name_cn: 'Endro~！',
        summary: '',
        air_date: '2019-01-12',
        air_weekday: 6,
        rating: {
          total: 333,
          count: {
            '1': 1,
            '2': 1,
            '3': 0,
            '4': 4,
            '5': 8,
            '6': 32,
            '7': 88,
            '8': 108,
            '9': 72,
            '10': 19
          },
          score: 7.7
        },
        rank: 535,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/02/9d/254895_tq0Vx.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/02/9d/254895_tq0Vx.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/02/9d/254895_tq0Vx.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/02/9d/254895_tq0Vx.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/02/9d/254895_tq0Vx.jpg'
        },
        collection: { doing: 914 }
      },
      {
        id: 257608,
        url: 'http://bgm.tv/subject/257608',
        type: 2,
        name: 'バミューダトライアングル ～カラフル・パストラーレ～',
        name_cn: '百慕大三角～Colorful Pastrale～',
        summary: '',
        air_date: '2019-01-12',
        air_weekday: 6,
        rating: {
          total: 46,
          count: {
            '1': 2,
            '2': 1,
            '3': 0,
            '4': 3,
            '5': 7,
            '6': 1,
            '7': 5,
            '8': 22,
            '9': 5,
            '10': 0
          },
          score: 6.8
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/10/bf/257608_B55V0.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/10/bf/257608_B55V0.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/10/bf/257608_B55V0.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/10/bf/257608_B55V0.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/10/bf/257608_B55V0.jpg'
        },
        collection: { doing: 89 }
      },
      {
        id: 267018,
        url: 'http://bgm.tv/subject/267018',
        type: 2,
        name: 'みにとじ',
        name_cn: '迷你刀使',
        summary: '',
        air_date: '2019-01-05',
        air_weekday: 6,
        rating: {
          total: 59,
          count: {
            '1': 0,
            '2': 1,
            '3': 2,
            '4': 0,
            '5': 3,
            '6': 5,
            '7': 14,
            '8': 27,
            '9': 3,
            '10': 4
          },
          score: 7.4
        },
        rank: 1293,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/87/22/267018_FeOZ0.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/87/22/267018_FeOZ0.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/87/22/267018_FeOZ0.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/87/22/267018_FeOZ0.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/87/22/267018_FeOZ0.jpg'
        },
        collection: { doing: 182 }
      },
      {
        id: 271031,
        url: 'http://bgm.tv/subject/271031',
        type: 2,
        name: '巨兵长城传',
        name_cn: '',
        summary: '',
        air_date: '2019-01-19',
        air_weekday: 6,
        rating: {
          total: 1,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 1,
            '8': 0,
            '9': 0,
            '10': 0
          },
          score: 7
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/a2/e9/271031_Wc2mo.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/a2/e9/271031_Wc2mo.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/a2/e9/271031_Wc2mo.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/a2/e9/271031_Wc2mo.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/a2/e9/271031_Wc2mo.jpg'
        },
        collection: { doing: 3 }
      },
      {
        id: 272905,
        url: 'http://bgm.tv/subject/272905',
        type: 2,
        name: 'gen:LOCK',
        name_cn: '',
        summary: '',
        air_date: '2019-01-26',
        air_weekday: 6,
        rating: {
          total: 5,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 2,
            '8': 3,
            '9': 0,
            '10': 0
          },
          score: 7.6
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/a7/5d/272905_7MSsw.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/a7/5d/272905_7MSsw.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/a7/5d/272905_7MSsw.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/a7/5d/272905_7MSsw.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/a7/5d/272905_7MSsw.jpg'
        },
        collection: { doing: 29 }
      }
    ]
  },
  {
    weekday: { en: 'Sun', cn: '星期日', ja: '日耀日', id: 7 },
    items: [
      {
        id: 975,
        url: 'http://bgm.tv/subject/975',
        type: 2,
        name: 'ONE PIECE',
        name_cn: '海贼王',
        summary: '',
        air_date: '1999-10-20',
        air_weekday: 7,
        rating: {
          total: 5423,
          count: {
            '1': 60,
            '2': 24,
            '3': 12,
            '4': 34,
            '5': 125,
            '6': 267,
            '7': 637,
            '8': 1136,
            '9': 1162,
            '10': 1966
          },
          score: 8.5
        },
        rank: 32,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/92/97/975_YKuWd.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/92/97/975_YKuWd.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/92/97/975_YKuWd.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/92/97/975_YKuWd.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/92/97/975_YKuWd.jpg'
        },
        collection: { doing: 4413 }
      },
      {
        id: 132220,
        url: 'http://bgm.tv/subject/132220',
        type: 2,
        name: 'ドラゴンボール超',
        name_cn: '龙珠超',
        summary: '',
        air_date: '2015-07-05',
        air_weekday: 7,
        rating: {
          total: 521,
          count: {
            '1': 7,
            '2': 4,
            '3': 11,
            '4': 29,
            '5': 39,
            '6': 130,
            '7': 134,
            '8': 87,
            '9': 28,
            '10': 52
          },
          score: 6.8
        },
        rank: 2605,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/0d/a2/132220_E3vck.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/0d/a2/132220_E3vck.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/0d/a2/132220_E3vck.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/0d/a2/132220_E3vck.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/0d/a2/132220_E3vck.jpg'
        },
        collection: { doing: 375 }
      },
      {
        id: 145354,
        url: 'http://bgm.tv/subject/145354',
        type: 2,
        name: 'マナリアフレンズ',
        name_cn: '玛娜利亚魔法学院',
        summary: '',
        air_date: '2019-01-20',
        air_weekday: 7,
        rating: {
          total: 406,
          count: {
            '1': 7,
            '2': 1,
            '3': 1,
            '4': 3,
            '5': 11,
            '6': 29,
            '7': 83,
            '8': 96,
            '9': 137,
            '10': 38
          },
          score: 7.9
        },
        rank: 326,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/b1/66/145354_v6n1Q.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/b1/66/145354_v6n1Q.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/b1/66/145354_v6n1Q.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/b1/66/145354_v6n1Q.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/b1/66/145354_v6n1Q.jpg'
        },
        collection: { doing: 956 }
      },
      {
        id: 185792,
        url: 'http://bgm.tv/subject/185792',
        type: 2,
        name: 'リトルウィッチアカデミア',
        name_cn: '小魔女学园',
        summary: '',
        air_date: '2017-01-08',
        air_weekday: 7,
        rating: {
          total: 3395,
          count: {
            '1': 11,
            '2': 8,
            '3': 7,
            '4': 29,
            '5': 83,
            '6': 329,
            '7': 889,
            '8': 1392,
            '9': 481,
            '10': 166
          },
          score: 7.6
        },
        rank: 578,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/c5/09/185792_YmcaM.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/c5/09/185792_YmcaM.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/c5/09/185792_YmcaM.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/c5/09/185792_YmcaM.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/c5/09/185792_YmcaM.jpg'
        },
        collection: { doing: 768 }
      },
      {
        id: 196053,
        url: 'http://bgm.tv/subject/196053',
        type: 2,
        name: 'キラキラ☆プリキュアアラモード',
        name_cn: 'KiraKira☆光之美少女 A La Mode',
        summary: '',
        air_date: '2017-02-05',
        air_weekday: 7,
        rating: {
          total: 111,
          count: {
            '1': 1,
            '2': 1,
            '3': 1,
            '4': 13,
            '5': 15,
            '6': 35,
            '7': 22,
            '8': 15,
            '9': 3,
            '10': 5
          },
          score: 6.3
        },
        rank: 3486,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/b5/25/196053_1JzOS.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/b5/25/196053_1JzOS.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/b5/25/196053_1JzOS.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/b5/25/196053_1JzOS.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/b5/25/196053_1JzOS.jpg'
        },
        collection: { doing: 99 }
      },
      {
        id: 224641,
        url: 'http://bgm.tv/subject/224641',
        type: 2,
        name: '武动乾坤',
        name_cn: '武动乾坤',
        summary: '',
        air_date: '2019-01-27',
        air_weekday: 7,
        rating: {
          total: 5,
          count: {
            '1': 0,
            '2': 1,
            '3': 0,
            '4': 0,
            '5': 2,
            '6': 2,
            '7': 0,
            '8': 0,
            '9': 0,
            '10': 0
          },
          score: 4.8
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/04/18/224641_ZtSzh.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/04/18/224641_ZtSzh.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/04/18/224641_ZtSzh.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/04/18/224641_ZtSzh.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/04/18/224641_ZtSzh.jpg'
        },
        collection: { doing: 9 }
      },
      {
        id: 247417,
        url: 'http://bgm.tv/subject/247417',
        type: 2,
        name: '上野さんは不器用',
        name_cn: '笨拙之极的上野',
        summary: '',
        air_date: '2019-01-06',
        air_weekday: 7,
        rating: {
          total: 380,
          count: {
            '1': 5,
            '2': 3,
            '3': 3,
            '4': 27,
            '5': 45,
            '6': 124,
            '7': 132,
            '8': 28,
            '9': 8,
            '10': 5
          },
          score: 6.2
        },
        rank: 4020,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/1f/3f/247417_O2YP9.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/1f/3f/247417_O2YP9.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/1f/3f/247417_O2YP9.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/1f/3f/247417_O2YP9.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/1f/3f/247417_O2YP9.jpg'
        },
        collection: { doing: 1026 }
      },
      {
        id: 252347,
        url: 'http://bgm.tv/subject/252347',
        type: 2,
        name: 'ピアノの森 第2シリーズ',
        name_cn: '钢琴之森 第二季',
        summary: '',
        air_date: '2019-01-27',
        air_weekday: 7,
        rating: {
          total: 26,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 3,
            '6': 5,
            '7': 13,
            '8': 5,
            '9': 0,
            '10': 0
          },
          score: 6.8
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/61/9b/252347_sJaz6.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/61/9b/252347_sJaz6.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/61/9b/252347_sJaz6.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/61/9b/252347_sJaz6.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/61/9b/252347_sJaz6.jpg'
        },
        collection: { doing: 156 }
      },
      {
        id: 260467,
        url: 'http://bgm.tv/subject/260467',
        type: 2,
        name: '荒野のコトブキ飛行隊',
        name_cn: '荒野的寿飞行队',
        summary: '',
        air_date: '2019-01-13',
        air_weekday: 7,
        rating: {
          total: 273,
          count: {
            '1': 1,
            '2': 0,
            '3': 2,
            '4': 0,
            '5': 6,
            '6': 20,
            '7': 79,
            '8': 129,
            '9': 25,
            '10': 11
          },
          score: 7.6
        },
        rank: 712,
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/a5/17/260467_0iKll.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/a5/17/260467_0iKll.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/a5/17/260467_0iKll.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/a5/17/260467_0iKll.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/a5/17/260467_0iKll.jpg'
        },
        collection: { doing: 998 }
      },
      {
        id: 267598,
        url: 'http://bgm.tv/subject/267598',
        type: 2,
        name: '如果历史是一群喵 第二季',
        name_cn: '',
        summary: '',
        air_date: '2019-01-13',
        air_weekday: 7,
        rating: {
          total: 2,
          count: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 1,
            '8': 1,
            '9': 0,
            '10': 0
          },
          score: 7.5
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/f2/0a/267598_i0dNf.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/f2/0a/267598_i0dNf.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/f2/0a/267598_i0dNf.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/f2/0a/267598_i0dNf.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/f2/0a/267598_i0dNf.jpg'
        },
        collection: { doing: 10 }
      },
      {
        id: 268653,
        url: 'http://bgm.tv/subject/268653',
        type: 2,
        name: 'パパだって、したい',
        name_cn: '就算是爸爸、也想做',
        summary: '',
        air_date: '2019-01-06',
        air_weekday: 7,
        rating: {
          total: 23,
          count: {
            '1': 2,
            '2': 0,
            '3': 2,
            '4': 4,
            '5': 2,
            '6': 8,
            '7': 2,
            '8': 1,
            '9': 1,
            '10': 1
          },
          score: 5.3
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/9f/0b/268653_dyyiK.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/9f/0b/268653_dyyiK.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/9f/0b/268653_dyyiK.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/9f/0b/268653_dyyiK.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/9f/0b/268653_dyyiK.jpg'
        },
        collection: { doing: 61 }
      },
      {
        id: 272771,
        url: 'http://bgm.tv/subject/272771',
        type: 2,
        name: '三只松鼠之松鼠小镇',
        name_cn: '三只松鼠之松鼠小镇',
        summary: '',
        air_date: '2019-01-13',
        air_weekday: 7,
        rating: {
          total: 2,
          count: {
            '1': 1,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 0,
            '8': 0,
            '9': 0,
            '10': 1
          },
          score: 5.5
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/20/40/272771_T9F1f.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/20/40/272771_T9F1f.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/20/40/272771_T9F1f.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/20/40/272771_T9F1f.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/20/40/272771_T9F1f.jpg'
        }
      },
      {
        id: 273458,
        url: 'http://bgm.tv/subject/273458',
        type: 2,
        name: '喜羊羊与灰太狼之羊村守护者',
        name_cn: '喜羊羊与灰太狼之羊村守护者',
        summary: '',
        air_date: '2019-01-18',
        air_weekday: 7,
        rating: {
          total: 4,
          count: {
            '1': 1,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 1,
            '8': 0,
            '9': 0,
            '10': 2
          },
          score: 7
        },
        images: {
          large: 'http://lain.bgm.tv/pic/cover/l/a8/9f/273458_3bMEh.jpg',
          common: 'http://lain.bgm.tv/pic/cover/c/a8/9f/273458_3bMEh.jpg',
          medium: 'http://lain.bgm.tv/pic/cover/m/a8/9f/273458_3bMEh.jpg',
          small: 'http://lain.bgm.tv/pic/cover/s/a8/9f/273458_3bMEh.jpg',
          grid: 'http://lain.bgm.tv/pic/cover/g/a8/9f/273458_3bMEh.jpg'
        }
      }
    ]
  }
]

// /约定的
export const DATA_SEARCH = {
  results: 1000,
  list: [
    {
      id: 63524,
      url: 'http://bgm.tv/subject/63524',
      type: 1,
      name: '最後の約束の物語 公式設定資料集',
      name_cn: '最后的约定的故事 公式设定资料集',
      summary: '',
      air_date: '',
      air_weekday: 0,
      images: {
        large: 'http://lain.bgm.tv/pic/cover/l/9d/6d/63524_cLZ6W.jpg',
        common: 'http://lain.bgm.tv/pic/cover/c/9d/6d/63524_cLZ6W.jpg',
        medium: 'http://lain.bgm.tv/pic/cover/m/9d/6d/63524_cLZ6W.jpg',
        small: 'http://lain.bgm.tv/pic/cover/s/9d/6d/63524_cLZ6W.jpg',
        grid: 'http://lain.bgm.tv/pic/cover/g/9d/6d/63524_cLZ6W.jpg'
      }
    },
    {
      id: 198169,
      url: 'http://bgm.tv/subject/198169',
      type: 4,
      name: '約束された花嫁にキスを',
      name_cn: '约定的花嫁之吻',
      summary: '',
      air_date: '',
      air_weekday: 0,
      images: {
        large: 'http://lain.bgm.tv/pic/cover/l/35/7e/198169_tbz7l.jpg',
        common: 'http://lain.bgm.tv/pic/cover/c/35/7e/198169_tbz7l.jpg',
        medium: 'http://lain.bgm.tv/pic/cover/m/35/7e/198169_tbz7l.jpg',
        small: 'http://lain.bgm.tv/pic/cover/s/35/7e/198169_tbz7l.jpg',
        grid: 'http://lain.bgm.tv/pic/cover/g/35/7e/198169_tbz7l.jpg'
      }
    },
    {
      id: 243916,
      url: 'http://bgm.tv/subject/243916',
      type: 2,
      name: '約束のネバーランド',
      name_cn: '约定的梦幻岛',
      summary: '',
      air_date: '',
      air_weekday: 0,
      images: {
        large: 'http://lain.bgm.tv/pic/cover/l/ff/49/243916_XXJsd.jpg',
        common: 'http://lain.bgm.tv/pic/cover/c/ff/49/243916_XXJsd.jpg',
        medium: 'http://lain.bgm.tv/pic/cover/m/ff/49/243916_XXJsd.jpg',
        small: 'http://lain.bgm.tv/pic/cover/s/ff/49/243916_XXJsd.jpg',
        grid: 'http://lain.bgm.tv/pic/cover/g/ff/49/243916_XXJsd.jpg'
      }
    },
    {
      id: 188254,
      url: 'http://bgm.tv/subject/188254',
      type: 1,
      name: '約束のネバーランド',
      name_cn: '约定的梦幻岛',
      summary: '',
      air_date: '',
      air_weekday: 0,
      images: {
        large: 'http://lain.bgm.tv/pic/cover/l/cb/00/188254_jRq73.jpg',
        common: 'http://lain.bgm.tv/pic/cover/c/cb/00/188254_jRq73.jpg',
        medium: 'http://lain.bgm.tv/pic/cover/m/cb/00/188254_jRq73.jpg',
        small: 'http://lain.bgm.tv/pic/cover/s/cb/00/188254_jRq73.jpg',
        grid: 'http://lain.bgm.tv/pic/cover/g/cb/00/188254_jRq73.jpg'
      }
    },
    {
      id: 273842,
      url: 'http://bgm.tv/subject/273842',
      type: 6,
      name: '約束のステージ　～時を駆けるふたりの歌～',
      name_cn: '约定的舞台～两人穿越时空的歌～',
      summary: '',
      air_date: '',
      air_weekday: 0,
      images: {
        large: 'http://lain.bgm.tv/pic/cover/l/d8/3d/273842_qxFpU.jpg',
        common: 'http://lain.bgm.tv/pic/cover/c/d8/3d/273842_qxFpU.jpg',
        medium: 'http://lain.bgm.tv/pic/cover/m/d8/3d/273842_qxFpU.jpg',
        small: 'http://lain.bgm.tv/pic/cover/s/d8/3d/273842_qxFpU.jpg',
        grid: 'http://lain.bgm.tv/pic/cover/g/d8/3d/273842_qxFpU.jpg'
      }
    },
    {
      id: 29,
      url: 'http://bgm.tv/subject/29',
      type: 1,
      name: '雲のむこう、約束の場所',
      name_cn: '云之彼端，约定的地方',
      summary: '',
      air_date: '',
      air_weekday: 0,
      images: {
        large: 'http://lain.bgm.tv/pic/cover/l/44/13/11408_jp.jpg',
        common: 'http://lain.bgm.tv/pic/cover/c/44/13/11408_jp.jpg',
        medium: 'http://lain.bgm.tv/pic/cover/m/44/13/11408_jp.jpg',
        small: 'http://lain.bgm.tv/pic/cover/s/44/13/11408_jp.jpg',
        grid: 'http://lain.bgm.tv/pic/cover/g/44/13/11408_jp.jpg'
      }
    },
    {
      id: 1707,
      url: 'http://bgm.tv/subject/1707',
      type: 2,
      name: '雲のむこう、約束の場所',
      name_cn: '云之彼端，约定的地方',
      summary: '',
      air_date: '',
      air_weekday: 0,
      images: {
        large: 'http://lain.bgm.tv/pic/cover/l/02/f0/1707_8HGku.jpg',
        common: 'http://lain.bgm.tv/pic/cover/c/02/f0/1707_8HGku.jpg',
        medium: 'http://lain.bgm.tv/pic/cover/m/02/f0/1707_8HGku.jpg',
        small: 'http://lain.bgm.tv/pic/cover/s/02/f0/1707_8HGku.jpg',
        grid: 'http://lain.bgm.tv/pic/cover/g/02/f0/1707_8HGku.jpg'
      }
    },
    {
      id: 190361,
      url: 'http://bgm.tv/subject/190361',
      type: 1,
      name: '銀河機攻隊マジェスティックプリンス ~はじまりの少女、約束の螺旋',
      name_cn: '银河机攻队Majestic Prince 起始的少女、约定的螺旋',
      summary: '',
      air_date: '',
      air_weekday: 0,
      images: {
        large: 'http://lain.bgm.tv/pic/cover/l/f8/ae/190361_21345.jpg',
        common: 'http://lain.bgm.tv/pic/cover/c/f8/ae/190361_21345.jpg',
        medium: 'http://lain.bgm.tv/pic/cover/m/f8/ae/190361_21345.jpg',
        small: 'http://lain.bgm.tv/pic/cover/s/f8/ae/190361_21345.jpg',
        grid: 'http://lain.bgm.tv/pic/cover/g/f8/ae/190361_21345.jpg'
      }
    }
  ]
}

// /217660
export const DATA_COLLECTION = {
  status: { id: 3, type: 'do', name: '在看' },
  rating: 8,
  comment: '',
  private: 0,
  tag: ['2019年1月', '异世界', '轻小说改'],
  ep_status: 7,
  lasttouch: 1550908098,
  user: {
    id: 456208,
    url: 'http://bgm.tv/user/456208',
    username: '456208',
    nickname: 'chen4027',
    avatar: {
      large: 'http://lain.bgm.tv/pic/user/l/000/45/62/456208.jpg?r=1548574892',
      medium: 'http://lain.bgm.tv/pic/user/m/000/45/62/456208.jpg?r=1548574892',
      small: 'http://lain.bgm.tv/pic/user/s/000/45/62/456208.jpg?r=1548574892'
    },
    sign: '',
    usergroup: 10
  }
}

/* ==================== 小圣杯 ==================== */
/**
 * 最高市值
 * https://www.tinygrail.com/api/chara/mvc/1/20
 * GET
 */
export const DATA_TINYGRAIL_MVC = {
  State: 0,
  Value: [
    {
      Change: 422,
      Id: 29282,
      Name: '黄前久美子',
      Icon: '//lain.bgm.tv/pic/crt/g/48/cc/29282_crt_eiitQ.jpg',
      Total: 39967,
      Current: 390.0,
      MarketValue: 15587130.0,
      Fluctuation: 0.018702329955072681,
      Asks: 569,
      Bids: 12275,
      LastOrder: '2019-08-24T22:07:35.8387832+08:00',
      LastDeal: '2019-08-24T20:28:44.6850796+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 2210,
      Id: 46582,
      Name: '相麻堇',
      Icon: '//lain.bgm.tv/pic/crt/g/1f/be/46582_crt_cvos0.jpg',
      Total: 24965,
      Current: 497.0,
      MarketValue: 12407605.0,
      Fluctuation: 0.0,
      Asks: 338,
      Bids: 30944,
      LastOrder: '2019-08-24T21:14:07.1848964+08:00',
      LastDeal: '2019-08-24T19:50:06.4224621+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 20,
      Id: 711,
      Name: '羽川翼',
      Icon: '//lain.bgm.tv/pic/crt/g/8e/a6/711_crt_xH4rZ.jpg',
      Total: 24986,
      Current: 400.0,
      MarketValue: 9994400.0,
      Fluctuation: 0.0,
      Asks: 15,
      Bids: 402362,
      LastOrder: '2019-08-24T21:00:01.6082596+08:00',
      LastDeal: '2019-08-24T21:00:01.6082563+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 1,
      Id: 23648,
      Name: '香风智乃',
      Icon: '//lain.bgm.tv/pic/crt/g/d4/54/23648_crt_Ljp4Q.jpg',
      Total: 17482,
      Current: 510.0,
      MarketValue: 8915820.0,
      Fluctuation: 0.0,
      Asks: 2072,
      Bids: 1181,
      LastOrder: '2019-08-24T10:45:05',
      LastDeal: '2019-08-24T10:45:05',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 225,
      Id: 19041,
      Name: '由比滨结衣',
      Icon: '//lain.bgm.tv/pic/crt/g/f3/90/19041_crt_63Cjz.jpg',
      Total: 17490,
      Current: 400.0,
      MarketValue: 6996000.0,
      Fluctuation: 0.0,
      Asks: 54,
      Bids: 1632,
      LastOrder: '2019-08-24T18:37:42.4266987+08:00',
      LastDeal: '2019-08-24T18:37:42.4266792+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 20,
      Id: 10440,
      Name: '晓美焰',
      Icon: '//lain.bgm.tv/pic/crt/g/b6/ba/10440_crt_HZ93x.jpg',
      Total: 32461,
      Current: 199.0,
      MarketValue: 6459739.0,
      Fluctuation: 0.0,
      Asks: 15241,
      Bids: 714,
      LastOrder: '2019-08-24T19:36:22.9434971+08:00',
      LastDeal: '2019-08-24T19:36:22.9434934+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 92,
      Id: 1211,
      Name: '忍野忍',
      Icon: '//lain.bgm.tv/pic/crt/g/ce/7c/1211_crt_c6Kez.jpg',
      Total: 32459,
      Current: 189.0,
      MarketValue: 6134751.0,
      Fluctuation: -0.050251256281407038,
      Asks: 580,
      Bids: 303,
      LastOrder: '2019-08-24T18:22:07.4568989+08:00',
      LastDeal: '2019-08-24T16:07:07',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 75,
      Id: 24094,
      Name: '加藤惠',
      Icon: '//lain.bgm.tv/pic/crt/g/d3/57/24094_crt_Kq81M.jpg',
      Total: 32425,
      Current: 175.0,
      MarketValue: 5674375.0,
      Fluctuation: 0.10759493670886076,
      Asks: 1062,
      Bids: 304,
      LastOrder: '2019-08-24T21:33:59.7482344+08:00',
      LastDeal: '2019-08-24T21:33:59.7482306+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 1329,
      Id: 304,
      Name: '惣流·明日香·兰格雷',
      Icon: '//lain.bgm.tv/pic/crt/g/d5/f7/304_crt_q6Bs8.jpg',
      Total: 47419,
      Current: 100.0,
      MarketValue: 4741900.0,
      Fluctuation: -0.11504424778761062,
      Asks: 1272,
      Bids: 2442,
      LastOrder: '2019-08-24T22:18:50.003373+08:00',
      LastDeal: '2019-08-24T22:18:50.0033703+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 14,
      Id: 303,
      Name: '绫波丽',
      Icon: '//lain.bgm.tv/pic/crt/g/c6/36/303_crt_M23Zu.jpg',
      Total: 17483,
      Current: 256.0,
      MarketValue: 4475648.0,
      Fluctuation: -0.015384615384615385,
      Asks: 248,
      Bids: 7065,
      LastOrder: '2019-08-24T19:25:57.8859177+08:00',
      LastDeal: '2019-08-24T19:25:57.8859146+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 28,
      Id: 1667,
      Name: '柊镜',
      Icon: '//lain.bgm.tv/pic/crt/g/31/62/1667_crt_V9hI9.jpg',
      Total: 9991,
      Current: 400.0,
      MarketValue: 3996400.0,
      Fluctuation: 0.0050251256281407036,
      Asks: 284,
      Bids: 318,
      LastOrder: '2019-08-24T21:12:24.1599601+08:00',
      LastDeal: '2019-08-24T11:56:53',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 53,
      Id: 706,
      Name: '战场原黑仪',
      Icon: '//lain.bgm.tv/pic/crt/g/7d/34/706_crt_WCNUQ.jpg',
      Total: 24967,
      Current: 160.0,
      MarketValue: 3994720.0,
      Fluctuation: 0.0,
      Asks: 730,
      Bids: 1377,
      LastOrder: '2019-08-24T19:44:53.748644+08:00',
      LastDeal: '2019-08-24T17:12:41',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 1584,
      Id: 12393,
      Name: '牧濑红莉栖',
      Icon: '//lain.bgm.tv/pic/crt/g/f7/2a/12393_crt_SS7II.jpg',
      Total: 32475,
      Current: 118.0,
      MarketValue: 3832050.0,
      Fluctuation: 0.082568807339449546,
      Asks: 120,
      Bids: 1323,
      LastOrder: '2019-08-24T22:24:23.1418711+08:00',
      LastDeal: '2019-08-24T22:24:23.1418685+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 20,
      Id: 606,
      Name: '雨宫优子',
      Icon: '//lain.bgm.tv/pic/crt/g/08/34/606_crt_Zsbgu.jpg',
      Total: 24981,
      Current: 150.0,
      MarketValue: 3747150.0,
      Fluctuation: -0.06244140258766178,
      Asks: 7721,
      Bids: 509,
      LastOrder: '2019-08-24T12:28:25',
      LastDeal: '2019-08-24T12:28:25',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 63,
      Id: 10570,
      Name: '两仪式',
      Icon: '//lain.bgm.tv/pic/crt/g/65/4f/10570_crt_pp75y.jpg',
      Total: 17479,
      Current: 214.0,
      MarketValue: 3740506.0,
      Fluctuation: 0.0,
      Asks: 855,
      Bids: 175,
      LastOrder: '2019-08-24T19:01:45.5104901+08:00',
      LastDeal: '2019-08-24T18:56:04.5937608+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 69,
      Id: 26090,
      Name: '一色彩羽',
      Icon: '//lain.bgm.tv/pic/crt/g/83/30/26090_crt_T9Gt1.jpg',
      Total: 17485,
      Current: 200.0,
      MarketValue: 3497000.0,
      Fluctuation: 0.0,
      Asks: 255,
      Bids: 1046,
      LastOrder: '2019-08-24T16:19:37',
      LastDeal: '2019-08-24T16:19:37',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 22,
      Id: 10452,
      Name: '初音未来',
      Icon: '//lain.bgm.tv/pic/crt/g/00/71/10452_crt_jXH73.jpg',
      Total: 17484,
      Current: 200.0,
      MarketValue: 3496800.0,
      Fluctuation: 1.0,
      Asks: 172,
      Bids: 1357,
      LastOrder: '2019-08-24T17:16:30',
      LastDeal: '2019-08-24T11:18:21',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 10,
      Id: 6965,
      Name: '渚薰',
      Icon: '//lain.bgm.tv/pic/crt/g/97/60/6965_crt_w2NTt.jpg',
      Total: 17492,
      Current: 190.0,
      MarketValue: 3323480.0,
      Fluctuation: 0.0,
      Asks: 467,
      Bids: 199,
      LastOrder: '2019-08-24T16:39:30',
      LastDeal: '2019-08-24T16:39:30',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 100,
      Id: 49,
      Name: '长门有希',
      Icon: '//lain.bgm.tv/pic/crt/g/55/c7/49_crt_C9QCP.jpg',
      Total: 32465,
      Current: 100.0,
      MarketValue: 3246500.0,
      Fluctuation: 0.42857142857142855,
      Asks: 214,
      Bids: 497,
      LastOrder: '2019-08-24T17:24:08',
      LastDeal: '2019-08-24T16:21:44',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 169,
      Id: 24093,
      Name: '泽村·史宾瑟·英梨梨',
      Icon: '//lain.bgm.tv/pic/crt/g/33/af/24093_crt_3qTD3.jpg',
      Total: 24986,
      Current: 120.0,
      MarketValue: 2998320.0,
      Fluctuation: 0.33333333333333331,
      Asks: 169,
      Bids: 490,
      LastOrder: '2019-08-24T19:27:51.697684+08:00',
      LastDeal: '2019-08-24T19:27:51.6976812+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    }
  ]
}

/**
 * 最大涨幅
 * https://www.tinygrail.com/api/chara/mrc/1/20
 * GET
 */
export const DATA_TINYGRAIL_MRC = {
  State: 0,
  Value: [
    {
      Change: 636,
      Id: 27236,
      Name: '坂木静香',
      Icon: '//lain.bgm.tv/pic/crt/g/fe/ea/27236_crt_wOM3a.jpg',
      Total: 10000,
      Current: 92.0,
      MarketValue: 920000.0,
      Fluctuation: 17.4,
      Asks: 652,
      Bids: 2130,
      LastOrder: '2019-08-24T22:02:33.567879+08:00',
      LastDeal: '2019-08-24T21:57:46.5183139+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 1,
      Id: 293,
      Name: '银',
      Icon: '//lain.bgm.tv/pic/crt/g/30/82/293_crt_uzbcR.jpg',
      Total: 9993,
      Current: 100.0,
      MarketValue: 999300.0,
      Fluctuation: 9.0,
      Asks: 10,
      Bids: 858,
      LastOrder: '2019-08-24T17:43:30.5891732+08:00',
      LastDeal: '2019-08-24T12:00:44',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 200,
      Id: 19545,
      Name: '溶解莉莉丝',
      Icon: '//lain.bgm.tv/pic/crt/g/c5/61/19545_crt_rn4r4.jpg',
      Total: 10000,
      Current: 10.0,
      MarketValue: 100000.0,
      Fluctuation: 9.0,
      Asks: 400,
      Bids: 250,
      LastOrder: '2019-08-24T20:16:26.7044059+08:00',
      LastDeal: '2019-08-24T19:50:23.3735551+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 10438,
      Id: 36455,
      Name: '岛田爱里寿',
      Icon: '//lain.bgm.tv/pic/crt/g/a7/88/36455_crt_Wmtkt.jpg',
      Total: 9988,
      Current: 66.0,
      MarketValue: 659208.0,
      Fluctuation: 5.6,
      Asks: 476,
      Bids: 310,
      LastOrder: '2019-08-24T22:44:28.502725+08:00',
      LastDeal: '2019-08-24T20:54:09.0884916+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 150,
      Id: 17412,
      Name: '西住美穗',
      Icon: '//lain.bgm.tv/pic/crt/g/83/d0/17412_crt_WsLwl.jpg',
      Total: 9990,
      Current: 90.0,
      MarketValue: 899100.0,
      Fluctuation: 5.0,
      Asks: 460,
      Bids: 831,
      LastOrder: '2019-08-24T20:46:22.8176197+08:00',
      LastDeal: '2019-08-24T16:32:23',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 137,
      Id: 69547,
      Name: '林宁宁',
      Icon: '//lain.bgm.tv/pic/crt/g/c2/05/69547_crt_7wPBt.jpg',
      Total: 9986,
      Current: 47.0,
      MarketValue: 469342.0,
      Fluctuation: 4.2222222222222223,
      Asks: 2129,
      Bids: 620,
      LastOrder: '2019-08-24T22:00:52.8910448+08:00',
      LastDeal: '2019-08-24T22:00:52.8910415+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 1582,
      Id: 37242,
      Name: '宫水三叶',
      Icon: '//lain.bgm.tv/pic/crt/g/5c/26/37242_crt_aaA8q.jpg',
      Total: 9973,
      Current: 80.0,
      MarketValue: 797840.0,
      Fluctuation: 2.075740099961553,
      Asks: 506,
      Bids: 1580,
      LastOrder: '2019-08-24T22:37:28.5103995+08:00',
      LastDeal: '2019-08-24T21:43:03.6664811+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 2411,
      Id: 21368,
      Name: '宫内莲华',
      Icon: '//lain.bgm.tv/pic/crt/g/ce/64/21368_crt_oKN2k.jpg',
      Total: 24990,
      Current: 71.5,
      MarketValue: 1786785.0,
      Fluctuation: 1.9791666666666667,
      Asks: 1254,
      Bids: 2016,
      LastOrder: '2019-08-24T22:01:03.397014+08:00',
      LastDeal: '2019-08-24T21:54:34.000136+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '0001-01-01T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 5038,
      Id: 2765,
      Name: '木之本樱',
      Icon: '//lain.bgm.tv/pic/crt/g/f1/9b/2765_crt_Vrv50.jpg',
      Total: 9991,
      Current: 169.0,
      MarketValue: 1688479.0,
      Fluctuation: 1.7704918032786885,
      Asks: 158,
      Bids: 620,
      LastOrder: '2019-08-24T20:38:43.6400319+08:00',
      LastDeal: '2019-08-24T20:38:43.6400291+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 44,
      Id: 273,
      Name: '阿尔托莉雅·潘德拉贡',
      Icon: '//lain.bgm.tv/pic/crt/g/7d/58/273_crt_IMrqS.jpg',
      Total: 9990,
      Current: 120.0,
      MarketValue: 1198800.0,
      Fluctuation: 1.4,
      Asks: 210,
      Bids: 1170,
      LastOrder: '2019-08-24T21:08:38.674884+08:00',
      LastDeal: '2019-08-24T21:06:21.7217142+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 1,
      Id: 86,
      Name: '爱德华·艾尔利克',
      Icon: '//lain.bgm.tv/pic/crt/g/7e/50/86_crt_op5nr.jpg',
      Total: 9980,
      Current: 100.0,
      MarketValue: 998000.0,
      Fluctuation: 1.3809523809523809,
      Asks: 231,
      Bids: 410,
      LastOrder: '2019-08-24T15:10:52',
      LastDeal: '2019-08-24T15:10:52',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 3,
      Id: 10753,
      Name: '星井美希',
      Icon: '//lain.bgm.tv/pic/crt/g/82/db/10753_crt_V9wc8.jpg',
      Total: 9995,
      Current: 80.0,
      MarketValue: 799600.0,
      Fluctuation: 1.2222222222222223,
      Asks: 175,
      Bids: 340,
      LastOrder: '2019-08-24T15:19:20',
      LastDeal: '2019-08-24T01:52:56',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 22,
      Id: 10452,
      Name: '初音未来',
      Icon: '//lain.bgm.tv/pic/crt/g/00/71/10452_crt_jXH73.jpg',
      Total: 17484,
      Current: 200.0,
      MarketValue: 3496800.0,
      Fluctuation: 1.0,
      Asks: 172,
      Bids: 1357,
      LastOrder: '2019-08-24T17:16:30',
      LastDeal: '2019-08-24T11:18:21',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 485,
      Id: 23651,
      Name: '桐间纱路',
      Icon: '//lain.bgm.tv/pic/crt/g/ed/cc/23651_crt_4SU00.jpg',
      Total: 9998,
      Current: 50.0,
      MarketValue: 499900.0,
      Fluctuation: 1.0,
      Asks: 365,
      Bids: 1400,
      LastOrder: '2019-08-24T20:56:12.5397428+08:00',
      LastDeal: '2019-08-24T18:30:06.7428901+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 10576,
      Id: 17960,
      Name: '北白川玉子',
      Icon: '//lain.bgm.tv/pic/crt/g/ed/08/17960_crt_FQhbh.jpg',
      Total: 9984,
      Current: 110.0,
      MarketValue: 1098240.0,
      Fluctuation: 0.9642857142857143,
      Asks: 919,
      Bids: 300,
      LastOrder: '2019-08-24T22:36:12.7129648+08:00',
      LastDeal: '2019-08-24T19:26:43.7886319+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 142,
      Id: 64640,
      Name: '宝多六花',
      Icon: '//lain.bgm.tv/pic/crt/g/dd/be/64640_crt_R6tf5.jpg',
      Total: 17487,
      Current: 120.0,
      MarketValue: 2098440.0,
      Fluctuation: 0.93548387096774188,
      Asks: 210,
      Bids: 110,
      LastOrder: '2019-08-24T16:21:15',
      LastDeal: '2019-08-24T16:21:15',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 153,
      Id: 27371,
      Name: '绫地宁宁',
      Icon: '//lain.bgm.tv/pic/crt/g/4e/eb/27371_crt_X00Xg.jpg',
      Total: 9980,
      Current: 61.42,
      MarketValue: 612971.6,
      Fluctuation: 0.80647058823529416,
      Asks: 230,
      Bids: 400,
      LastOrder: '2019-08-24T16:32:23',
      LastDeal: '2019-08-24T13:00:29',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 788,
      Id: 10546,
      Name: '千叶沙织',
      Icon: '//lain.bgm.tv/pic/crt/g/84/5e/10546_crt_mioE3.jpg',
      Total: 9992,
      Current: 33.0,
      MarketValue: 329736.0,
      Fluctuation: 0.65,
      Asks: 394,
      Bids: 480,
      LastOrder: '2019-08-24T21:33:01.0080136+08:00',
      LastDeal: '2019-08-24T13:29:38',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 455,
      Id: 12234,
      Name: '二阶堂真红',
      Icon: '//lain.bgm.tv/pic/crt/g/52/65/12234_crt_888ZY.jpg',
      Total: 9990,
      Current: 19.9,
      MarketValue: 198801.0,
      Fluctuation: 0.64462809917355368,
      Asks: 851,
      Bids: 700,
      LastOrder: '2019-08-24T20:45:18.7881742+08:00',
      LastDeal: '2019-08-24T17:36:49.1043622+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 21,
      Id: 53208,
      Name: '绊爱',
      Icon: '//lain.bgm.tv/pic/crt/g/f8/6a/53208_crt_47wB0.jpg',
      Total: 9997,
      Current: 79.99,
      MarketValue: 799660.02999999991,
      Fluctuation: 0.59979999999999989,
      Asks: 130,
      Bids: 616,
      LastOrder: '2019-08-24T11:41:00',
      LastDeal: '2019-08-24T11:41:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    }
  ]
}

/**
 * 最大跌幅
 * https://www.tinygrail.com/api/chara/mfc/1/20
 * GET
 */
export const DATA_TINYGRAIL_MFC = {
  State: 0,
  Value: [
    {
      Change: 11204,
      Id: 32369,
      Name: '春风DoReMi',
      Icon: '//lain.bgm.tv/pic/crt/g/8d/40/32369_crt_NwWKm.jpg',
      Total: 9990,
      Current: 22.0,
      MarketValue: 219780.0,
      Fluctuation: -0.99559911982396476,
      Asks: 0,
      Bids: 275,
      LastOrder: '2019-08-24T20:52:52.5950404+08:00',
      LastDeal: '2019-08-24T16:29:32',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 12,
      Id: 53,
      Name: '神尾观铃',
      Icon: '//lain.bgm.tv/pic/crt/g/77/89/53_crt_x0x0c.jpg',
      Total: 9994,
      Current: 130.0,
      MarketValue: 1299220.0,
      Fluctuation: -0.9517266988488674,
      Asks: 99,
      Bids: 718,
      LastOrder: '2019-08-24T17:01:41',
      LastDeal: '2019-08-24T17:01:41',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 49,
      Id: 16687,
      Name: '',
      Icon: '//lain.bgm.tv/pic/crt/g/59/7f/16687_crt_399hR.jpg',
      Total: 9994,
      Current: 35.0,
      MarketValue: 349790.0,
      Fluctuation: -0.825,
      Asks: 10,
      Bids: 407,
      LastOrder: '2019-08-24T12:55:04',
      LastDeal: '2019-08-24T12:54:40',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 16,
      Id: 10586,
      Name: 'Bangumi娘',
      Icon: '//lain.bgm.tv/pic/crt/g/3f/34/10586_crt_NL3Z3.jpg',
      Total: 17490,
      Current: 35.0,
      MarketValue: 612150.0,
      Fluctuation: -0.70338983050847459,
      Asks: 414,
      Bids: 446,
      LastOrder: '2019-08-24T19:31:42.2156135+08:00',
      LastDeal: '2019-08-24T19:31:42.2156102+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 79,
      Id: 56775,
      Name: '各务原抚子',
      Icon: '//lain.bgm.tv/pic/crt/g/a6/59/56775_crt_DSljQ.jpg',
      Total: 9982,
      Current: 50.0,
      MarketValue: 499100.0,
      Fluctuation: -0.66666666666666663,
      Asks: 70,
      Bids: 366,
      LastOrder: '2019-08-24T19:47:57.2855592+08:00',
      LastDeal: '2019-08-24T19:20:24.1851051+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 1220,
      Id: 21870,
      Name: '雪平富良野',
      Icon: '//lain.bgm.tv/pic/crt/g/2c/20/21870_crt_311mS.jpg',
      Total: 9997,
      Current: 30.0,
      MarketValue: 299910.0,
      Fluctuation: -0.625,
      Asks: 0,
      Bids: 210,
      LastOrder: '2019-08-24T20:49:18.4497402+08:00',
      LastDeal: '2019-08-24T15:42:57',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 51,
      Id: 40739,
      Name: '铠塚霙',
      Icon: '//lain.bgm.tv/pic/crt/g/6e/3d/40739_crt_FYd0D.jpg',
      Total: 9983,
      Current: 121.0,
      MarketValue: 1207943.0,
      Fluctuation: -0.59666666666666668,
      Asks: 101,
      Bids: 470,
      LastOrder: '2019-08-24T11:23:42',
      LastDeal: '2019-08-24T11:23:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 68,
      Id: 609,
      Name: '新藤千寻',
      Icon: '//lain.bgm.tv/pic/crt/g/ab/3f/609_crt_222BX.jpg',
      Total: 9995,
      Current: 12.0,
      MarketValue: 119940.0,
      Fluctuation: -0.52,
      Asks: 578,
      Bids: 210,
      LastOrder: '2019-08-24T20:49:54.9022861+08:00',
      LastDeal: '2019-08-24T08:51:39',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 116,
      Id: 50,
      Name: '朝比奈实玖瑠',
      Icon: '//lain.bgm.tv/pic/crt/g/b9/3b/50_crt_x7Tpt.jpg',
      Total: 9995,
      Current: 20.0,
      MarketValue: 199900.0,
      Fluctuation: -0.45945945945945948,
      Asks: 1190,
      Bids: 684,
      LastOrder: '2019-08-24T20:05:59.7265495+08:00',
      LastDeal: '2019-08-24T20:05:59.7265469+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 329,
      Id: 70609,
      Name: '吉田优子',
      Icon: '//lain.bgm.tv/pic/crt/g/48/cf/70609_crt_0DX4z.jpg',
      Total: 9996,
      Current: 120.5,
      MarketValue: 1204518.0,
      Fluctuation: -0.45227272727272727,
      Asks: 97,
      Bids: 900,
      LastOrder: '2019-08-24T20:50:36.9185707+08:00',
      LastDeal: '2019-08-24T20:50:36.9185677+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 60,
      Id: 1976,
      Name: '赫萝',
      Icon: '//lain.bgm.tv/pic/crt/g/22/bf/1976_crt_j8bq9.jpg',
      Total: 17491,
      Current: 52.0,
      MarketValue: 909532.0,
      Fluctuation: -0.44680851063829785,
      Asks: 550,
      Bids: 300,
      LastOrder: '2019-08-24T22:30:41.7544638+08:00',
      LastDeal: '2019-08-24T22:22:08.3970672+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 50,
      Id: 68105,
      Name: '犬山玉姬',
      Icon: '//lain.bgm.tv/pic/crt/g/a8/7a/68105_crt_A55WL.jpg',
      Total: 9988,
      Current: 40.0,
      MarketValue: 399520.0,
      Fluctuation: -0.39393939393939392,
      Asks: 220,
      Bids: 220,
      LastOrder: '2019-08-24T19:45:42.2383735+08:00',
      LastDeal: '2019-08-24T19:45:42.2383703+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 74,
      Id: 11599,
      Name: '爱丽丝·凯洛尔',
      Icon: '//lain.bgm.tv/pic/crt/g/18/d5/11599_crt_ORZ1k.jpg',
      Total: 9983,
      Current: 28.0,
      MarketValue: 279524.0,
      Fluctuation: -0.36363636363636365,
      Asks: 362,
      Bids: 300,
      LastOrder: '2019-08-24T22:24:16.9664866+08:00',
      LastDeal: '2019-08-24T20:02:58.6590055+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 1941,
      Id: 35650,
      Name: '川本日向',
      Icon: '//lain.bgm.tv/pic/crt/g/7a/d9/35650_crt_NK2ZZ.jpg',
      Total: 9990,
      Current: 66.0,
      MarketValue: 659340.0,
      Fluctuation: -0.34,
      Asks: 94,
      Bids: 252,
      LastOrder: '2019-08-24T20:56:53.4267818+08:00',
      LastDeal: '2019-08-24T20:56:53.4267768+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 62,
      Id: 10716,
      Name: '橘希实香',
      Icon: '//lain.bgm.tv/pic/crt/g/21/74/10716_crt_qcsdd.jpg',
      Total: 9991,
      Current: 40.0,
      MarketValue: 399640.0,
      Fluctuation: -0.33333333333333331,
      Asks: 114,
      Bids: 412,
      LastOrder: '2019-08-24T19:36:18.7565274+08:00',
      LastDeal: '2019-08-24T19:36:18.7565247+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 11,
      Id: 66730,
      Name: '姬坂乃爱',
      Icon: '//lain.bgm.tv/pic/crt/g/8d/9e/66730_crt_o4aoy.jpg',
      Total: 9992,
      Current: 34.0,
      MarketValue: 339728.0,
      Fluctuation: -0.30598081241069608,
      Asks: 333,
      Bids: 750,
      LastOrder: '2019-08-24T21:41:01.4721964+08:00',
      LastDeal: '2019-08-24T06:51:41',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 81,
      Id: 3862,
      Name: '苇月伊织',
      Icon: '//lain.bgm.tv/pic/crt/g/53/3f/3862_crt_anidb.jpg',
      Total: 17493,
      Current: 21.0,
      MarketValue: 367353.0,
      Fluctuation: -0.3,
      Asks: 187,
      Bids: 312,
      LastOrder: '2019-08-24T10:09:59',
      LastDeal: '2019-08-24T10:09:59',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 353,
      Id: 4451,
      Name: '宫永咲',
      Icon: '//lain.bgm.tv/pic/crt/g/76/e6/4451_crt_JWWtL.jpg',
      Total: 9981,
      Current: 19.0,
      MarketValue: 189639.0,
      Fluctuation: -0.29603556872915893,
      Asks: 1004,
      Bids: 200,
      LastOrder: '2019-08-24T20:56:59.6531669+08:00',
      LastDeal: '2019-08-24T20:56:39.6092921+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 112,
      Id: 62524,
      Name: '菅原新菜',
      Icon: '//lain.bgm.tv/pic/crt/g/61/c7/62524_crt_o4n88.jpg',
      Total: 15851,
      Current: 11.0,
      MarketValue: 174361.0,
      Fluctuation: -0.26666666666666666,
      Asks: 1051,
      Bids: 310,
      LastOrder: '2019-08-24T20:44:47.397738+08:00',
      LastDeal: '2019-08-24T09:32:36',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '0001-01-01T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 448,
      Id: 4,
      Name: '古河渚',
      Icon: '//lain.bgm.tv/pic/crt/g/e9/cf/4_crt_f11eW.jpg',
      Total: 17489,
      Current: 150.0,
      MarketValue: 2623350.0,
      Fluctuation: -0.25,
      Asks: 278,
      Bids: 352,
      LastOrder: '2019-08-24T20:10:50.7786397+08:00',
      LastDeal: '2019-08-24T20:10:50.778636+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    }
  ]
}

/**
 * 指定人物的数据
 * https://www.tinygrail.com/api/chara/list
 * POST
 * [25927,35675,29543,3219,17435,70609,71052,68909,21601,15420,10624,16490,32048,70089,70502,55756,5088,14189,358,62524,70506,29743,63250,59999,70654,70653,32369,29282,12065,69818,70505,27371,69747,18636,16934,612,61046,12262,52519,71191,27241,27238,27237,71310,486,17949,26655,69508,49447,39344]
 */
export const DATA_TINYGRAIL_CHARA = {
  State: 0,
  Value: [
    {
      Id: 1266,
      CharacterId: 17435,
      Name: '大吉岭',
      Icon: '//lain.bgm.tv/pic/crt/g/0b/bf/17435_crt_v91Yo.jpg',
      Begin: '2019-08-24T03:02:43',
      End: '2019-08-31T03:02:43',
      Last: '2019-08-24T18:43:13.4214618+08:00',
      Total: 12000.0,
      Users: 3,
      SubjectId: 191302,
      SubjectName: '少女与战车 最终章 第1话',
      AirDate: '2017-12-09T00:00:00',
      Bonus: 0,
      Type: 0,
      State: 0
    },
    {
      Change: 329,
      Id: 70609,
      Name: '吉田优子',
      Icon: '//lain.bgm.tv/pic/crt/g/48/cf/70609_crt_0DX4z.jpg',
      Total: 9996,
      Current: 120.5,
      MarketValue: 1204518.0,
      Fluctuation: -0.45227272727272727,
      Asks: 97,
      Bids: 900,
      LastOrder: '2019-08-24T20:50:36.9185707+08:00',
      LastDeal: '2019-08-24T20:50:36.9185677+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Id: 1085,
      CharacterId: 15420,
      Name: '美利坚合众国',
      Icon: '//lain.bgm.tv/pic/crt/g/99/fd/15420_crt_VeCju.jpg',
      Begin: '2019-08-19T02:46:30',
      End: '2019-08-26T02:46:30',
      Last: '2019-08-24T20:24:42.4876612+08:00',
      Total: 30000.0,
      Users: 2,
      SubjectId: 100443,
      SubjectName: '东京残响',
      AirDate: '2014-07-10T00:00:00',
      Bonus: 0,
      Type: 0,
      State: 0
    },
    {
      Id: 1137,
      CharacterId: 16490,
      Name: '亚丝娜／结城明日奈',
      Icon: '//lain.bgm.tv/pic/crt/g/58/bd/16490_crt_K3ZM3.jpg',
      Begin: '2019-08-19T21:55:51',
      End: '2019-08-26T21:55:51',
      Last: '2019-08-24T20:47:59.3013427+08:00',
      Total: 504001.0,
      Users: 61,
      SubjectId: 225604,
      SubjectName: '刀剑神域 Alicization篇',
      AirDate: '2018-10-06T00:00:00',
      Bonus: 6,
      Type: 1,
      State: 0
    },
    {
      Change: 0,
      Id: 5088,
      Name: '葛城美里',
      Icon: '//lain.bgm.tv/pic/crt/g/04/fc/5088_crt_anidb.jpg',
      Total: 17491,
      Current: 499.99,
      MarketValue: 8745325.09,
      Fluctuation: 0.0,
      Asks: 640,
      Bids: 279,
      LastOrder: '2019-08-24T00:29:15',
      LastDeal: '2019-08-21T16:06:35',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 0,
      Id: 358,
      Name: '神北小毬',
      Icon: '//lain.bgm.tv/pic/crt/g/ac/ef/358_crt_375d8.jpg',
      Total: 9987,
      Current: 30.0,
      MarketValue: 299610.0,
      Fluctuation: 0.0,
      Asks: 8670,
      Bids: 913,
      LastOrder: '2019-08-24T17:47:06.8187108+08:00',
      LastDeal: '2019-08-23T20:53:12',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 112,
      Id: 62524,
      Name: '菅原新菜',
      Icon: '//lain.bgm.tv/pic/crt/g/61/c7/62524_crt_o4n88.jpg',
      Total: 15851,
      Current: 11.0,
      MarketValue: 174361.0,
      Fluctuation: -0.26666666666666666,
      Asks: 1051,
      Bids: 310,
      LastOrder: '2019-08-24T20:44:47.397738+08:00',
      LastDeal: '2019-08-24T09:32:36',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '0001-01-01T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 11204,
      Id: 32369,
      Name: '春风DoReMi',
      Icon: '//lain.bgm.tv/pic/crt/g/8d/40/32369_crt_NwWKm.jpg',
      Total: 9990,
      Current: 22.0,
      MarketValue: 219780.0,
      Fluctuation: -0.99559911982396476,
      Asks: 0,
      Bids: 275,
      LastOrder: '2019-08-24T20:52:52.5950404+08:00',
      LastDeal: '2019-08-24T16:29:32',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 422,
      Id: 29282,
      Name: '黄前久美子',
      Icon: '//lain.bgm.tv/pic/crt/g/48/cc/29282_crt_eiitQ.jpg',
      Total: 39967,
      Current: 390.0,
      MarketValue: 15587130.0,
      Fluctuation: 0.018702329955072681,
      Asks: 569,
      Bids: 12275,
      LastOrder: '2019-08-24T22:07:35.8387832+08:00',
      LastDeal: '2019-08-24T20:28:44.6850796+08:00',
      SubjectId: 0,
      SubjectName: '',
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Id: 1055,
      CharacterId: 70505,
      Name: '百井咲久',
      Icon: '//lain.bgm.tv/pic/crt/g/ef/29/70505_crt_z8Ydd.jpg',
      Begin: '2019-08-17T23:20:54',
      End: '2019-08-24T23:20:54',
      Last: '2019-08-24T15:47:37',
      Total: 27000.0,
      Users: 8,
      SubjectId: 265708,
      SubjectName: '女高中生的无所事事',
      AirDate: '2019-07-05T00:00:00',
      Bonus: 45,
      Type: 1,
      State: 0
    },
    {
      Change: 153,
      Id: 27371,
      Name: '绫地宁宁',
      Icon: '//lain.bgm.tv/pic/crt/g/4e/eb/27371_crt_X00Xg.jpg',
      Total: 9980,
      Current: 61.42,
      MarketValue: 612971.6,
      Fluctuation: 0.80647058823529416,
      Asks: 230,
      Bids: 400,
      LastOrder: '2019-08-24T16:32:23',
      LastDeal: '2019-08-24T13:00:29',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Id: 1136,
      CharacterId: 16934,
      Name: '常守朱',
      Icon: '//lain.bgm.tv/pic/crt/g/2b/61/16934_crt_511F5.jpg',
      Begin: '2019-08-19T21:37:54',
      End: '2019-08-26T21:37:54',
      Last: '2019-08-24T18:34:21.7084182+08:00',
      Total: 21000.0,
      Users: 3,
      SubjectId: 239924,
      SubjectName: '心理测量者 Sinners of the System Case.2 First Guardian',
      AirDate: '2019-02-15T00:00:00',
      Bonus: 25,
      Type: 1,
      State: 0
    },
    {
      Change: 140,
      Id: 61046,
      Name: 'キャル',
      Icon: '//lain.bgm.tv/pic/crt/g/b0/e0/61046_crt_56gGK.jpg',
      Total: 17466,
      Current: 35.0,
      MarketValue: 611310.0,
      Fluctuation: 0.0,
      Asks: 349,
      Bids: 677,
      LastOrder: '2019-08-24T19:58:21.8316586+08:00',
      LastDeal: '2019-08-24T19:58:21.8316554+08:00',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Change: 2058,
      Id: 27241,
      Name: '矢野艾莉卡',
      Icon: '//lain.bgm.tv/pic/crt/g/9c/e3/27241_crt_vVobn.jpg',
      Total: 9982,
      Current: 39.0,
      MarketValue: 389298.0,
      Fluctuation: -0.13333333333333333,
      Asks: 1127,
      Bids: 610,
      LastOrder: '2019-08-24T18:48:40.2073149+08:00',
      LastDeal: '2019-08-24T14:52:31',
      SubjectId: 0,
      SubjectName: null,
      AirDate: '2018-12-31T00:00:00',
      Bonus: 0,
      Rate: 0.5,
      State: 0,
      Type: 0
    },
    {
      Id: 1161,
      CharacterId: 27238,
      Name: '今井绿',
      Icon: '//lain.bgm.tv/pic/crt/g/b6/32/27238_crt_vP3BS.jpg',
      Begin: '2019-08-20T18:39:49',
      End: '2019-08-27T18:39:49',
      Last: '2019-08-24T22:18:15.4963607+08:00',
      Total: 37545.0,
      Users: 14,
      SubjectId: 110467,
      SubjectName: '白箱',
      AirDate: '2014-10-09T00:00:00',
      Bonus: 0,
      Type: 0,
      State: 0
    },
    {
      Id: 1244,
      CharacterId: 69508,
      Name: '纱仓响',
      Icon: '//lain.bgm.tv/pic/crt/g/11/39/69508_crt_w9ww8.jpg',
      Begin: '2019-08-23T07:12:40',
      End: '2019-08-30T07:12:40',
      Last: '2019-08-24T17:03:19',
      Total: 112002.01,
      Users: 13,
      SubjectId: 271724,
      SubjectName: '肌肉少女：哑铃，能举多少公斤？',
      AirDate: '2019-07-03T00:00:00',
      Bonus: 44,
      Type: 1,
      State: 0
    }
  ]
}
