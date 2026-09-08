/*
 * @Author: czy0729
 * @Date: 2026-09-08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08
 *
 * 条目与链接解析（bgm 链接路由匹配、条目中/日文名查找、评分与颜色映射、站点链接模板, 拆分自 data-source.ts）
 */
import { HOST, HOST_2, HOST_3 } from '@constants/host'
import { ensureCacheLimit } from '../cache'
import { HTMLDecode } from '../thirdParty/html'
import { get } from '../thirdParty/protobuf'
import { getSetting } from './utils'
import {
  BANGUMI_URL_TEMPLATES,
  FIND_SUBJECT_CN_CACHE_MAP,
  FIND_SUBJECT_CN_CACHE_MAX,
  FIND_SUBJECT_JP_CACHE_MAP,
  FIND_SUBJECT_JP_CACHE_MAX,
  RATING_MAP,
  SITE_MAP,
  TYPE_MAP
} from './ds'

import type { Id, Paths, SubjectId, SubjectTypeCn } from '@types'

/** bangumi-data 条目 (索引只用到这几个字段) */
type BangumiDataItem = {
  id?: number | string
  j?: string
  c?: string
}

/** 索引项, 记录数组下标用于保持匹配顺序一致 */
type BangumiDataEntry = {
  index: number
  item: BangumiDataItem
}

/** 索引：id / 日文名 / 中文名 → 索引项 */
type BangumiDataIndex = {
  byId: Map<string, BangumiDataEntry>
  byJp: Map<string, BangumiDataEntry>
  byCn: Map<string, BangumiDataEntry>
}

/** 索引缓存与对应的数据源引用 (引用变化时重建索引) */
let __indexedData: readonly BangumiDataItem[] | null = null
let __index: BangumiDataIndex | null = null

/**
 * 懒构建 bangumi-data 索引 (id / 日文名 / 中文名 → 索引项)
 *  - 一次性 O(n) 构建, 后续查询 O(1)
 *  - 以数据源数组引用作为失效依据
 *  - 重复 key 保留首个, 匹配顺序与线性查找一致
 */
function getBangumiDataIndex(bangumiData: readonly BangumiDataItem[]): BangumiDataIndex {
  if (__index && __indexedData === bangumiData) return __index

  const index: BangumiDataIndex = {
    byId: new Map(),
    byJp: new Map(),
    byCn: new Map()
  }

  for (let i = 0; i < bangumiData.length; i += 1) {
    const item = bangumiData[i]
    if (!item) continue

    if (item.id !== undefined && item.id !== null) {
      const id = String(item.id)
      if (!index.byId.has(id)) index.byId.set(id, { index: i, item })
    }

    if (item.j && !index.byJp.has(item.j)) index.byJp.set(item.j, { index: i, item })
    if (item.c && !index.byCn.has(item.c)) index.byCn.set(item.c, { index: i, item })
  }

  __indexedData = bangumiData
  __index = index
  return index
}

/** 返回下标较小的索引项, 保持与线性查找一致的匹配顺序 */
function pickEarlier(a?: BangumiDataEntry, b?: BangumiDataEntry) {
  if (!a) return b
  if (!b) return a
  return a.index <= b.index ? a : b
}

/** 判断收藏动作 */
export function getAction(typeCn: SubjectTypeCn) {
  if (typeCn === '书籍') return '读'
  if (typeCn === '游戏') return '玩'
  if (typeCn === '音乐') return '听'
  return '看'
}

/**
 * 查找条目中文名
 *  - cnFirst 关闭时直接返回 jp
 *  - 有 subjectId 时按 id 匹配, 否则按日文名匹配, 两者都命中取数组中更靠前者
 */
export function findSubjectCn(jp: string = '', subjectId?: SubjectId): string {
  if (!getSetting()?.cnFirst) return jp

  if (FIND_SUBJECT_CN_CACHE_MAP.has(jp)) return FIND_SUBJECT_CN_CACHE_MAP.get(jp)

  const bangumiData = (get('bangumi-data') || []) as readonly BangumiDataItem[]
  if (!bangumiData.length) return jp

  // 输入仅解码一次, 结果在匹配过程中复用
  const decoded = HTMLDecode(jp)

  const { byId, byJp } = getBangumiDataIndex(bangumiData)
  const item = pickEarlier(
    subjectId ? byId.get(String(subjectId)) : undefined,
    byJp.get(decoded)
  )?.item

  if (item) {
    const cn = item.c || ''
    if (cn) {
      FIND_SUBJECT_CN_CACHE_MAP.set(jp, cn)
      ensureCacheLimit(FIND_SUBJECT_CN_CACHE_MAP, FIND_SUBJECT_CN_CACHE_MAX)
      return cn
    }
  }

  FIND_SUBJECT_CN_CACHE_MAP.set(jp, jp)
  ensureCacheLimit(FIND_SUBJECT_CN_CACHE_MAP, FIND_SUBJECT_CN_CACHE_MAX)
  return jp
}

