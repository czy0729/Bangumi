/*
 * @Author: czy0729
 * @Date: 2022-05-28 02:06:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-28 02:31:28
 */
import { setStorage, getStorage, showImageViewer } from '@utils'
import { t } from '@utils/fetch'
import { HOST_CDN } from '@constants'
import { _ } from '@stores'

const NAMESPACE = 'Component|Image'

const CACHE_KEY_451 = `${NAMESPACE}|CACHE_ERROR_451`

const CACHE_KEY_404 = `${NAMESPACE}|CACHE_ERROR_404`

/** 记录 code=451 的图片 */
let CACHE_ERROR_451: {
  [uri: string]: 1
} = {}

/** 记录 code=404 的图片 */
let CACHE_ERROR_404: {
  [uri: string]: 1
} = {}

setTimeout(async () => {
  try {
    CACHE_ERROR_451 = (await getStorage(CACHE_KEY_451)) || {}
    CACHE_ERROR_404 = (await getStorage(CACHE_KEY_404)) || {}
  } catch (error) {}
}, 0)

/** 记录 code=451 的图片地址 */
export function setError451(src: string) {
  if (typeof src !== 'string') return false
  if (CACHE_ERROR_451[src]) return true

  CACHE_ERROR_451[src] = 1
  setStorage(CACHE_KEY_451, CACHE_ERROR_451)
}

/** 检查是否存在过 code=451 返回 */
export function checkError451(src: string): boolean {
  if (typeof src !== 'string') return false
  return !!CACHE_ERROR_451[src]
}

/** 记录 code=404 的图片地址 */
export function setError404(src: string) {
  if (typeof src !== 'string') return false
  if (CACHE_ERROR_404[src]) return true

  CACHE_ERROR_404[src] = 1
  setStorage(CACHE_KEY_404, CACHE_ERROR_404)
}

/** 检查是否存在过 code=404 返回 */
export function checkError404(src: string): boolean {
  if (typeof src !== 'string') return false
  return !!CACHE_ERROR_404[src]
}

/**
 * 开发调试用
 *  - fallback    红色 2x
 *  - lain.bgm.tv 蓝色
 *  - magma       绿色
 *  - jsDelivr    橙色
 */
export function getDevStyles(src: any, fallback: boolean = false) {
  if (typeof src !== 'string') return false

  if (fallback) {
    return {
      borderWidth: 2,
      borderColor: _.colorDanger
    }
  }

  if (src.includes('lain.bgm.tv')) {
    return {
      borderWidth: 1,
      borderColor: _.colorPrimary
    }
  }

  if (src.includes('img.5t5')) {
    return {
      borderWidth: 1,
      borderColor: _.colorSuccess
    }
  }

  if (src.includes(HOST_CDN)) {
    return {
      borderWidth: 1,
      borderColor: _.colorWarning
    }
  }

  if (src.includes('hdslb.com')) {
    return {
      borderWidth: 1,
      borderColor: _.colorBid
    }
  }

  return false
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
