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
 * @Last Modified time: 2022-03-24 08:09:25
 */
import { toJS } from 'mobx'
import { desc, getTimestamp } from '@utils'
import { s2t } from '@utils/thirdParty/cn-char'
import {
  SITE_AGEFANS,
  SITE_XUNBO,
  SITE_WNACG,
  SITE_MANGABZ,
  SITE_MANHUA1234,
  SITE_WK8,
  SITE_77MH,
  SITE_RRYS
} from '@constants/site'

/**
 * 获取APP自维护设置数据
 */
export function getBaseOriginConfig() {
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
        id: 'anime|xunbo',
        name: '迅播动漫',
        url: `${SITE_XUNBO()}/search.php?searchword=[CN]`,
        sort: 0,
        active: 1
      },
      {
        id: 'anime|qiqi',
        name: '奇奇动漫',
        url: 'https://www.qiqidongman.com/vod-search-wd-[CN].html',
        sort: 0,
        active: 1
      },
      {
        id: 'anime|anime1',
        name: 'Anime1',
        url: 'https://anime1.me/?s=[CN_S2T]',
        sort: 0,
        active: 1
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
        id: 'manga|manhua1234',
        name: 'manhua1234',
        url: `${SITE_MANHUA1234()}/search/?keywords=[CN]`,
        sort: 0,
        active: 1
      },
      {
        id: 'manga|77mh',
        name: '77mh',
        url: `${SITE_77MH()}/m.php?k=[CN]`,
        sort: 0,
        active: 1
      }
    ],
    wenku: [
      {
        id: 'wenku|wk8',
        name: '轻小说文库',
        url: `${SITE_WK8()}/modules/article/search.php?searchtype=articlename&searchkey=[CN]`,
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
      }
    ],
    game: [
      {
        id: 'game|psnine',
        name: 'PSNINE',
        url: 'https://psnine.com/psngame?title=[CN]',
        sort: 0,
        active: 1
      }
    ],
    real: [
      {
        id: 'game|rrys',
        name: '人人影视',
        url: `${SITE_RRYS()}/search?keyword=[CN]&type=resource`,
        sort: 0,
        active: 1
      }
    ]
  }
}

/**
 * 获取设置数据
 */
export function getOriginConfig(userOriginSetting = {}, pickType) {
  const { base = {}, custom = {} } = toJS(userOriginSetting)
  const mergeConfig = getBaseOriginConfig()

  // 合并用户自定义和APP自维护数据
  Object.keys(mergeConfig).forEach(type => {
    if (pickType && pickType !== type) return

    const self = mergeConfig[type]

    // 先合并用户对自维护数据的自定义
    self.forEach(item => {
      if (typeof base?.[item.id] === 'object') {
        // 只合并 sort 和 active
        const customBaseItem = base[item.id]
        if (customBaseItem.sort !== undefined) item.sort = customBaseItem.sort
        if (customBaseItem.active !== undefined) item.active = customBaseItem.active
      }
    })

    // 把用户自定义的推进对应type数组里
    if (Array.isArray(custom?.[type])) {
      custom[type].forEach(item => {
        self.push(item)
      })
    }

    // 排序
    mergeConfig[type] = self
      .sort((a, b) => desc(a.sort, b.sort))
      .sort((a, b) => desc(a.active, b.active))
  })

  return pickType ? mergeConfig[pickType] : mergeConfig
}

export function replaceOriginUrl(url, item = {}) {
  return url
    .replace(/\[CN\]/g, encodeURIComponent(item.CN))
    .replace(/\[JP\]/g, encodeURIComponent(item.JP))
    .replace(/\[CN_S2T\]/g, encodeURIComponent(s2t(item.CN)))
    .replace(/\[TIME\]/g, getTimestamp())
    .replace(/\[ID\]/g, item.ID)
}
