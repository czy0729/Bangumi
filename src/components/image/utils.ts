/*
 * @Author: czy0729
 * @Date: 2022-05-28 02:06:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 00:18:59
 */
import { Image as RNImage } from 'react-native'
import { _, systemStore } from '@stores'
import { getCover400, getStorage, setStorage, showImageViewer } from '@utils'
import { t } from '@utils/fetch'
import hash from '@utils/thirdParty/hash'
import ImageCacheManager from '@utils/thirdParty/image-cache-manager'
import { HOST_BGM_STATIC, HOST_CDN, HOST_IMAGE, IOS, WEB } from '@constants'
import { getSkeletonColor } from '../skeleton'
import { CACHE_KEY_404, CACHE_KEY_451, CACHE_KEY_TIMEOUT, OSS_BGM_EMOJI_PREFIX } from './ds'

import type { AnyObject } from '@types'
import type { Props, State } from './types'

/** 记录 451 (OSS 鉴定为敏感) 的图片 */
let memo451: Map<string, boolean>

/** 记录 404 的图片 */
let memo404: Map<string, boolean>

/** 记录超时的图片 */
let memoTimeout: Map<string, boolean>

/** 记录加载过的图片（内存级缓存） */
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
  } catch {
    memo451 = new Map()
  }

  try {
    memo404 = new Map(Object.entries((await getStorage(CACHE_KEY_404)) || {}))
  } catch {
    memo404 = new Map()
  }

  try {
    memoTimeout = new Map(Object.entries((await getStorage(CACHE_KEY_TIMEOUT)) || {}))
  } catch {
    memoTimeout = new Map()
  }
})()

/** 记录 451 */
export function setError451(src: string) {
  if (!memo451 || typeof src !== 'string') return false

  const id = hash(src)
  if (memo451.has(id)) return true

  memo451.set(id, true)
  setStorage(CACHE_KEY_451, Object.fromEntries(memo451))
  return false
}

/** 检查 451 */
export function checkError451(src: string): boolean {
  if (!memo451 || typeof src !== 'string') return false
  return memo451.has(hash(src))
}

/** 记录 404 */
export function setError404(src: string) {
  if (!memo404 || typeof src !== 'string') return false

  const id = hash(src)
  if (memo404.has(id)) return true

  memo404.set(id, true)
  setStorage(CACHE_KEY_404, Object.fromEntries(memo404))
  return false
}

/** 检查 404 */
export function checkError404(src: string): boolean {
  if (!memo404 || typeof src !== 'string') return false
  return memo404.has(hash(src))
}

/** 记录超时 */
export function setErrorTimeout(src: Props['src']) {
  if (!memoTimeout || typeof src !== 'string') return false

  const id = hash(src)
  if (memoTimeout.has(id)) return true

  memoTimeout.set(id, true)
  setStorage(CACHE_KEY_TIMEOUT, Object.fromEntries(memoTimeout))
}

/** 检查超时 */
export function checkErrorTimeout(src: Props['src']): boolean {
  if (!memoTimeout || typeof src !== 'string') return false
  return memoTimeout.has(hash(src))
}

/** 本地是否已标记错误 */
export function checkLocalError(src: any) {
  return checkBgmEmoji(src) || checkError451(src) || checkError404(src)
}

/** 是否 bgm 未本地化表情 */
export function checkBgmEmoji(src: string): boolean {
  if (typeof src !== 'string') return false
  return src.includes(OSS_BGM_EMOJI_PREFIX)
}

/** 开发调试样式 */
export function getDevStyles(src: any, fallback: boolean = false, size: number) {
  if (typeof src !== 'string') return undefined

  if (fallback) {
    return {
      borderWidth: 5,
      borderColor: _.colorDanger
    }
  }

  const borderWidth = !size ? 1 : size < 10000 ? 1 : size < 60000 ? 3 : 5

  if (src.includes('lain.bgm.tv')) {
    return { borderWidth, borderColor: _.colorPrimary }
  }

  if (src.includes('img.5t5')) {
    return { borderWidth, borderColor: _.colorSuccess }
  }

  if (src.includes(HOST_CDN)) {
    return { borderWidth, borderColor: _.colorWarning }
  }

  if (src.includes('hdslb.com')) {
    return { borderWidth, borderColor: _.colorBid }
  }

  return undefined
}

/** 计算自适应尺寸 */
export function getAutoSize(
  width: number,
  height: number,
  autoSize: number,
  autoHeight: number
) {
  let w: number
  let h: number

  if (autoSize) {
    if (!width || width < autoSize) {
      w = width
      h = height
    } else {
      w = autoSize
      h = Math.floor((autoSize / width) * height)
    }
  } else {
    if (!height) return { width: 0, height: 0 }
    w = Math.floor((autoHeight / height) * width)
    h = autoHeight
  }

  return { width: w, height: h }
}

/** 回滚 bgm 原始封面 */
export function getRecoveryBgmCover(src: any, width: number, height: number, size: number) {
  if (typeof src !== 'string') return src

  let path = src.split('/pic/')?.[1] || ''
  if (path) path = path.replace(/\/bgm_poster(_100|_200)?/g, '')

  const w = Math.max(width || 0, height || 0, size || 0)
  let coverSize: 100 | 200 | 400 = 100

  if (WEB) {
    if (w > 200) coverSize = 400
    else if (w > 100) coverSize = 200
  } else {
    if (w > 134) coverSize = 400
    else if (w > 67) coverSize = 200
  }

  return getCover400(`${HOST_BGM_STATIC}/pic/${path}`, coverSize)
}

