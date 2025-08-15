/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:09:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-12 06:24:04
 */
import { HOST_AC_SEARCH } from '@constants'

export const COMPONENT = 'OriginSetting'

export const TYPES_DS = [
  {
    type: 'anime',
    name: '动画',
    test: {
      CN: '电锯人',
      JP: 'チェンソーマン',
      ID: 321885
    }
  },
  {
    type: 'hanime',
    name: 'NSFW',
    test: {
      CN: '缘之空',
      JP: 'ヨスガノソラ',
      ID: 7157
    }
  },
  {
    type: 'manga',
    name: '漫画',
    test: {
      CN: '蓦然回首',
      JP: 'ルックバック',
      ID: 342254
    }
  },
  {
    type: 'wenku',
    name: '小说',
    test: {
      CN: '来自新世界',
      JP: '新世界より',
      ID: 37782
    }
  },
  {
    type: 'music',
    name: '音乐',
    test: {
      CN: 'One Last Kiss',
      JP: 'One Last Kiss',
      ID: 321924
    }
  },
  {
    type: 'game',
    name: '游戏',
    test: {
      CN: '艾尔登法环',
      JP: 'ELDEN RING',
      ID: 284100
    }
  },
  {
    type: 'real',
    name: '三次元',
    test: {
      CN: '边缘世界',
      JP: 'The Peripheral',
      ID: 403404
    }
  }
] as const