/**
 * 查找条目日文名
 *  - 有 subjectId 时按 id 匹配, 否则按中文名匹配, 两者都命中取数组中更靠前者
 */
export function findSubjectJp(cn: string = '', subjectId?: SubjectId): string {
  if (FIND_SUBJECT_JP_CACHE_MAP.has(cn)) return FIND_SUBJECT_JP_CACHE_MAP.get(cn)

  const bangumiData = (get('bangumi-data') || []) as readonly BangumiDataItem[]
  if (!bangumiData.length) return cn

  const decoded = HTMLDecode(cn)

  const { byId, byCn } = getBangumiDataIndex(bangumiData)
  const item = pickEarlier(
    subjectId ? byId.get(String(subjectId)) : undefined,
    byCn.get(decoded)
  )?.item

  if (item) {
    const jp = item.j || ''
    if (jp) {
      FIND_SUBJECT_JP_CACHE_MAP.set(cn, jp)
      ensureCacheLimit(FIND_SUBJECT_JP_CACHE_MAP, FIND_SUBJECT_JP_CACHE_MAX)
      return jp
    }
  }

  FIND_SUBJECT_JP_CACHE_MAP.set(cn, cn)
  ensureCacheLimit(FIND_SUBJECT_JP_CACHE_MAP, FIND_SUBJECT_JP_CACHE_MAX)
  return cn
}

/** 链接修复规则 (模块级常量) */
const BGM_URL_REPLACEMENTS = [
  { from: 'http://', to: 'https://' },
  { from: HOST_2, to: HOST },
  { from: HOST_3, to: HOST }
] as const

