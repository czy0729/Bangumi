/*
 * @Author: czy0729
 * @Date: 2022-05-28 02:06:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-14 16:44:57
 */
import { setStorage, getStorage, showImageViewer } from '@utils'
import { t } from '@utils/fetch'
import { HOST_CDN } from '@constants'
import { _ } from '@stores'
import { OSS_BGM_EMOJI_PREFIX } from './ds'

const NAMESPACE = 'Component|Image'

const CACHE_KEY_451 = `${NAMESPACE}|CACHE_ERROR_451`

const CACHE_KEY_404 = `${NAMESPACE}|CACHE_ERROR_404`

const CACHE_KEY_TIMEOUT = `${NAMESPACE}|CACHE_ERROR_TIMEOUT`

/** 记录 code=451 的图片 */
let CACHE_ERROR_451: {
  [uri: string]: 1
} = {}

/** 记录 code=404 的图片 */
let CACHE_ERROR_404: {
  [uri: string]: 1
} = {}

/** 记录 timeout 的图片 */
let CACHE_ERROR_TIMEOUT: {
  [uri: string]: 1
} = {}

setTimeout(async () => {
  try {
    CACHE_ERROR_451 = (await getStorage(CACHE_KEY_451)) || {}
    CACHE_ERROR_404 = (await getStorage(CACHE_KEY_404)) || {}
    CACHE_ERROR_TIMEOUT = (await getStorage(CACHE_KEY_TIMEOUT)) || {}
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

/** 记录 timeout 的图片地址 */
export function setErrorTimeout(src: string) {
  if (typeof src !== 'string') return false
  if (CACHE_ERROR_TIMEOUT[src]) return true

  CACHE_ERROR_TIMEOUT[src] = 1
  setStorage(CACHE_KEY_TIMEOUT, CACHE_ERROR_TIMEOUT)
}

/** 检查是否存在过 timeout 返回 */
export function checkErrorTimeout(src: string): boolean {
  if (typeof src !== 'string') return false
  return !!CACHE_ERROR_TIMEOUT[src]
}

/** 检查是否 bgm 没有做本地化的不常用表情 */
export function checkBgmEmoji(src: string): boolean {
  if (typeof src !== 'string') return false
  return src.includes(OSS_BGM_EMOJI_PREFIX)
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

/** 修复远程图片地址 */
export function fixedRemoteImageUrl(url: any) {
  if (typeof url !== 'string') return url

  let _url = url

  // 协议
  if (_url.indexOf('https:') === -1 && _url.indexOf('http:') === -1) {
    _url = `https:${_url}`
  }

  // fixed: 2022-09-27, 去除 cf 无缘无故添加的前缀
  // 类似 /cdn-cgi/mirage/xxx-xxx-1800/1280/(https://abc.com/123.jpg | img/smiles/tv/15.fig)
  return _url.replace(/\/cdn-cgi\/mirage\/.+?\/\d+\//g, '')
}

/** 用于下载超时 */
export function timeoutPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('download timed out')
    }, 10000)
  })
}