export const SITES_ANIME = [
  {
    id: 'anime|anich',
    name: 'Anich',
    url: 'https://anich.emmmm.eu.org/bangumi/search/[CN]',
    sort: 0,
    active: 0
  },
  {
    id: 'anime|libvio',
    name: 'LIBVIO',
    url: 'https://www.libvio.pw/search/-------------.html?wd=[CN]',
    icon: require('@assets/images/icon/libvio.png'),
    iconSquare: true,
    sort: 0,
    active: 1
  },
  {
    id: 'anime|animeko',
    name: 'Animeko',
    url: 'ani://subjects/[ID]',
    icon: require('@assets/images/icon/animeko.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|dmys3',
    name: '大米星球',
    url: 'https://dmys3.com/vodsearch/-------------.html?wd=[CN]',
    icon: require('@assets/images/icon/dmys3.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|cycanime',
    name: '次元城动画',
    url: 'https://www.cycanime.com/search.html?wd=[CN]',
    icon: require('@assets/images/icon/cycanime.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|mgnacg',
    name: '橘子动漫',
    url: 'https://www.mgnacg.com/search/-------------/?wd=[CN]',
    icon: require('@assets/images/icon/mgnacg.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|anime1',
    name: 'Anime1',
    url: 'https://anime1.me/?s=[CN_S2T]',
    icon: require('@assets/images/icon/anime1.png'),
    iconSquare: true,
    sort: 0,
    active: 0
  },
  {
    id: 'anime|anfuns',
    name: 'AnFuns动漫',
    url: 'https://www.anfuns.cc/search.html?wd=[CN]&submit=',
    icon: require('@assets/images/icon/anfuns.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|girigirilove',
    name: 'girigiri爱动漫',
    url: 'https://anime.girigirilove.com/search/-------------/?wd=[CN]',
    icon: require('@assets/images/icon/girigirilove.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|huazidm',
    name: '花子动漫',
    url: 'https://www.huazidm.com/vodsearch/-------------.html?wd=[CN]',
    icon: require('@assets/images/icon/huazidm.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|catwdm',
    name: '喵物次元',
    url: 'https://www.catwdm.com/catsearch.html?wd=[CN]',
    icon: require('@assets/images/icon/catwdm.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|mutedm',
    name: 'MuteFun动漫',
    url: 'https://www.mutedm.com/vodsearch/[CN]-------------.html',
    icon: require('@assets/images/icon/mutedm.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|animoe',
    name: 'Animoe动漫',
    url: 'https://animoe.org/search.html?wd=[CN]',
    icon: require('@assets/images/icon/animoe.png'),
    iconSquare: true,
    sort: 0,
    active: 0
  },
  {
    id: 'anime|ciyuanb',
    name: '萌鸣动漫',
    url: 'http://ciyuanb.top/vodsearch/-------------/?wd=[CN]',
    icon: require('@assets/images/icon/ciyuanb.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|gxdm01',
    name: '宫下动漫',
    url: 'https://gxdm01.org/vodsearch/-------------/?wd=[CN]',
    icon: require('@assets/images/icon/gxdm01.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|xfani',
    name: '稀饭动漫',
    url: 'https://dick.xfani.com/search.html?wd=[CN]',
    icon: require('@assets/images/icon/xfani.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|acfun',
    name: 'AcFun番剧',
    url: 'https://www.acfun.cn/search?type=bgm&keyword=[CN]',
    icon: require('@assets/images/icon/acfun.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|bilibili',
    name: 'bilibili番剧',
    url: `${HOST_AC_SEARCH}/bangumi?keyword=[CN]`,
    icon: require('@assets/images/icon/bilibili.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|pixivel',
    name: 'pixivel.moe',
    url: 'https://pixivel.moe/search?keyword=[JP]&mode=tag&features=sortpop',
    icon: require('@assets/images/icon/pixivel.png'),
    iconSquare: true,
    sort: 0,
    active: 0
  },
  {
    id: 'anime|dmhy',
    name: '[DL] 动漫花园',
    url: 'https://share.dmhy.org/topics/list?keyword=[CN]',
    icon: require('@assets/images/icon/dmhy.png'),
    sort: 0,
    active: 0
  },
  {
    id: 'anime|mikanime',
    name: '[DL] 蜜柑计划',
    url: 'https://mikanime.tv/Home/Search?searchstr=[CN]',
    icon: require('@assets/images/icon/mikanime.png'),
    sort: 0,
    active: 0
  }
] as const

export const SITES_NSFW = [
  {
    id: 'hanime|hanime1',
    name: 'Hanime1',
    url: 'https://hanime1.me/search?query=[JP]',
    sort: 0,
    active: 1
  }
] as const

export const SITES_MANGA = [
  {
    id: 'manga|mangacopy',
    name: '拷贝漫画',
    url: 'https://www.mangacopy.com/search?q=[CN]&q_type=',
    icon: require('@assets/images/icon/mangacopy.png'),
    sort: 0,
    active: 1
  },
  {
    id: 'manga|komiic',
    name: 'Komiic漫画',
    url: 'https://komiic.com/search/[CN]',
    icon: require('@assets/images/icon/komiic.png'),
    sort: 0,
    active: 1
  },
  {
    id: 'manga|hisoman',
    name: '搜漫',
    url: 'https://www.hisoman.com/search.html?keyword=[CN]',
    icon: require('@assets/images/icon/hisoman.png'),
    iconSquare: true,
    sort: 0,
    active: 1
  },
  {
    id: 'manga|moxmoe',
    name: '[DL] Kox.moe',
    url: `https://kox.moe/list.php?s=[CN]`,
    sort: 0,
    active: 1
  },
  {
    id: 'manga|dlraw',
    name: '[DL] Dl-Raw',
    url: `https://dl-raw.net/?s=[JP]`,
    sort: 0,
    active: 0
  }
] as const

export const SITES_WENKU = [
  {
    id: 'wenku|linovelib',
    name: '哔哩轻小说',
    url: 'https://www.bilinovel.com/search.html?searchkey=[JP]',
    icon: require('@assets/images/icon/linovelib.png'),
    sort: 0,
    active: 1
  },
  {
    id: 'wenku|cijoc',
    name: 'CIJOC',
    url: `https://cijoc.com/search/?s=[JP]`,
    sort: 0,
    active: 1
  }
] as const

export const SITES_MUSIC = [
  {
    id: 'music|163',
    name: '网易云',
    url: 'https://www.baidu.com/s?word=site%3Amusic.163.com+%E4%B8%93%E8%BE%91+[JP]',
    icon: require('@assets/images/icon/163.png'),
    iconSquare: true,
    sort: 0,
    active: 1
  },
  {
    id: 'music|qq',
    name: 'QQ音乐',
    url: 'https://www.baidu.com/s?word=site%3Ay.qq.com+%E4%B8%93%E8%BE%91+[JP]',
    icon: require('@assets/images/icon/qq.png'),
    iconSquare: true,
    sort: 0,
    active: 1
  },
  {
    id: 'music|bilibili',
    name: 'bilibili',
    url: `${HOST_AC_SEARCH}/all?keyword=[JP]&from_source=nav_suggest_new&order=stow&duration=0&tids_1=3`,
    icon: require('@assets/images/icon/bili.png'),
    iconSquare: true,
    sort: 0,
    active: 1
  },
  {
    id: 'music|minimummusic',
    name: '[DL] MinimumMusic',
    url: 'https://minimummusic.com/?s=[JP]',
    icon: require('@assets/images/icon/minimummusic.png'),
    iconSquare: true,
    sort: 0,
    active: 1
  }
] as const

export const SITES_GAME = [
  {
    id: 'game|psnine',
    name: 'PSNINE',
    url: 'https://psnine.com/psngame?title=[CN]',
    icon: require('@assets/images/icon/psnine.png'),
    iconSquare: true,
    sort: 0,
    active: 1
  },
  {
    id: 'game|vndb',
    name: '[GAL] vndb.org',
    url: 'https://vndb.org/v?sq=[JP]',
    icon: require('@assets/images/icon/vndb.png'),
    sort: 0,
    active: 1
  },
  {
    id: 'game|sakustar',
    name: '[GAL] 稻荷ACG',
    url: 'https://sakustar.top/?s=[JP]&type=post',
    icon: require('@assets/images/icon/sakustar.png'),
    iconSquare: true,
    sort: 0,
    active: 1
  },
  {
    id: 'game|xxacg',
    name: '[GAL] xxacg',
    url: 'https://xxacg.net/?s=[JP]',
    icon: require('@assets/images/icon/xxacg.png'),
    iconSquare: true,
    sort: 0,
    active: 1
  },
  {
    id: 'game|gcore',
    name: '机核GCORES',
    url: 'https://www.gcores.com/search?keyword=[CN]&tab=all',
    icon: require('@assets/images/icon/gcore.png'),
    iconSquare: true,
    sort: 0,
    active: 0
  },
  {
    id: 'game|switch520',
    name: '[DL] switch520',
    url: 'https://www.gamer520.com/?s=[CN]',
    sort: 0,
    active: 0
  }
] as const

export const SITES_REAL = [
  {
    id: 'real|libvio',
    name: 'LIBVIO',
    url: 'https://www.libvio.me/search/-------------.html?wd=[CN]',
    icon: require('@assets/images/icon/libvio.png'),
    iconSquare: true,
    sort: 0,
    active: 1
  },
  {
    id: 'real|dianyinggou',
    name: '电影狗',
    url: 'https://www.dianyinggou.com/so/[CN]',
    icon: require('@assets/images/icon/dianyinggou.png'),
    iconSquare: true,
    sort: 0,
    active: 1
  },
  {
    id: 'anime|dmys3',
    name: '大米星球',
    url: 'https://dmys3.com/vodsearch/-------------.html?wd=[CN]',
    icon: require('@assets/images/icon/dmys3.png'),
    sort: 0,
    active: 0
  }
] as const
