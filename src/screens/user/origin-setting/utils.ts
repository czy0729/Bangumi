/*
 * 构造自定义播放源头数据
 * 包括APP自维护数据 + 用户自定义数据
 *
 * [CN] | [JP] => encodeURIComponent(this.cn || this.jp)
 * [CN_S2T] | [JP_S2T] => encodeURIComponent(s2t(this.cn || this.jp)
 * [TIMESTAMP] => getTimestamp()
 *
 * @Author: czy0729
 * @Date: 2022-03-22 17:49:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-15 10:58:48
 */
import { toJS } from 'mobx'
import { desc, getTimestamp } from '@utils'
import { s2t } from '@utils/thirdParty/cn-char'
import {
  SITE_AGEFANS,
  SITE_WNACG,
  SITE_MANGABZ,
  // SITE_MANHUA1234,
  SITE_WK8
  // SITE_77MH
} from '@constants'
import { Origin, SubjectId } from '@types'

type Types = 'anime' | 'hanime' | 'manga' | 'wenku' | 'music' | 'game' | 'real'

export type OriginItem = {
  id: string
  name: string
  url: string
  sort: number
  active: number
  desc?: string
}

/** 获取APP自维护设置数据 */
export function getBaseOriginConfig(): Record<Types, OriginItem[]> {
  return {
    anime: [
      {
        id: 'anime|age',
        name: 'AGE动漫',
        url: `${SITE_AGEFANS()}/search?query=[CN]&page=1`,
        sort: 0,
        active: 1
      },
      {
        id: 'anime|scdmfun',
        name: '双辞动漫',
        url: 'https://www.scdmfun.cn/search/wd/[CN].html',
        sort: 0,
        active: 1
      },
      {
        id: 'anime|omofun',
        name: 'OmoFun',
        url: 'https://omofun.tv/vod/search.html?wd=[CN]',
        sort: 0,
        active: 0
      },
      {
        id: 'anime|zzzfun',
        name: 'ZzzFun',
        url: 'http://www.zzzfun.com/vod_search.html?wd=[CN]',
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
        url: 'http://www.mxdm.cc/search/[CN]-------------.html',
        sort: 0,
        active: 0
      },
      {
        id: 'anime|qiqi',
        name: '奇奇动漫',
        url: 'https://www.qiqidongman.com/vod-search-wd-[CN].html',
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
    ],
    hanime: [
      {
        id: 'hanime|hanime1',
        name: 'Hanime1',
        url: 'https://hanime1.me/search?query=[JP]',
        sort: 0,
        active: 1
      }
    ],
    manga: [
      {
        id: 'manga|wnacg',
        name: '绅士漫画',
        url: `${SITE_WNACG()}/search/?q=[CN]&f=_all&s=create_time_DESC`,
        sort: 0,
        active: 1
      },
      {
        id: 'manga|mangabz',
        name: 'Mangabz',
        url: `${SITE_MANGABZ()}/search?title=[CN]`,
        sort: 0,
        active: 1
      },
      {
        id: 'manga|moxmoe',
        name: '[DL] Mox.moe',
        url: `https://mox.moe/list.php?s=[CN]`,
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
    ],
    wenku: [
      {
        id: 'wenku|wk8',
        name: '轻小说文库',
        url: `${SITE_WK8()}/modules/article/search.php?searchtype=articlename&searchkey=[CN]`,
        sort: 0,
        active: 1
      },
      {
        id: 'wenku|linovelib',
        name: '哔哩轻小说',
        url: `https://w.linovelib.com/S8/?searchkey=[CN]&searchtype=all`,
        sort: 0,
        active: 1
      }
    ],
    music: [
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
    ],
    game: [
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
        id: 'game|vgtime',
        name: 'VGTIME',
        url: 'https://www.vgtime.com/search/list.jhtml?keyword=[CN]',
        sort: 0,
        active: 1
      }
    ],
    real: [
      {
        id: 'real|cupfox',
        name: '茶杯狐',
        url: 'https://www.cupfox.app/search?key=[CN]',
        sort: 0,
        active: 1
      },
      {
        id: 'real|dianyinggou',
        name: '电影狗',
        url: 'https://www.dianyinggou.com/so/[CN]',
        sort: 0,
        active: 1
      }
    ]
  }
}

/** 获取设置数据 */
export function getOriginConfig(userOriginSetting: Origin): Record<Types, OriginItem>
export function getOriginConfig(
  userOriginSetting: Origin,
  pickType: Types
): OriginItem[]
export function getOriginConfig(userOriginSetting: Origin, pickType?: Types): unknown {
  const { base = {}, custom = {} } = toJS(userOriginSetting)
  const mergeConfig = getBaseOriginConfig()

  // 合并用户自定义和APP自维护数据
  Object.keys(mergeConfig).forEach((type: Types) => {
    if (typeof pickType !== 'undefined' && pickType !== type) return

    const self = mergeConfig[type]

    // 先合并用户对自维护数据的自定义
    self.forEach(item => {
      if (typeof base?.[item.id] === 'object') {
        // 只合并 sort 和 active
        const customBaseItem = base[item.id]
        if (customBaseItem.sort !== undefined) item.sort = customBaseItem.sort
        // @ts-ignore
        if (customBaseItem.active !== undefined) item.active = customBaseItem.active
      }
    })

    // 把用户自定义的推进对应type数组里
    if (Array.isArray(custom?.[type])) {
      custom[type].forEach((item: OriginItem) => {
        self.push(item)
      })
    }

    // 排序
    mergeConfig[type] = self
      .sort((a, b) => desc(a.sort, b.sort))
      .sort((a, b) => desc(a.active, b.active))
  })

  if (typeof pickType !== 'undefined' && pickType) return mergeConfig[pickType]

  return mergeConfig
}

export function replaceOriginUrl(
  url?: string,
  item: {
    CN?: string
    JP?: string
    ID?: SubjectId
  } = {}
) {
  return url
    .replace(/\[CN\]/g, encodeURIComponent(item.CN))
    .replace(/\[JP\]/g, encodeURIComponent(item.JP))
    .replace(/\[CN_S2T\]/g, encodeURIComponent(s2t(item.CN)))
    .replace(/\[TIME\]/g, String(getTimestamp()))
    .replace(/\[ID\]/g, String(item.ID))
}
