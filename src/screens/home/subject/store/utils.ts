/*
 * @Author: czy0729
 * @Date: 2025-12-18 19:06:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-04 03:01:46
 */
import { subjectStore, systemStore, userStore } from '@stores'
import { ON_AIR } from '@stores/calendar/onair'
import { desc, getTimestamp, isArray, lastDate, pad, removeHTMLTag } from '@utils'
import { findADV } from '@utils/subject/adv'
import { ANIME_TAGS, findAnime } from '@utils/subject/anime'
import { findGame, GAME_CATE } from '@utils/subject/game'
import { findManga, MANGA_TAGS } from '@utils/subject/manga'
import { findWenku, WENKU_TAGS } from '@utils/subject/wenku'
import { HOST, HOST_NAME, IMG_INFO_ONLY, SITES, SITES_DS, URL_DEFAULT_AVATAR } from '@constants'
import { getOriginConfig } from '../../../user/origin-setting/utils'
import { NON_SHOW, SORT_RELATION_DESC } from './ds'

import type { Collection, DeepReadonly } from '@types'
import type { BoardItem, ReviewsItem } from '@stores/rakuen/types'
import type { Crt, Ep, Staff, SubjectFromHtmlRelationsItem } from '@stores/subject/types'

/** 连载类日期匹配键 */
export const PRIMARY_KEYS = '连载开始|开始'

/** 单次发售类日期匹配键 */
export const SECONDARY_KEYS = '发售日|发售日期|放送开始|上映年度|上映时间|上映日|发行日期'

/** 从 rawInfo HTML 中提取指定字段的值 */
export function pickInfoValue(info: string, keys: string) {
  return info.match(new RegExp(`<li><span>(${keys}): <\\/span>(.+?)<\\/li>`))?.[2] || ''
}

/** 提取艺术家 */
export function getArtist(info: string) {
  return removeHTMLTag(pickInfoValue(info, '艺术家'))
}

/** 提取字符串中的年份（4位数字） */
export function extractYear(str: string) {
  return str.match(/(\d{4})/)?.[0] || ''
}

/** 提取字符串中的年月（如 2024-01 或 2024年1月） */
export function extractYearMonth(str: string) {
  return str.match(/(\d{4}[-年]\d{1,2})/)?.[0] || ''
}

/** 将年月标准化为 YYYY-MM 格式 */
export function normalizeYearMonth(value: string) {
  return value
    .replace('年', '-')
    .split('-')
    .map(item => pad(Number(item)))
    .join('-')
}

/**
 * 解析音乐碟播放时长
 *  - 播放时长: 327 分 / 146m / CD 130m
 *  - 播放时长: 186:49 / 02:40:00
 *  - 播放时长: 72:27+65:45+69:00
 */
export function parseMusicDuration(rawInfo: string) {
  if (!rawInfo.includes('播放时长')) return ''

  // 327 分 / 146m / CD 130m
  const m1 = rawInfo.match(/(\d+)\s*(分|m)/)
  if (m1) return `${Number(m1[1])} min`

  // 解析 MM:SS 或 HH:MM:SS 为分钟数
  const toMinutes = (s: string) => {
    const parts = s.split(':').map(Number)
    if (parts.length === 3) return parts[0] * 60 + parts[1]
    if (parts.length === 2) return parts[0]
    return 0
  }

  // 72:27+65:45+69:00 格式
  const m2 = rawInfo.match(/播放时长[\s\S]*?(\d+:\d+(?:\+\d+:\d+)+)/)
  if (m2) {
    const total = m2[1].split('+').reduce((sum, part) => sum + toMinutes(part.trim()), 0)
    return total ? `${total} min` : ''
  }

  // 186:49 / 02:40:00
  const m3 = rawInfo.match(/播放时长[\s\S]*?(\d+:\d+(?::\d+)?)/)
  if (m3) return toMinutes(m3[1]) ? `${toMinutes(m3[1])} min` : ''

  return ''
}

/** 从 eps 中解析最大时长（H:MM:SS），返回分钟数 */
export function parseMaxDurationFromEps(eps: readonly Ep[]) {
  const maxSeconds = Math.max(
    0,
    ...eps.map(item => {
      if (typeof item?.duration !== 'string') return 0

      const parts = item.duration.split(':').map(Number)
      if (parts.length !== 3 || parts.some(n => !Number.isFinite(n))) return 0

      const [h, m, s] = parts
      return h * 3600 + m * 60 + s
    })
  )

  return Math.ceil(maxSeconds / 60)
}

/** 从 rawInfo 匹配片长（片长: 120 分钟），返回分钟数 */
export function parseMovieDuration(rawInfo: string) {
  const match = rawInfo.match(/片长[\s\S]*?(\d+)\s*(分钟|分)/)
  return match ? Number(match[1]) : 0
}

