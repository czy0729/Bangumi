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
 * @Last Modified time: 2024-04-13 17:43:19
 */
import { toJS } from 'mobx'
import { desc, getTimestamp } from '@utils'
import { s2t } from '@utils/thirdParty/open-cc'
import { SITE_AGEFANS, SITE_MANGABZ, SITE_WK8, SITE_WNACG } from '@constants'
import { Origin, SubjectId } from '@types'
import {
  SITES_ANIME,
  SITES_GAME,
  SITES_MANGA,
  SITES_MUSIC,
  SITES_NSFW,
  SITES_REAL,
  SITES_WENKU
} from './ds'
import { Keys } from './types'

export type OriginItem = {
  id: string
  name: string
  url: string
  sort: number
  active: number
  desc?: string
}

/** 获取APP自维护设置数据 */
export function getBaseOriginConfig(): Record<Keys, OriginItem[]> {
  return {
    anime: [
      {
        id: 'anime|age',
        name: 'AGE动漫',
        url: `${SITE_AGEFANS()}/search?query=[CN]&page=1`,
        sort: 0,
        active: 1
      },
      ...SITES_ANIME
    ],
    hanime: [...SITES_NSFW],
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
      ...SITES_MANGA
    ],
    wenku: [
      {
        id: 'wenku|wk8',
        name: '轻小说文库',
        url: `${SITE_WK8()}/modules/article/search.php?searchtype=articlename&searchkey=[CN]`,
        sort: 0,
        active: 1
      },
      ...SITES_WENKU
    ],
    music: [...SITES_MUSIC],
    game: [...SITES_GAME],
    real: [...SITES_REAL]
  }
}

/** 获取设置数据 */
export function getOriginConfig(userOriginSetting: Origin): Record<Keys, OriginItem>
export function getOriginConfig(userOriginSetting: Origin, pickType: Keys): OriginItem[]
export function getOriginConfig(userOriginSetting: Origin, pickType?: Keys): unknown {
  const { base = {}, custom = {} } = toJS(userOriginSetting)
  const mergeConfig = getBaseOriginConfig()

  // 合并用户自定义和APP自维护数据
  Object.keys(mergeConfig).forEach((type: Keys) => {
    if (typeof pickType !== 'undefined' && pickType !== type) return

    const self = mergeConfig[type]

    // 先合并用户对自维护数据的自定义
    self.forEach(item => {
      if (typeof base?.[item.id] === 'object') {
        // 只合并 sort 和 active
        const customBaseItem = base[item.id]
        if (customBaseItem.sort !== undefined) item.sort = customBaseItem.sort
        // @ts-expect-error
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
      .slice()
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

export function getYuqueThumbs(src: string[] | readonly string[] | false) {
  if (!src) return false

  return src.map(item => ({
    url: `https://cdn.nlark.com/yuque/${item}`
  }))
}
