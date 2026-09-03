/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:15:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:15:34
 *
 * 字典 - 排行 / 浏览
 */
import { Model } from './utils'

export const BROWSER_SORT = [
  {
    label: '默认',
    value: ''
  },
  {
    label: '排名',
    value: 'rank'
  },
  {
    label: '时间',
    value: 'date'
  }
] as const

/** 索引排序 */
export const MODEL_BROWSER_SORT = new Model(BROWSER_SORT, 'BROWSER_SORT')

/** [设置] 首页收藏布局 */

export const RANK_ANIME_FILTER = [
  {
    label: '全部',
    value: ''
  },
  {
    label: 'TV',
    value: 'tv'
  },
  {
    label: 'WEB',
    value: 'web'
  },
  {
    label: 'OVA',
    value: 'ova'
  },
  {
    label: '剧场版',
    value: 'movie'
  },
  {
    label: '动态漫画',
    value: 'anime_comic'
  },
  {
    label: '其他',
    value: 'misc'
  }
] as const

/** 动画筛选 */
export const MODEL_RANK_ANIME_FILTER = new Model(RANK_ANIME_FILTER, 'RANK_ANIME_FILTER')

/** 书籍筛选 */

export const RANK_BOOK_FILTER = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '漫画',
    value: 'comic'
  },
  {
    label: '小说',
    value: 'novel'
  },
  {
    label: '绘本',
    value: 'picture'
  },
  {
    label: '公式书',
    value: 'official'
  },
  {
    label: '写真',
    value: 'photo'
  },
  {
    label: '其他',
    value: 'misc'
  }
] as const

/** 书籍筛选 */
export const MODEL_RANK_BOOK_FILTER = new Model(RANK_BOOK_FILTER, 'RANK_BOOK_FILTER')

/** 书籍二级筛选 */

export const RANK_BOOK_FILTER_SUB = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '系列',
    value: 'series'
  },
  {
    label: '单行本',
    value: 'offprint'
  }
] as const

/** 书籍筛选 */
export const MODEL_RANK_BOOK_FILTER_SUB = new Model(RANK_BOOK_FILTER_SUB, 'RANK_BOOK_FILTER_SUB')

/** 游戏筛选 */

export const RANK_GAME_FILTER = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '游戏',
    value: 'games'
  },
  {
    label: '扩展包',
    value: 'dlc'
  },
  {
    label: '软件',
    value: 'software'
  },
  {
    label: '桌游',
    value: 'tabletop'
  }
  // {
  //   label: '其他',
  //   value: 'misc'
  // }
] as const

/** 游戏筛选 */
export const MODEL_RANK_GAME_FILTER = new Model(RANK_GAME_FILTER, 'RANK_GAME_FILTER')

/** 游戏二级筛选 */

export const RANK_GAME_FILTER_SUB = [
  {
    label: '全部',
    value: ''
  },
  {
    label: 'PC',
    value: 'PC'
  },
  {
    label: 'Web',
    value: 'Web'
  },
  {
    label: 'Mac',
    value: 'Mac'
  },
  {
    label: 'Linux',
    value: 'Linux'
  },
  {
    label: 'PS5',
    value: 'PS5'
  },
  {
    label: 'Xbox Series X/S',
    value: 'XSX'
  },
  {
    label: 'Nintendo Switch',
    value: 'NS'
  },
  {
    label: 'iOS',
    value: 'iOS'
  },
  {
    label: 'Android',
    value: 'Android'
  },
  {
    label: 'VR',
    value: 'VR'
  },
  {
    label: 'PSVR2',
    value: 'PSVR2'
  },
  {
    label: '街机',
    value: '街机'
  },
  {
    label: 'Xbox One',
    value: 'XboxOne'
  },
  {
    label: 'Xbox',
    value: 'Xbox'
  },
  {
    label: 'Xbox 360',
    value: 'Xbox360'
  },
  {
    label: 'GBA',
    value: 'GBA'
  },
  {
    label: 'Wii',
    value: 'Wii'
  },
  {
    label: 'NDS',
    value: 'NDS'
  },
  {
    label: 'FC',
    value: 'FC'
  },
  {
    label: '3DS',
    value: '3DS'
  },
  {
    label: 'GBC',
    value: 'GBC'
  },
  {
    label: 'GB',
    value: 'GB'
  },
  {
    label: 'N64',
    value: 'N64'
  },
  {
    label: 'NGC',
    value: 'NGC'
  },
  {
    label: 'SFC',
    value: 'SFC'
  },
  {
    label: 'Wii U',
    value: 'WiiU'
  },
  {
    label: 'PS4',
    value: 'PS4'
  },
  {
    label: 'PSVR',
    value: 'PSVR'
  },
  {
    label: 'PS Vita',
    value: 'PSV'
  },
  {
    label: 'PS3',
    value: 'PS3'
  },
  {
    label: 'PSP',
    value: 'PSP'
  },
  {
    label: 'PS2',
    value: 'PS2'
  },
  {
    label: 'PS',
    value: 'PS'
  },
  {
    label: 'Dreamcast',
    value: 'DC'
  },
  {
    label: 'Sega Saturn',
    value: 'SS'
  },
  {
    label: 'MD',
    value: 'MD'
  },
  {
    label: 'Apple II',
    value: 'AppleII'
  },
  // {
  //   label: 'Amiga',
  //   value: 'Amiga'
  // },
  {
    label: 'DOS',
    value: 'DOS'
  },
  {
    label: 'Symbian',
    value: 'Symbian'
  }
  // {
  //   label: 'PC98',
  //   value: 'PC98'
  // },
  // {
  //   label: 'PCE',
  //   value: 'PCE'
  // },
  // {
  //   label: 'PC88',
  //   value: 'PC88'
  // },
  // {
  //   label: 'X68000',
  //   value: 'X68000'
  // },
] as const

/** 游戏二级筛选 */
export const MODEL_RANK_GAME_FILTER_SUB = new Model(
  RANK_GAME_FILTER_SUB,
  'MODEL_RANK_GAME_FILTER_SUB'
)

/** 三次元筛选 */

export const RANK_REAL_FILTER = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '日剧',
    value: 'jp'
  },
  {
    label: '欧美剧',
    value: 'en'
  },
  {
    label: '华语剧',
    value: 'cn'
  },
  {
    label: '电视剧',
    value: 'tv'
  },
  {
    label: '电影',
    value: 'movie'
  },
  {
    label: '演出',
    value: 'live'
  },
  {
    label: '综艺',
    value: 'show'
  },
  {
    label: '其他',
    value: 'misc'
  }
] as const

/** 三次元筛选 */
export const MODEL_RANK_REAL_FILTER = new Model(RANK_REAL_FILTER, 'RANK_REAL_FILTER')

/** [小圣杯] 股类型 */
