/*
 * @Author: czy0729
 * @Date: 2026-09-08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08
 *
 * 封面与图片地址处理（CDN 匹配、质量切换、远程地址修复、本地头像, 拆分自 data-source.ts）
 */
import { CDN_OSS_MAGMA_MONO, CDN_OSS_MAGMA_POSTER, CDN_OSS_SUBJECT } from '@utils/cdn'
import { IMG_DEFAULT } from '@constants/data'
import { HOST_BGM_STATIC, HOST_IMAGE } from '@constants/host'
import userData from '@assets/json/user.json'
import { ensureCacheLimit } from '../cache'
import { getSetting } from './utils'
import { GET_AVATAR_CACHE_MAP, GET_AVATAR_CACHE_MAX, NO_IMGS } from './ds'

import type { UserId } from '@types'

/** 自动判断封面 CDN 地址 */
export function matchCoverUrl<T>(
  src: T,
  noDefault?: boolean,
  prefix?: string
): T | string | number {
  if (typeof src !== 'string') return src

  const { cdn, cdnOrigin } = getSetting()
  const fallback = noDefault ? '' : IMG_DEFAULT

  /** 有些情况图片地址分析错误, 排除掉 */
  if (NO_IMGS.includes(src)) return IMG_DEFAULT || fallback

  /** magma 高级会员图片源 */
  if (cdn && cdnOrigin === 'magma' && typeof src === 'string' && src.includes(HOST_IMAGE)) {
    const _src: string = src
    if (_src.includes('/pic/crt/')) return CDN_OSS_MAGMA_MONO(_src) || fallback

    return CDN_OSS_MAGMA_POSTER(getCoverMedium(_src), prefix) || fallback
  }

  /** @deprecated 旧免费 CDN 源头, 国内已全部失效 */
  if (cdn) {
    return CDN_OSS_SUBJECT(getCoverMedium(src), cdnOrigin as 'fastly' | 'OneDrive') || fallback
  }

  /** 大图不替换成低质量图 */
  if (typeof src === 'string' && src?.includes('/l/')) return src

  /** 保证至少为中质量图 */
  return getCoverMedium(src) || fallback
}

