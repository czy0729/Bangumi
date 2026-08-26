/*
 * @Author: czy0729
 * @Date: 2026-08-25 01:33:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 12:16:52
 */
import { subjectStore, systemStore, userStore } from '@stores'
import { ON_AIR } from '@stores/calendar/onair'
import { findADV } from '@utils/subject/adv'
import { ANIME_TAGS, findAnime } from '@utils/subject/anime'
import { findGame, GAME_CATE } from '@utils/subject/game'
import { findManga, MANGA_TAGS } from '@utils/subject/manga'
import { findWenku, WENKU_TAGS } from '@utils/subject/wenku'
import { SITES, SITES_DS } from '@constants'
import { NON_SHOW } from '../ds'
import { getOriginConfig } from '../../../../user/origin-setting/utils'

import type { Collection } from '@types'
import type { EpsData } from '../../types'
import type { OriginItem } from '../../../../user/origin-setting/utils'

/** 获取有效的播放源列表 */
export function getValidPlaySources(epsData: EpsData) {
  const validSources = SITES.filter(item => {
    const sourceData = epsData[item]
    return sourceData && Object.keys(sourceData).length > 0
  })
  return [...validSources, '取消']
}

/** 获取动画和三次元的在线源头 */
export function getOnlineOrigins(options: {
  type: string
  nsfw: boolean
  tags: readonly { name?: string }[]
  sites: readonly { site: string }[]
}) {
  const { type, nsfw, tags, sites } = options
  const data: (OriginItem | string)[] = []

  if (type === '动画') {
    if (userStore.isLogin) {
      const flag = nsfw || tags?.some?.(item => item.name?.includes?.('里番'))
      if (flag) {
        getOriginConfig(subjectStore.origin, 'hanime')
          .filter(item => item.active)
          .forEach(item => data.push(item))
      }
    }

    getOriginConfig(subjectStore.origin, 'anime')
      .filter(item => item.active)
      .forEach(item => data.push(item))
  }

  if (type === '三次元') {
    getOriginConfig(subjectStore.origin, 'real')
      .filter(item => item.active)
      .forEach(item => data.push(item))
  }

  if (systemStore.setting.showLegalSource) {
    sites
      .filter(item => (SITES_DS as readonly string[]).includes(item.site))
      .forEach(item => data.push(item.site))
  }

  return data
}

/** 是否 PS 游戏, 跳转 psnine 查看奖杯 */
export function checkIsPS(type: string, info: string) {
  if (type !== '游戏') return false
  return ['PS4', 'PS3', 'PS5'].some(key => info.includes(key))
}

/** 获取第三方动画信息 */
export function getAnimeInfo(type: string, subjectId: string | number) {
  if (type !== '动画') return null
  const item = findAnime(subjectId)
  return item?.i ? item : null
}

/** 获取第三方动画标签 */
export function getAnimeTags(
  subjectId: string | number,
  animeInfo: { t?: readonly number[] } | null
) {
  const calendarInfo = ON_AIR[subjectId]
  if (!animeInfo && !calendarInfo) return null

  let animeInfoTags: string[]
  if (animeInfo?.t) {
    animeInfoTags = animeInfo.t.map(item => ANIME_TAGS[item]).filter(item => !!item)
  }
  if (!animeInfoTags && !calendarInfo) return null

  const tags: { pressable: boolean; value: string }[] = []
  const exist: Record<string, boolean> = {}
  if (animeInfoTags) {
    animeInfoTags.forEach(item => {
      tags.push({ pressable: true, value: item })
      exist[item] = true
    })
  }

  if (calendarInfo) {
    if (!exist[calendarInfo.type]) {
      tags.push({ pressable: false, value: calendarInfo.type })
    }

    calendarInfo.origin.split('/').forEach((item: string) => {
      if (!exist[item]) {
        tags.push({ pressable: false, value: item })
      }
    })

    calendarInfo.tag.split('/').forEach((item: string) => {
      if (!exist[item]) {
        tags.push({ pressable: false, value: item })
      }
    })
  }

  return tags
}

