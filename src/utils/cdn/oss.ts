/*
 * @Author: czy0729
 * @Date: 2022-05-23 07:22:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:27:54
 *
 * 条目封面 hash CDN 与 MAGMA CDN
 *  - hash 数据源已停止初始化, CDN_OSS_SUBJECT 现恒等返回原地址
 */
import Crypto from '@utils/crypto'
import { HOST_CDN_FASTLY, HOST_CDN_ONEDRIVE, VERSION_OSS } from '@constants/cdn/ds'
import { getOTA, hash } from '@constants/cdn/utils'
import { HOST_CDN } from '@constants/host'

/** @deprecated */
const HOST_OSS = `${HOST_CDN}/gh/czy0729/Bangumi-OSS`

/** @deprecated */
const cacheSubject: Record<string, string> = {}

/** @deprecated */
const hashSubjectOTA: Record<string, string> = {}

/** @deprecated */
const hashSubjectLoaded = false

/** @deprecated 条目封面 CDN */
export const CDN_OSS_SUBJECT = <T>(src: T, cdnOrigin?: 'OneDrive' | 'fastly'): T | string => {
  if (typeof src !== 'string') return src

  const _key: string = src
  if (cacheSubject[_key]) return cacheSubject[_key]

  // 修正图片地址
  let _src = _key.split('?')[0]
  if (_src.indexOf('https:') === -1 && _src.indexOf('http:') === -1) {
    _src = `https:${_src}`
  }
  _src = _src.replace('http://', 'https://')

  const _hash = hash(_src)

  if (_hash in hashSubjectOTA) {
    const ota = getOTA()
    const version =
      parseInt(ota.VERSION_OSS as string) > parseInt(VERSION_OSS) ? ota.VERSION_OSS : VERSION_OSS

    const path = _hash.slice(0, 1).toLocaleLowerCase()
    let cdnSrc
    if (cdnOrigin === 'OneDrive') {
      cdnSrc = `${HOST_CDN_ONEDRIVE}/subject/c/${path}/${_hash}.jpg`
    } else if (cdnOrigin === 'fastly') {
      cdnSrc = `${HOST_CDN_FASTLY}/gh/czy0729/Bangumi-OSS@${version}/data/subject/c/${path}/${_hash}.jpg`
    } else {
      cdnSrc = `${HOST_OSS}@${version}/data/subject/c/${path}/${_hash}.jpg`
    }
    if (hashSubjectLoaded) cacheSubject[_key] = cdnSrc
    return cdnSrc
  }

  if (hashSubjectLoaded) cacheSubject[_key] = _key
  return _key
}

/** CDN V2 */
let CDN_MAGMA: string

function initCDN() {
  if (!CDN_MAGMA) {
    CDN_MAGMA = Crypto.get(
      'U2FsdGVkX1+8XichzWKyMJq48Ovm7Py40o5JPSjNIH/MqOGILJbEY+ZBXG+d7TM5JHxxP0vuinOgBs4qCt7pyQ=='
    ) as string
  }
  return !!CDN_MAGMA
}

export { CDN_MAGMA }

const REG_COVER = /\/(c|l)\//

/** MAGMA CDN */
export const CDN_OSS_MAGMA_POSTER = <T>(
  src?: T,
  prefix: 'bgm_poster_100' | 'bgm_poster_200' | 'bgm_poster' | string = 'bgm_poster'
): T | string => {
  if (
    typeof src !== 'string' ||
    src === '' ||
    !REG_COVER.test(src) ||
    /\/(photo|user|icon)\/|_(crt|prsn)_/.test(src)
  ) {
    return src as T
  }

  const poster = src.split(REG_COVER)?.[2] || ''
  if (!poster || !initCDN()) return src

  return `${CDN_MAGMA}/pic/cover/l/${poster.split('?')[0]}${prefix ? `/${prefix}` : ''}`
}

/** MAGMA MONO CDN */
export const CDN_OSS_MAGMA_MONO = <T>(src?: T): T | string => {
  if (typeof src !== 'string' || src === '') return src as T

  const mono = (src.split('.jpg')?.[0] || '').split('/pic/')?.[1] || ''
  if (!mono || !initCDN()) return src

  return `${CDN_MAGMA}/pic/${mono.replace('/s/', '/g/')}.jpg`
}

/** MAGMA PIC CDN */
export const CDN_OSS_MAGMA_PIC = <T>(src?: T): T | string => {
  if (typeof src !== 'string' || src === '' || !src.includes('/pic/')) return src as T

  const pic = (src.split('.jpg')?.[0] || '').split('/pic/')?.[1] || ''
  if (!pic || !initCDN()) return src

  return `${CDN_MAGMA}/pic/${pic}.jpg`
}