/** 修复链接 */
export function fixedBgmUrl(url: string = ''): string {
  try {
    let value = url

    // 如果 URL 没有协议头，添加默认的 HOST
    if (value && !/^https?:\/\//i.test(value)) value = `${HOST}${value}`

    // 替换协议和 HOST
    BGM_URL_REPLACEMENTS.forEach(({ from, to }) => {
      if (value.includes(from)) value = value.replace(from, to)
    })

    return value
  } catch (error) {
    return url
  }
}

/** 判断是否 bgm 的链接, 若是返回页面信息, 否则返回 false */
export function matchBgmLink(url: string = ''):
  | false
  | {
      route: Paths
      /** 各路由参数值均为 url 上解析出的字符串, 缺失项 (如标签的 airtime) 为 undefined */
      params?: Record<string, string | undefined>
      app?: boolean
    } {
  try {
    const value = fixedBgmUrl(url)

    /**
     * 客户端内部跳转协议
     *  - [https://App/{route}/{key}:{value}]
     */
    if (value.indexOf('https://App/') === 0) {
      const [, , , route = '', params = ''] = value.split('/')
      if (route && params) {
        const [key, value] = params.split(':')
        return {
          route: route as Paths,
          params: {
            [key]: value
          },
          app: true
        }
      }
    }

    if (!value.includes(HOST)) return false

    /**
     * 用户目录
     *  - [/user/{userId}/index]
     *  - https://bgm.tv/user/sai/index
     */
    if (value.includes('/user/') && value.endsWith('/index')) {
      const userId = value.replace(`${HOST}/user/`, '').replace('/index', '')
      return {
        route: 'Catalogs',
        params: {
          userId
        }
      }
    }

    /**
     * 用户日志
     *  - [/user/{userId}/blog]
     *  - https://bgm.tv/user/sai/blog
     */
    if (value.includes('/user/') && value.endsWith('/blog')) {
      const userId = value.replace(`${HOST}/user/`, '').replace('/blog', '')
      return {
        route: 'Blogs',
        params: {
          userId
        }
      }
    }

    /**
     * 用户收藏人物
     *  - [/user/{userId}/mono]
     *  - https://bgm.tv/user/sai/mono
     *  - https://bgm.tv/user/sai/mono/character
     *  - https://bgm.tv/user/sai/mono/person
     */
    if (
      value.includes('/user/') &&
      (value.endsWith('/mono') ||
        value.endsWith('/mono/character') ||
        value.endsWith('/mono/person'))
    ) {
      const userId = value.split('/user/')[1].split('/')[0]
      return {
        route: 'Character',
        params: {
          userId
        }
      }
    }

    /**
     * 用户反向好友
     *  - [/user/{userId}/rev_friends]
     *  - https://bgm.tv/user/sai/rev_friends
     */
    if (value.includes('/user/') && value.endsWith('/rev_friends')) {
      const userId = value.replace(`${HOST}/user/`, '').replace('/rev_friends', '')
      return {
        route: 'Friends',
        params: {
          userId,
          type: 'rev'
        }
      }
    }

    /**
     * 用户好友
     *  - [/user/{userId}/friends]
     *  - https://bgm.tv/user/sai/friends
     */
    if (value.includes('/user/') && value.endsWith('/friends')) {
      const userId = value.replace(`${HOST}/user/`, '').replace('/friends', '')
      return {
        route: 'Friends',
        params: {
          userId
        }
      }
    }

    /**
     * 超展开板块
     *  - [/rakuen/topic/{topicId}]
     *  - https://bgm.tv/rakuen/topic/group/350677
     */
    if (value.includes('/rakuen/topic/')) {
      const topicId = value.replace(`${HOST}/rakuen/topic/`, '')
      return {
        route: 'Topic',
        params: {
          topicId
        }
      }
    }

    /**
     * 帖子
     *  - [/group/topic/{id}]
     *  - https://bgm.tv/group/topic/350677
     */
    if (value.includes('/group/topic/')) {
      const topicId = `group/${value.replace(`${HOST}/group/topic/`, '')}`
      return {
        route: 'Topic',
        params: {
          topicId
        }
      }
    }

    /**
     * 条目讨论版
     *  - [/subject/topic/{subjectId}]
     *  - https://bgm.tv/subject/topic/33680
     */
    if (value.includes('/subject/topic/')) {
      const topicId = `subject/${value.replace(`${HOST}/subject/topic/`, '')}`
      return {
        route: 'Topic',
        params: {
          topicId
        }
      }
    }

    /**
     * 条目本集讨论 (结构与超展开内容类似, 跳转到超展开内容)
     *  - [/ep/{id}]
     *  - https://bgm.tv/ep/1440332
     *  - https://bgm.tv/rakuen/topic/ep/1440332
     *  - https://bgm.tv/rakuen/topic/subject/34480
     */
    if (value.includes('/ep/')) {
      const topicId = value.replace(`${HOST}/`, '').replace('subject/', '')
      return {
        route: 'Topic',
        params: {
          topicId
        }
      }
    }

    /**
     * 条目
     *  - [/subject/{subjectId}]
     *  - https://bgm.tv/subject/454684
     */
    if (value.includes('/subject/')) {
      const subjectId = value.replace(`${HOST}/subject/`, '').split('?')[0].replace(/\/$/, '')
      return {
        route: 'Subject',
        params: {
          subjectId
        }
      }
    }

    /**
     * 个人中心
     *  - [/user/{userId}]
     *  - https://bgm.tv/user/sukaretto
     *  - 排除时间线回复 ![/user/{userId}/timeline/status/{timelineId}]
     */
    if (value.includes('/user/') && value.split('/').length <= 6) {
      // 需要排除掉所有{userId}后面的参数
      const userId = value.replace(`${HOST}/user/`, '').split('/')[0]
      return {
        route: 'Zone',
        params: {
          userId
        }
      }
    }

    /**
     * 人物
     *  - [/character/{id}]
     *  - [/person/{id}]
     *  - https://bgm.tv/character/132476
     *  - https://bgm.tv/person/40794
     */
    if (value.includes('/character/') || value.includes('/person/')) {
      const monoId = value.replace(`${HOST}/`, '')
      return {
        route: 'Mono',
        params: {
          monoId
        }
      }
    }

    /**
     * 搜索
     *  - [/subject_search/{keyword}?cat={subjectType}]
     */
    if (value.match(/subject_search\/([^?]+)/)) {
      const keyword = value.match(/subject_search\/([^?]+)/)?.[1] || ''
      const cat = value.match(/[?&]cat=([^&]+)/)?.[1] || 'all'
      return {
        route: 'Search',
        params: {
          value: decodeURIComponent(keyword || ''),
          cat: `subject_${cat || 'all'}`
        }
      }
    }

    /**
     * 小组
     *  - [/group/{...other}]
     */
    if (value.includes('/group/')) {
      const groupId = value.replace(`${HOST}/group/`, '')
      return {
        route: 'Group',
        params: {
          groupId
        }
      }
    }

    /**
     * 标签
     *  - [/{subjectType}/tag/{...other}]
     *  - https://bgm.tv/anime/tag/TV
     *  - https://bgm.tv/anime/tag/TV/airtime/2025?sort=collects
     */
    if (value.includes('/tag/')) {
      // ['https:', ', 'bgm.tv', 'anime', 'tag', '剧场版', 'airtime', '2018']
      const params = value.split('/')
      return {
        route: 'Tag',
        params: {
          type: params[3],
          tag: decodeURIComponent(params[5]),
          airtime: params[7]
        }
      }
    }

    /**
     * 吐槽
     *  - [/user/{userId}/timeline/status/{id}]
     *  - https://bgm.tv/user/sukaretto/timeline/status/48252302#post_172076
     */
    if (value.includes('/timeline/status/')) {
      const splits = value.split('/timeline/status/')
      const _userId = splits[0].replace(`${HOST}/user/`, '')
      const _id = splits[1]
      return {
        route: 'Say',
        params: {
          sayId: _id,
          userId: _userId
        }
      }
    }

    /**
     * 目录
     *  - [/index/{id}]
     *  - https://bgm.tv/index/35176
     */
    if (value.includes('/index/')) {
      const _id = value.split('/index/')[1]
      return {
        route: 'CatalogDetail',
        params: {
          catalogId: _id
        }
      }
    }

    /**
     * 日志
     *  - [/blog/{id}]
     *  - https://bgm.tv/blog/295515
     */
    if (value.includes('/blog/')) {
      const _id = value.split('/blog/')[1]
      return {
        route: 'Blog',
        params: {
          blogId: _id
        }
      }
    }

    return false
  } catch (error) {
    return false
  }
}

/** TYPE_MAP 值联合 */
export type TypeMapValue = (typeof TYPE_MAP)[keyof typeof TYPE_MAP]

/** 获取颜色 type (未命中时返回默认 'plain') */
export function getType<T extends string>(label: string, defaultType: T): TypeMapValue | T
export function getType(label: string): TypeMapValue
export function getType(label: string, defaultType?: string) {
  return TYPE_MAP[label as keyof typeof TYPE_MAP] || defaultType || 'plain'
}

/** 获取评分中文 (score 缺失时返回空串) */
export function getRating(score?: number): (typeof RATING_MAP)[keyof typeof RATING_MAP] | '' {
  if (score === undefined) return ''

  // 键为数字字面量, 计算结果为 number, 需收窄否则索引为隐式 any
  const key = Math.floor(score + 0.5) as keyof typeof RATING_MAP
  return RATING_MAP[key] || RATING_MAP[1]
}

/**
 * 获得在线播放地址
 * @param item bangumiInfo 数据项
 */
export function getBangumiUrl(item: { site?: string; id?: Id; url?: string }): string {
  if (!item) return ''

  const { site, id, url } = item || {}
  if (site && site in BANGUMI_URL_TEMPLATES) {
    // site 为 string, 直接索引模板表会得到隐式 any, 按键收窄后再调用
    const template = BANGUMI_URL_TEMPLATES[site as keyof typeof BANGUMI_URL_TEMPLATES] as (
      id?: Id
    ) => string
    return url || template(id)
  }

  return ''
}

/** 从 cookies 字符串中分析 cookie 值 */
export function getCookie(cookies: string = '', name: string) {
  const list = cookies.split('; ')
  for (let i = 0; i < list.length; i += 1) {
    const eqIndex = list[i].indexOf('=')
    if (eqIndex === -1) continue
    const key = list[i].substring(0, eqIndex)
    if (key === name) return decodeURIComponent(list[i].substring(eqIndex + 1))
  }
  return ''
}

/**
 * bangumi-data 的 min 转换成正常 item
 * @param {*} item
 *
 * {
 *   id: 132734,
 *   j: '冴えない彼女の育てかた♭',
 *   c: '路人女主的养成方法 ♭',
 *   s: {
 *     p: 'SP3XVb0jk9E0sho',
 *     i: 'a_19rrh9f1yl',
 *     ni: 'saenai2',
 *     b: 28228738
 *   }
 *   [t: 'tv']
 * }
 */
export function unzipBangumiData(
  item: {
    id?: Id
    s?: Record<string, string | number>
    j?: string
    c?: string
    t?: string
  } = {}
) {
  const sites: {
    site: (typeof SITE_MAP)[keyof typeof SITE_MAP] | 'bangumi'
    id: string
  }[] = [
    {
      site: 'bangumi',
      id: String(item.id)
    }
  ]
  Object.keys(item.s || {}).forEach((s: string) => {
    sites.push({
      site: SITE_MAP[s as keyof typeof SITE_MAP],
      id: String(item.s[s])
    })
  })

  return {
    title: item.j,
    type: item.t || 'tv',
    sites,
    titleTranslate: {
      'zh-Hans': [item.c]
    }
  }
}
