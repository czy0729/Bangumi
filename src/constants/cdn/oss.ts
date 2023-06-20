/*
 * 获取云端最新 subject hash 和合并本地 fallback hash
 *
 * @Author: czy0729
 * @Date: 2022-05-23 07:22:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 19:17:55
 */
import { getTimestamp } from '@utils/utils'
import { getStorage, setStorage } from '@utils/storage'
import { syncSystemStore } from '@utils/async'
import { xhrCustom } from '@utils/fetch'
import Crypto from '@utils/crypto'
import hashSubject from '@assets/json/hash/subject.min.json'
import { HOST_CDN } from '../constants'
import { HOST_CDN_FASTLY, HOST_CDN_ONEDRIVE, VERSION_OSS } from './ds'
import { hash, getOTA, getVersion } from './utils'

const HOST_OSS = `${HOST_CDN}/gh/czy0729/Bangumi-OSS`

const OTA_SUBJECT_HASH_VERSION = '@cdn|oss-subject-hash|version|210720'
const OTA_SUBJECT_HASH_DATA = '@cdn|oss-subject-hash|data|210720'
let cacheSubject = {}
let hashSubjectOTA = hashSubject
let hashSubjectLoaded = false

/** [待废弃] 初始化所有云端条目封面 hash */
export const initHashSubjectOTA = async () => {
  if (hashSubjectLoaded) return

  // 云版本
  // 版本没有 OTA 高需要重新请求数据
  const version = (await getStorage(OTA_SUBJECT_HASH_VERSION)) || VERSION_OSS
  const data = (await getStorage(OTA_SUBJECT_HASH_DATA)) || {}

  const ota = getOTA()
  const needUpdate =
    (!hashSubjectLoaded && !Object.keys(data).length) ||
    parseInt(ota.VERSION_OSS) > parseInt(version)

  // 没缓存也要请求数据
  if (needUpdate || !Object.keys(data).length) {
    try {
      hashSubjectLoaded = true

      const version = getVersion('VERSION_OSS', VERSION_OSS)
      const { _response } = await xhrCustom({
        url: `${HOST_OSS}@${version}/hash/subject.json`
      })

      // 更新了数据需要重置cache
      hashSubjectOTA = {
        ...hashSubjectOTA,
        ...JSON.parse(_response)
      }
      cacheSubject = {}

      setStorage(OTA_SUBJECT_HASH_VERSION, version)
      setStorage(OTA_SUBJECT_HASH_DATA, hashSubjectOTA)

      const systemStore = syncSystemStore()
      systemStore.setState({
        hashSubjectOTALoaded: getTimestamp()
      })
    } catch (error) {
      // 404
      hashSubjectLoaded = true
    }
    return
  }

  // 有缓存直接返回
  hashSubjectLoaded = true
  hashSubjectOTA = {
    ...hashSubjectOTA,
    ...data
  }
  cacheSubject = {}
}

/** [待废弃] 返回云端条目封面 hash */
export const getHashSubjectOTA = () => hashSubjectOTA

/** 条目封面 CDN */
export const CDN_OSS_SUBJECT = (src: any, cdnOrigin?: 'OneDrive' | 'fastly') => {
  if (typeof src !== 'string') return src
  if (cacheSubject[src]) return cacheSubject[src]

  // 修正图片地址
  let _src = src.split('?')[0]
  if (_src.indexOf('https:') === -1 && _src.indexOf('http:') === -1) {
    _src = `https:${_src}`
  }
  _src = _src.replace('http://', 'https://')

  const _hash = hash(_src)

  if (_hash in hashSubjectOTA) {
    const ota = getOTA()
    const version =
      parseInt(ota.VERSION_OSS) > parseInt(VERSION_OSS) ? ota.VERSION_OSS : VERSION_OSS

    const path = _hash.slice(0, 1).toLocaleLowerCase()
    let cdnSrc
    if (cdnOrigin === 'OneDrive') {
      cdnSrc = `${HOST_CDN_ONEDRIVE}/subject/c/${path}/${_hash}.jpg`
    } else if (cdnOrigin === 'fastly') {
      cdnSrc = `${HOST_CDN_FASTLY}/gh/czy0729/Bangumi-OSS@${version}/data/subject/c/${path}/${_hash}.jpg`
    } else {
      cdnSrc = `${HOST_OSS}@${version}/data/subject/c/${path}/${_hash}.jpg`
    }
    if (hashSubjectLoaded) cacheSubject[src] = cdnSrc
    return cdnSrc
  }

  if (hashSubjectLoaded) cacheSubject[src] = src
  return src
}

let CDN_MAGMA: string

/** MAGMA CDN */
export const CDN_OSS_MAGMA_POSTER = (
  mediumSrc: any = '',
  prefix: 'bgm_poster_100' | 'bgm_poster_200' | 'bgm_poster' | string = 'bgm_poster'
) => {
  if (
    typeof mediumSrc !== 'string' ||
    mediumSrc === '' ||
    !mediumSrc.includes('/c/') ||
    /\/(photo|user|icon)\/|_(crt|prsn)_/.test(mediumSrc)
  ) {
    return mediumSrc
  }

  const poster = mediumSrc.split('/c/')?.[1] || ''
  if (!poster) return mediumSrc

  if (!CDN_MAGMA) {
    CDN_MAGMA = Crypto.get(
      'U2FsdGVkX1+8XichzWKyMJq48Ovm7Py40o5JPSjNIH/MqOGILJbEY+ZBXG+d7TM5JHxxP0vuinOgBs4qCt7pyQ=='
    ) as string
  }
  if (!CDN_MAGMA) return mediumSrc

  return `${CDN_MAGMA}/pic/cover/l/${poster.split('?')[0]}${prefix ? `/${prefix}` : ''}`
}
