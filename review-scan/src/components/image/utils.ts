/*
 * @Author: czy0729
 * @Date: 2022-05-28 02:06:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 19:13:10
 */
import { _ } from '@stores'
import { getCover400, getStorage, setStorage, showImageViewer } from '@utils'
import { HOST_IMAGE } from '@utils/app/ds'
import { t } from '@utils/fetch'
import hash from '@utils/thirdParty/hash'
import ImageCacheManager from '@utils/thirdParty/image-cache-manager'
import { DEV, HOST_CDN, IOS, TEXT_BADGES, WEB } from '@constants'
import {
  CACHE_KEY_404,
  CACHE_KEY_451,
  CACHE_KEY_TIMEOUT,
  OSS_BGM,
  OSS_BGM_EMOJI_PREFIX
} from './ds'
import { Props } from './types'

/** 记录 451 (OSS 鉴定为敏感) 的图片 */
let memo451: Map<string, boolean>

/** 记录 404 的图片 */
let memo404: Map<string, boolean>

/** 记录超时的图片 */
let memoTimeout: Map<string, boolean>

/** 记录加载过的图片 */
const memoLocal = new Map<
  string,
  {
    path: string
    size?: number
  }
>()

/** 初始化 */
;(async () => {
  try {
    memo451 = new Map(Object.entries((await getStorage(CACHE_KEY_451)) || {}))
  } catch (error) {
    memo451 = new Map()
  }

  try {
    memo404 = new Map(Object.entries((await getStorage(CACHE_KEY_404)) || {}))
  } catch (error) {
    memo404 = new Map()
  }

  try {
    memoTimeout = new Map(Object.entries((await getStorage(CACHE_KEY_TIMEOUT)) || {}))
  } catch (error) {
    memoTimeout = new Map()
  }
})()

/** 记录 451 (OSS 鉴定为敏感) 的图片地址 */
export function setError451(src: string) {
  if (!memo451 || typeof src !== 'string') return false

  const id = hash(src)
  if (memo451.has(id)) return true

  memo451.set(id, true)
  setStorage(CACHE_KEY_451, Object.fromEntries(memo451))
}

/** 检查是否存在过 451 (OSS 鉴定为敏感) 返回 */
export function checkError451(src: string): boolean {
  if (!memo451 || typeof src !== 'string') return false

  return memo451.has(hash(src))
}

/** 记录 404 的图片地址 */
export function setError404(src: string) {
  if (!memo404 || typeof src !== 'string') return false

  const id = hash(src)
  if (memo404.has(id)) return true

  memo404.set(id, true)
  setStorage(CACHE_KEY_404, Object.fromEntries(memo404))
}

/** 检查是否存在过 404 返回 */
export function checkError404(src: string): boolean {
  if (!memo404 || typeof src !== 'string') return false

  return memo404.has(hash(src))
}

/** 记录超时的图片地址 */
export function setErrorTimeout(src: Props['src']) {
  if (!memoTimeout || typeof src !== 'string') return false

  const id = hash(src)
  if (memoTimeout.has(id)) return true

  memoTimeout.set(id, true)
  setStorage(CACHE_KEY_TIMEOUT, Object.fromEntries(memoTimeout))
}

/** 检查是否存在过超时返回 */
export function checkErrorTimeout(src: Props['src']): boolean {
  if (!memoTimeout || typeof src !== 'string') return false

  return memoTimeout.has(hash(src))
}

/** 检查图片地址在本地是否已标记成错误 */
export function checkLocalError(src: any) {
  return checkBgmEmoji(src) || checkError451(src) || checkError404(src)
}

/** 检查是否 bgm 没有做本地化的不常用表情 */
export function checkBgmEmoji(src: string): boolean {
  if (typeof src !== 'string') return false

  return src.includes(OSS_BGM_EMOJI_PREFIX)
}

/**
 * 开发调试用
 *  - fallback     红色 5x
 *  - lain.bgm.tv  蓝色
 *  - magma        绿色
 *  - jsDelivr     橙色
 *  - < 10K 1x, < 60k 3x, > 100k 5x
 */