/** 转换关联人物数据格式 */
export function mapCrt(list: DeepReadonly<Crt[]>) {
  return list.map(({ id, images, name, name_cn, role_name, actors = [] }) => ({
    id,
    image: images?.grid || IMG_INFO_ONLY,
    _image: images?.medium || IMG_INFO_ONLY,
    name: name_cn || name,
    nameJP: name,
    desc: actors[0]?.name || role_name,
    roleName: role_name,
    actorId: actors[0]?.id
  }))
}

/** 转换制作人员数据格式 */
export function mapStaff(list: DeepReadonly<Staff[]>) {
  return list.map(({ id, images, name, name_cn: nameCn, jobs = [] }) => ({
    id,
    image: images?.grid || IMG_INFO_ONLY,
    _image: images?.medium || IMG_INFO_ONLY,
    name: nameCn || name,
    nameJP: name,
    desc: jobs[0]
  }))
}

/** 转换网页抓取的人员数据格式 */
export function mapPersons(
  list: readonly {
    id: string
    cover?: string
    nameCn?: string
    name?: string
    position?: string
  }[]
) {
  return list.map(item => ({
    id: item.id.replace('/person/', ''),
    image: item.cover || IMG_INFO_ONLY,
    _image: item.cover || IMG_INFO_ONLY,
    name: (item.nameCn || item.name).trim(),
    nameJP: item.name.trim(),
    desc: item.position
  }))
}

/** 转换关联条目数据格式并排序 */
export function mapRelations(list: readonly SubjectFromHtmlRelationsItem[]) {
  return list
    .map(item => ({
      id: item.id,
      image: item.image,
      name: item.title,
      desc: item.type
    }))
    .sort((a, b) => desc(SORT_RELATION_DESC[a.desc] || 0, SORT_RELATION_DESC[b.desc] || 0))
}

/** 按类型查找关联条目 */
export function findRelationByType<T extends { type?: string; title?: string }>(
  list: readonly T[],
  type: string
): T | undefined {
  return list.find(item => item.type === type)
}

/** 按优先级查找关联条目 */
export function findRelationByTypes<T extends { type?: string; title?: string }>(
  list: readonly T[],
  types: readonly string[]
): T | undefined {
  for (const type of types) {
    const find = list.find(item => item.type === type)
    if (find) return find
  }
  return undefined
}

/** 转换 reviews 数据为 blog 格式 */
export function mapReviewsToBlog(list: readonly ReviewsItem[]) {
  return list.map(item => ({
    dateline: item.time,
    id: Number(item.id),
    image: '',
    replies: Number((item.replies || '').replace('+', '') || 0),
    summary: item.content,
    timestamp: getTimestamp(item.time),
    title: item.title,
    url: `//${HOST_NAME}/blog/${item.id}`,
    user: {
      avatar: {
        large: item.avatar,
        medium: item.avatar,
        small: item.avatar
      },
      id: item.userId,
      nickname: item.userName,
      sign: '',
      url: `//${HOST_NAME}/user/${item.userId}` as const,
      username: item.userId
    }
  }))
}

/** 转换 board 数据为 topic 格式 */
export function mapBoardToTopic(list: DeepReadonly<BoardItem[]>, subjectId: string | number) {
  return list.map(item => ({
    id: Number((item.href || '').replace('/subject/topic/', '')),
    lastpost: 0,
    main_id: subjectId,
    replies: Number((item.replies || '').replace(' replies', '')),
    timestamp: getTimestamp(item.time),
    title: item.title,
    url: `${HOST}${item.href}`,
    user: {
      avatar: {
        large: '',
        medium: '',
        small: ''
      },
      id: item.userId,
      nickname: item.userName,
      sign: '',
      url: `//${HOST_NAME}/user/${item.userId}` as const,
      username: item.userId
    }
  }))
}

/** 按优先级从 staff 中查找原作 */
export function findOriginArtist(staff: readonly { desc: string; name: string; nameJP: string }[]) {
  const priority = ['作者', '原作', '艺术家', '开发'] as const
  for (const desc of priority) {
    const find = staff.find(item => item.desc === desc)
    if (find) return find.nameJP || find.name || ''
  }
  return ''
}