/** ImageViewer 回调 */
export function imageViewerCallback({ imageViewerSrc, uri, src, headers, event }) {
  return () => {
    let imageSrc = imageViewerSrc
    if (typeof imageSrc === 'string' && !imageSrc.startsWith('http')) imageSrc = undefined

    showImageViewer([
      {
        headers,
        url: imageSrc || uri,
        _url: imageSrc || src
      }
    ])

    t(event?.id, {
      from: '封面图',
      ...event?.data
    })
  }
}

/** 修复远程图片地址 */
export function fixedRemoteImageUrl(url: any) {
  if (typeof url !== 'string' || url.startsWith('./')) return url

  if (!url.startsWith('http')) return `https:${url}`

  if (url.startsWith(`http:${HOST_IMAGE}`)) {
    url = url.replace('http://', 'https://')
  }

  return url
}

/**
 * 获取本地缓存
 * - iOS：真实文件缓存
 * - Android：仅做命中记录
 */
export async function getLocalCache(src: string, headers?: Record<string, string>) {
  const id = hash(src)
  if (memoLocal.has(id)) return memoLocal.get(id)

  const result = IOS
    ? await ImageCacheManager.get(src, { headers }).getPath()
    : { path: src, size: 0 }

  if (result) memoLocal.set(id, result)
  return result
}

/** 只读检查本地缓存 */
export function getLocalCacheStatic(src: string) {
  const id = hash(src)
  return memoLocal.get(id)
}

/** 用于下载超时, 默认 10s */
export function timeoutPromise() {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject('download timed out')
    }, 10000)
  })
}

/** 计算图片实际样式 */
export function computeImageStyles(
  props: Props,
  state: State,
  borderRadius: number,
  dev: boolean,
  fallbacked: boolean,
  _size: number,
  styles: AnyObject
) {
  const {
    style,
    imageStyle,
    autoHeight,
    autoSize,
    border,
    borderWidth,
    height,
    placeholder,
    radius,
    shadow,
    size,
    skeleton,
    skeletonType,
    src
  } = props
  const { width: w, height: h, animFinished } = state
  const container: any[] = []
  const image: any[] = []

  // 以 state 里面的 width 和 height 优先
  if (autoSize) {
    image.push({
      width: w || (WEB ? 'auto' : 160),
      height: h || (WEB ? 'auto' : 160)
    })
  } else if (autoHeight) {
    image.push({
      width: w || (WEB ? 'auto' : 160),
      height: h || (WEB ? 'auto' : 160)
    })
  } else if (size) {
    image.push({
      width: props.width || size,
      height: height || size
    })
  }

  // 若边框等于 hairlineWidth 且有影子就不显示边框
  if (border && !(border === _.hairlineWidth && shadow)) {
    image.push(
      typeof border === 'string'
        ? {
            borderWidth,
            borderColor: border
          }
        : styles.border
    )
  }

  // 圆角
  if (radius) {
    if (typeof radius === 'boolean') {
      const s = {
        borderRadius,
        overflow: 'hidden'
      }
      container.push(s)
      image.push(s)
    } else {
      const s = {
        borderRadius: radius,
        overflow: 'hidden'
      }
      container.push(s)
      image.push(s)
    }
  }

  /**
   * 以下特殊情况不显示阴影
   * _.isDark 黑暗模式没必要显示阴影
   * systemStore.devEvent 安卓下当有阴影, 层级会被提高, 导致遮挡卖点分析的可视化文字
   */
  if (shadow && !_.isDark && !(!IOS && systemStore.devEvent.text)) {
    container.push(shadow === 'lg' ? styles.shadowLg : styles.shadow)
  }

  // 图片加载完成且动画结束后移除背景色, 防止安卓过度绘制
  if (placeholder && !animFinished) {
    if (skeleton) {
      container.push({
        backgroundColor: getSkeletonColor(skeletonType)
      })
    } else {
      container.push(styles.placeholder)
    }
  }

  if (style) container.push(style)
  if (imageStyle) {
    container.push(imageStyle)
    image.push(imageStyle)
  }

  if (dev) {
    image.push(getDevStyles(src, fallbacked, _size))
  }

  return {
    container: _.flatten(container),
    image: _.flatten(image)
  }
}

/** 清除指定 src 的超时记录, 返回是否实际清除了 */
export function clearErrorTimeout(src?: string): boolean {
  if (!memoTimeout || typeof src !== 'string') return false
  const id = hash(src)
  if (!memoTimeout.has(id)) return false
  memoTimeout.delete(id)
  setStorage(CACHE_KEY_TIMEOUT, Object.fromEntries(memoTimeout))
  return true
}

/** 探测 magma CDN 状态码, 决定回退还是重试 */
export function probeMagmaCdn(src: string, headers: AnyObject, onStatus: (code: number) => void) {
  if (IOS) {
    const request = new XMLHttpRequest()
    request.withCredentials = false

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        onStatus(this.status)
      }
    }

    request.open('get', src, true)
    request.send(null)
  } else {
    RNImage.getSizeWithHeaders(
      src,
      headers,
      () => {},
      (error: any) => {
        const errorStr = String(error)
        if (errorStr.includes('code=451')) {
          onStatus(451)
        } else if (errorStr.includes('code=404')) {
          onStatus(404)
        } else {
          onStatus(0)
        }
      }
    )
  }
}
