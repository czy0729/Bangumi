/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:09:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 11:24:33
 */
import { Loaded } from '@types'

export const COMPONENT = 'OriginSetting'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  data: {
    base: {},
    custom: {
      anime: [],
      hanime: [],
      manga: [],
      wenku: [],
      music: [],
      game: [],
      real: []
    }
  },
  edit: {
    type: '',
    item: {
      id: '',
      uuid: '',
      name: '',
      url: '',
      sort: 0,
      active: 1
    }
  },
  active: true,
  _loaded: false as Loaded
}

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
  // {
  //   id: 'anime|agefans',
  //   name: 'AGE动漫',
  //   url: 'https://www.agedm.org/search?query=[CN]',
  //   sort: 0,
  //   active: 1
  // },
  {
    id: 'anime|dmys3',
    name: '大米星球',
    url: 'https://dmys3.com/vodsearch/-------------.html?wd=[CN]',
    sort: 0,
    active: 1
  },
  {
    id: 'anime|libvio',
    name: 'LIBVIO',
    url: 'https://www.libvio.me/search/-------------.html?wd=[CN]',
    sort: 0,
    active: 0
  },
  {
    id: 'anime|pixivel',
    name: 'pixivel.moe',
    url: 'https://pixivel.moe/search?keyword=[JP]&mode=tag&features=sortpop',
    sort: 0,
    active: 0
  },
  {
    id: 'anime|cupfox',
    name: '茶杯狐',
    url: 'https://www.cupfox.app/search?key=[CN]',
    sort: 0,
    active: 0
  },
  {
    id: 'anime|mx',
    name: 'MX动漫',
    url: 'http://www.mxdm8.com/search/[CN]-------------.html',
    sort: 0,
    active: 0
  },
  {
    id: 'anime|anime1',
    name: 'Anime1',
    url: 'https://anime1.me/?s=[CN_S2T]',
    sort: 0,
    active: 0
  },
  {
    id: 'anime|moe',
    name: '萌番组',
    desc: '复制当前[CN]后跳转，请自行粘贴搜索',
    url: 'https://bangumi.moe/search/index',
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
    url: `https://w.linovelib.com/S8/?searchkey=[CN]&searchtype=all`,
    sort: 0,
    active: 1
  }
] as const

export const SITES_MUSIC = [
  {
    id: 'music|163',
    name: '网易云',
    url: 'https://www.baidu.com/s?word=site%3Amusic.163.com+%E4%B8%93%E8%BE%91+[JP]',
    sort: 0,
    active: 1
  },
  {
    id: 'music|qq',
    name: 'QQ音乐',
    url: 'https://www.baidu.com/s?word=site%3Ay.qq.com+%E4%B8%93%E8%BE%91+[JP]',
    sort: 0,
    active: 1
  },
  {
    id: 'music|bilibili',
    name: 'bilibili',
    url: 'https://search.bilibili.com/all?keyword=[JP]&from_source=nav_suggest_new&order=stow&duration=0&tids_1=3',
    sort: 0,
    active: 1
  },
  {
    id: 'music|minimummusic',
    name: '[DL] MinimumMusic',
    url: 'https://minimummusic.com/?s=[JP]',
    sort: 0,
    active: 1
  }
] as const

export const SITES_GAME = [
  {
    id: 'game|vndb',
    name: 'GAL vndb.org',
    url: 'https://vndb.org/v?sq=[JP]',
    sort: 0,
    active: 1
  },
  {
    id: 'game|psnine',
    name: 'PSNINE',
    url: 'https://psnine.com/psngame?title=[CN]',
    sort: 0,
    active: 1
  },
  {
    id: 'game|gcore',
    name: '机核GCORES',
    url: 'https://www.gcores.com/search?keyword=[CN]&tab=all',
    sort: 0,
    active: 1
  },
  {
    id: 'game|switch520',
    name: '[DL] switch520',
    url: 'https://www.gamer520.com/?s=[CN]',
    sort: 0,
    active: 1
  },
  {
    id: 'game|vgtime',
    name: 'VGTIME',
    url: 'https://www.vgtime.com/search/list.jhtml?keyword=[CN]',
    sort: 0,
    active: 0
  }
] as const

export const SITES_REAL = [
  {
    id: 'real|libvio',
    name: 'LIBVIO',
    url: 'https://www.libvio.me/search/-------------.html?wd=[CN]',
    sort: 0,
    active: 1
  },
  {
    id: 'anime|dmys3',
    name: '大米星球',
    url: 'https://dmys3.com/vodsearch/-------------.html?wd=[CN]',
    sort: 0,
    active: 1
  },
  {
    id: 'real|cupfox',
    name: '茶杯狐',
    url: 'https://www.cupfox.app/search?key=[CN]',
    sort: 0,
    active: 0
  },
  {
    id: 'real|dianyinggou',
    name: '电影狗',
    url: 'https://www.dianyinggou.com/so/[CN]',
    sort: 0,
    active: 0
  }
] as const