/** 获取中质量 bgm 图片 */
export function getCoverMedium<T>(src?: T, mini?: boolean): T | string
export function getCoverMedium(src: unknown = '', mini: boolean = false) {
  // 角色图片因为是对头部划图的, 不要处理
  // 用户图床也没有其他质量
  if (
    typeof src !== 'string' ||
    src === '' ||
    src.includes('/crt/') ||
    src.includes('/photo/') ||
    !src.includes(HOST_IMAGE)
  ) {
    return src
  }

  // 用户头像和小组图标没有/c/类型
  if (mini || src.includes('/user/') || src.includes('/icon/')) {
    return fixedRemoteImageUrl(src.replace(/\/g\/|\/s\/|\/c\/|\/l\//, '/m/'))
  }

  return fixedRemoteImageUrl(src.replace(/\/g\/|\/s\/|\/m\/|\/l\//, '/c/'))
}

/**
 * 获取低质量 bgm 图片
 *  - bgm 图片质量 g < s < m < c < l, 只用 s, m(c), l
 *  - CDN 开启下 Avatar 组件会忽略 s, 把 s 转成 m(c)
 */
export function getCoverSmall(src: string = ''): string {
  if (
    typeof src !== 'string' ||
    src === '' ||
    src.includes('/photo/') ||
    !src.includes(HOST_IMAGE)
  ) {
    return src
  }

  return fixedRemoteImageUrl(src.replace(/\/g\/|\/s\/|\/c\/|\/l\//, '/s/'))
}

/** 获取高质量 bgm 图片 */
export function getCoverLarge<T>(src?: T, size?: 200 | 400): T | string
export function getCoverLarge(src: unknown = '', size: 200 | 400 = 400) {
  if (
    typeof src !== 'string' ||
    src === '' ||
    src.includes('/photo/') ||
    !src.includes(HOST_IMAGE)
  ) {
    return src
  }

  const cover = fixedRemoteImageUrl(src.replace(/\/g\/|\/s\/|\/m\/|\/c\//, '/l/'))
  if (size !== 400) return cover.replace('/r/400/', `/r/${size}/`)
  return cover
}

/** 获取新格式 bgm 封面大图 */
export function getCover400(src: string = '', size: 100 | 200 | 400 | 600 | 800 = 400): string {
  if (typeof src === 'string' && src.includes('lain.bgm.tv')) {
    return fixedRemoteImageUrl(
      src
        // 使用新增的 r/400 前缀
        .replace(/lain.bgm.tv\/pic\/cover\/(g|s|c|m|l)\//, `lain.bgm.tv/r/${size}/pic/cover/l/`)
        // 不使用 nxn 直接使用 r/400
        .replace(/\/r\/\d+x\d+\//, `/r/${size}/`)
        // 不使用 r/800
        .replace('/r/800/', `/r/${size}/`)
    )
  }

  return src
}

/** 获取条目封面中等质量地址 */
export function getSubjectCoverCommon(url: string): string {
  if (typeof url !== 'string' || !url) return url

  return fixedRemoteImageUrl(
    url.replace(/\/\/lain.bgm.tv\/r\/\d+\/pic\/cover\/(g|s|m|l)\//, '//lain.bgm.tv/pic/cover/c/')
  )
}

/** 获取人物封面中等质量地址 */
export function getMonoCoverSmall(url: string): string {
  if (typeof url !== 'string' || !url) return url

  return fixedRemoteImageUrl(
    url
      .replace(/\/\/lain.bgm.tv\/r\/\d+\/pic\/crt\/[gsmcl]\//g, '//lain.bgm.tv/pic/crt/g/')
      .replace(/\/[gsmcl]\//g, '/g/')
  )
}

/** 修复远程图片地址 */
export function fixedRemoteImageUrl<T>(url: T): T
export function fixedRemoteImageUrl(url: unknown) {
  if (typeof url !== 'string' || !url) return url

  let value: string = url.replace(/http:\/\//g, 'https://')

  // 协议
  if (!value.startsWith('https://')) {
    value = `https:${value}`
  }

  // 带有服务器 r/800 前缀的必须是 l 大小的图片
  if (/\/r\/\d+\//.test(value)) {
    value = value.replace(/\/(g|s|m|c)\//, '/l/')
  }

  return value
}

const __randomizeImgHostCache = new Map<string, string>()

export function randomizeImgHost(url: string): string {
  if (typeof url !== 'string') return url

  // 命中过去的结果
  if (__randomizeImgHostCache.has(url)) {
    return __randomizeImgHostCache.get(url)!
  }

  // 随机生成新的
  const result = url.replace(/img(\d)\./, () => {
    const choices = [1, 2, 9]
    const random = choices[Math.floor(Math.random() * choices.length)]
    return `img${random}.`
  })

  // 缓存 (加上限兜底, 淘汰后仅表现为该地址重新随机一次 host, 不影响正确性)
  __randomizeImgHostCache.set(url, result)
  ensureCacheLimit(__randomizeImgHostCache, 500)

  return result
}

/** 本地用户数据项 (assets/json/user.json) */
type UserDataItem = {
  /** 昵称 */
  n?: string

  /** 头像相对路径 */
  a?: string

  /** 用户名 */
  i?: string
}

/** user.json 的 userId 索引 (懒构建, 用于加速回退查找) */
let __userDataIdIndex: Map<string, UserDataItem> | null = null

function getUserDataIdIndex(userDataMap: Record<string, UserDataItem>) {
  if (__userDataIdIndex) return __userDataIdIndex

  const index = new Map<string, UserDataItem>()
  Object.keys(userDataMap).forEach(key => {
    const item = userDataMap[key]
    if (!item || item.i === undefined) return

    const id = String(item.i)
    if (!index.has(id)) index.set(id, item)
  })

  __userDataIdIndex = index
  return index
}

/** 在本地数据中尽量获取用户头像地址, 目的为进行减少 API 请求 */
export function getAvatarLocal(userId: UserId) {
  if (!userId) return false

  if (GET_AVATAR_CACHE_MAP.has(userId)) return GET_AVATAR_CACHE_MAP.get(userId)

  // json 推断出的字面量类型过大, 统一按字典视图使用
  const userDataMap = userData as Record<string, UserDataItem>
  let find = userDataMap[userId]
  if (!find) find = getUserDataIdIndex(userDataMap).get(String(userId))

  if (!find?.a) {
    GET_AVATAR_CACHE_MAP.set(userId, false)
    ensureCacheLimit(GET_AVATAR_CACHE_MAP, GET_AVATAR_CACHE_MAX)
    return false
  }

  // 兼容旧数据: 旧格式不含目录前缀, 默认补 000/
  const a = find.a
  const path = !/^\d{3}\//.test(a) ? `000/${a}` : a
  const avatar = `${HOST_BGM_STATIC}/pic/user/l/${path}.jpg` as const
  GET_AVATAR_CACHE_MAP.set(userId, avatar)
  ensureCacheLimit(GET_AVATAR_CACHE_MAP, GET_AVATAR_CACHE_MAX)
  return avatar
}