/** 获取有效的播放源列表 */
export function getValidPlaySources(epsData: Record<string, any>) {
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
  const data: any[] = []

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
  if (isArray(animeInfo?.t)) {
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
  return tags.map(item => GAME_CATE[item])
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

/** 获取上映时间 (用于标识未上映) */
export function getRelease(info: string) {
  return pickInfoValue(info, '发售日|放送开始|上映年度|上映时间|上映日')
}

/** 获取发布时间 (年) */
export function getYear(info: string) {
  const primary = extractYear(pickInfoValue(info, PRIMARY_KEYS))
  if (primary) return primary
  return extractYear(pickInfoValue(info, SECONDARY_KEYS))
}

/** 获取发布时间 (年-月) */
export function getYearAndMonth(info: string, year: string) {
  try {
    const primary = extractYearMonth(pickInfoValue(info, PRIMARY_KEYS))
    const temp = primary || extractYearMonth(pickInfoValue(info, SECONDARY_KEYS))
    if (!temp) return year
    return normalizeYearMonth(temp)
  } catch {
    return year
  }
}

/** 获取结束时间 (年) */
export function getEnd(info: string) {
  return extractYear(pickInfoValue(info, '连载结束|结束'))
}

/** 获取结束时间 (年-月) */
export function getYearAndMonthEnd(info: string, end: string) {
  try {
    const temp = extractYearMonth(pickInfoValue(info, '连载结束|结束'))
    if (!temp) return end
    return normalizeYearMonth(temp)
  } catch {
    return end
  }
}

/** 过滤包含默认头像的项 */
export function filterDefaultAvatar<T extends { avatar?: string }>(list: readonly T[]) {
  const shouldFilter = systemStore.setting.filterDefault || userStore.isLimit
  if (!shouldFilter) return list
  return list.filter(item => !item.avatar?.includes?.(URL_DEFAULT_AVATAR))
}

/**
 * 过滤留言列表
 *  - 主动设置屏蔽默认头像用户相关信息
 *  - 限制用户群体 (iOS 的游客和审核员) 强制屏蔽默认头像用户
 */
export function filterSubjectComments<T extends { avatar?: string; star?: string | number }>(
  list: T[],
  filterScores: (string | number)[]
) {
  const { showComment } = systemStore.setting
  if (!showComment || showComment === -1) return []

  const shouldFilterDefault = systemStore.setting.filterDefault || userStore.isLimit
  const hasScoreFilter = filterScores.length > 0
  if (!shouldFilterDefault && !hasScoreFilter) return list

  return list.filter(item => {
    if (shouldFilterDefault && item.avatar?.includes(URL_DEFAULT_AVATAR)) return false
    if (hasScoreFilter) {
      const score = Number(item.star)
      return score >= Number(filterScores[0]) && score <= Number(filterScores[1])
    }
    return true
  })
}

/** 合并好友动态列表 (在看 + 看过), 按时间排序取前 16 条 */
export function mapFriendsRating(
  doings: readonly {
    id: string | number
    time?: string
    avatar?: string
    star?: string | number
    name?: string
  }[],
  collections: readonly {
    id: string | number
    time?: string
    avatar?: string
    star?: string | number
    name?: string
  }[],
  action: string
) {
  const doingsWithTag = doings.map(item => ({ ...item, _isDone: false }))
  const collectionsWithTag = collections.map(item => ({ ...item, _isDone: true }))
  const combinedList = [...doingsWithTag, ...collectionsWithTag]

  return combinedList
    .sort((a, b) => getTimestamp(b.time) - getTimestamp(a.time))
    .slice(0, 16)
    .map(item => {
      const ts = getTimestamp(item.time)
      const actionText = item._isDone ? `${action}过` : action
      return {
        userId: item.id,
        name: item.name,
        avatar: item.avatar,
        star: item.star,
        status: `${lastDate(ts)}在${actionText}`
      }
    })
}

/** 从 info 中解析游戏发售日期 */
export function parseGameReleaseDates(type: string, info: string) {
  if (type !== '游戏' || !info) return []

  const dates: { date: string; region: string; fullText: string }[] = []
  try {
    const datePattern = /(\d{4}[-年]\d{1,2}[-月]\d{1,2}[日]?)(?:\s*\(([^)]+)\))?/g
    for (const m of info.matchAll(datePattern)) {
      dates.push({
        date: m[1],
        region: m[2] || '',
        fullText: m[2] ? `${m[1]}(${m[2]})` : m[1]
      })
    }
  } catch {}
  return dates
}

/** 从 info 中提取别名 */
export function parseAlias(info: string) {
  try {
    return Array.from(info.matchAll(/<span[^>]*>别名:\s*<\/span>\s*([^<]+)/g), m => m[1].trim())
  } catch {
    return []
  }
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

/** 获取剧场版/电影时长 */
export function getDuration(titleLabel: string, eps: readonly Ep[] | undefined, rawInfo: string) {
  if (titleLabel !== '剧场版' && titleLabel !== 'MOVIE' && titleLabel !== '电影') return ''

  if (eps?.length) {
    const minutes = parseMaxDurationFromEps(eps)
    if (minutes > 26) return `${minutes} min`
  }

  if (rawInfo) {
    const minutes = parseMovieDuration(rawInfo)
    if (minutes > 26) return `${minutes} min`
  }

  return ''
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