export function getDevStyles(src: any, fallback: boolean = false, size: number) {
  if (typeof src !== 'string') return false

  if (fallback) {
    return {
      borderWidth: 5,
      borderColor: _.colorDanger
    }
  }

  const borderWidth = !size ? 1 : size < 10000 ? 1 : size < 60000 ? 3 : 5
  if (src.includes('lain.bgm.tv')) {
    return {
      borderWidth,
      borderColor: _.colorPrimary
    }
  }

  if (src.includes('img.5t5')) {
    return {
      borderWidth,
      borderColor: _.colorSuccess
    }
  }

  if (src.includes(HOST_CDN)) {
    return {
      borderWidth,
      borderColor: _.colorWarning
    }
  }

  if (src.includes('hdslb.com')) {
    return {
      borderWidth,
      borderColor: _.colorBid
    }
  }

  return false
}

/** 计算自适应图片宽高 */
export function getAutoSize(
  width: number,
  height: number,
  autoSize: number | boolean,
  autoHeight: number
) {
  let w: number
  let h: number

  if (autoSize && typeof autoSize === 'number') {
    // 假如图片本身的宽度没有超过给定的最大宽度, 直接沿用图片原尺寸
    if (width < autoSize) {
      w = width
      h = height
    } else {
      w = autoSize
      h = Math.floor((autoSize / width) * height)
    }
  } else {
    w = Math.floor((autoHeight / height) * width)
    h = autoHeight
  }

  return {
    width: w,
    height: h
  }
}

/** 获取回滚的 bgm 原始格式封面地址 */
export function getRecoveryBgmCover(src: any, width: number, height: number, size: number) {
  if (typeof src !== 'string') return src

  // 提取原来的封面图片地址
  let path = src.split('/pic/')?.[1] || ''
  if (path) path = path.replace(/\/bgm_poster(_100|_200)?/g, '')

  // 如果是触发回滚机制的图, 通常是游戏类的横屏图, 所以可以使用 height 去检查加大一个级别
  const w = Math.max(width || 0, height || 0, size || 0)
  let coverSize: 100 | 200 | 400 = 100
  if (WEB) {
    if (w > 200) {
      coverSize = 400
    } else if (w > 100) {
      coverSize = 200
    }
  } else {
    if (w > 134) {
      coverSize = 400
    } else if (w > 67) {
      coverSize = 200
    }
  }

  return getCover400(`${OSS_BGM}/pic/${path}`, coverSize)
}

/** 调用 ImageViewer 弹窗 */
export function imageViewerCallback({ imageViewerSrc, uri, src, headers, event }) {
  return () => {
    let _src = imageViewerSrc
    if (typeof _src === 'string' && _src.indexOf('http') !== 0) _src = undefined

    t(event?.id, {
      from: '封面图',
      ...event?.data
    })

    showImageViewer([
      {
        headers,
        url: _src || uri,
        _url: _src || src
      }
    ])
  }
}

/** 修复远程图片地址 */
export function fixedRemoteImageUrl(url: any) {
  if (typeof url !== 'string' || url.startsWith('./')) return url

  // 协议
  if (url.indexOf('https:') === -1 && url.indexOf('http:') === -1) return `https:${url}`

  // 来自官方的图片是支持 https 的, 而 IPA 一定是 https 的图片才能正常显示
  // 这里保证来自官方的图片必须能正常显示, 强制转换
  if (url.startsWith(`http:${HOST_IMAGE}`)) url = url.replace('http://', 'https://')

  return url
}

/** 用于下载超时, 默认 10s */
export function timeoutPromise() {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject('download timed out')
    }, 10000)
  })
}

/**
 * 检测图片是否存在本地缓存
 *  - iOS 会返回 ImageCacheManager 的结果
 *  - 安卓只会记录这个图片记录过
 * */
export async function getLocalCache(src: string, headers?: Record<string, string>) {
  const id = hash(src)
  if (memoLocal.has(id)) return memoLocal.get(id)

  let result: {
    path: string
    size?: number
  }
  if (IOS) {
    result = await ImageCacheManager.get(src, {
      headers
    }).getPath()
  } else {
    result = {
      path: src
    }
  }

  if (result) memoLocal.set(id, result)

  return result
}

/** 检测图片是否存在本地缓存 */
export function getLocalCacheStatic(src: string) {
  const id = hash(src)
  if (memoLocal.has(id)) return memoLocal.get(id)
}

/** [DEV] */
export function log(method: string, ...others: any[]) {
  if (DEV) console.info(TEXT_BADGES.plain, `[@component/image/${method}]`, ...others)
}