/** 获取第三方游戏信息 */
export function getGameInfo(type: string, subjectId: string | number) {
  if (type !== '游戏') return null

  const item = findGame(subjectId)
  if (item?.i) return { ...item, isADV: false }

  const adv = findADV(subjectId)
  if (adv?.i) return { ...adv, isADV: true }

  return null
}

/** 获取第三方游戏标签 */
export function getGameTags(
  gameInfo: { isADV?: boolean; ta?: readonly (string | number)[] } | null
) {
  if (!gameInfo || gameInfo.isADV) return null
  const tags = gameInfo.ta || []
  return tags.map(item => GAME_CATE[item as number])
}

/** 获取第三方漫画信息 */
export function getMangaInfo(type: string, subjectId: string | number) {
  if (type !== '书籍') return null
  const item = findManga(subjectId)
  return item?.i ? item : null
}

/** 获取第三方漫画标签 */
export function getMangaTags(mangaInfo: { b?: readonly number[] } | null) {
  if (!mangaInfo) return null
  const tags = mangaInfo.b || []
  return tags.map(item => MANGA_TAGS[item])
}

/** 获取第三方文库信息 */
export function getWenkuInfo(type: string, subjectId: string | number) {
  if (type !== '书籍') return null
  const item = findWenku(subjectId)
  return item?.i ? item : null
}

/** 获取第三方文库标签 */
export function getWenkuTags(wenkuInfo: { j?: readonly number[] } | null) {
  if (!wenkuInfo) return null
  const tags = wenkuInfo.j || []
  return tags.map(item => WENKU_TAGS[item])
}

/** 筛选章节构造数据, 每 100 章节一个选项 */
export function getFilterEpsData(epsLength: number) {
  const data = ['从 1 起']
  if (epsLength < 100) return data

  const count = Math.floor(epsLength / 100)
  for (let i = 1; i <= count; i += 1) data.push(`从 ${i * 100} 开始`)
  return data
}

/** 构造全站人员状态数据 */
export function getSubjectStatus(subjectCollection: Collection, action: string) {
  const { wish = 0, collect = 0, doing = 0, on_hold: onHold = 0, dropped = 0 } = subjectCollection
  const status: { status: string; text: string; sum?: number }[] = []

  if (wish) status.push({ status: 'wishes', text: `${wish}想${action}` })
  if (collect) status.push({ status: 'collections', text: `${collect}${action}过` })
  if (doing) status.push({ status: 'doings', text: `${doing}在${action}` })
  if (onHold) status.push({ status: 'on_hold', text: `${onHold}搁置` })
  if (dropped) status.push({ status: 'dropped', text: `${dropped}抛弃` })

  const sum = wish + collect + doing + onHold + dropped
  if (sum) status.push({ status: '', text: `总${sum}`, sum })

  return status
}

/** 去重、过滤空值和超长项、截断 */
export function buildKeywords(
  list: readonly (string | undefined)[],
  maxLength: number,
  maxCount: number
) {
  return [...new Set(list)]
    .filter(Boolean)
    .filter(item => item.length < maxLength)
    .slice(0, maxCount)
}

/** 从角色列表中提取主角名字作为关键字 */
export function buildCrtKeywords(
  crtList: readonly { roleName?: string; name?: string; nameJP?: string }[],
  maxLength: number,
  maxCount: number
) {
  const base: string[] = []
  crtList
    .filter(item => item.roleName === '主角')
    .forEach(item => {
      base.push(item.name || item.nameJP)
    })
  return buildKeywords(base, maxLength, maxCount)
}

/**
 * 根据 setting 值生成 show 元组
 *  - -1: 完全隐藏
 *  - true: 显示且展开
 *  - 其他: 显示但折叠
 */
export function settingTuple(val: boolean | number): readonly [boolean, boolean] {
  if (val === -1) return NON_SHOW
  return [val === true, true] as const
}
