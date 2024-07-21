import { xhrCustom } from '@utils/fetch'
/*
 * 获取云端最新 avatar hash 和合并本地 fallback hash
 *
 * @Author: czy0729
 * @Date: 2022-05-23 06:55:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-22 04:24:01
 */
import { getStorage, setStorage } from '@utils/storage'
import { HOST_CDN } from '../constants'
import { getOTA, getVersion, hash } from './utils'
import { VERSION_AVATAR, VERSION_OSS } from './ds'

const HOST_OSS = `${HOST_CDN}/gh/czy0729/Bangumi-OSS`

const OTA_AVATAR_HASH_VERSION = '@cdn|oss-avatar-hash|version|210719'
const OTA_AVATAR_HASH_DATA = '@cdn|oss-avatar-hash|data|210719'
let cacheAvatar = {}
let hashAvatarOTA = {}
let hashAvatarLoaded = false

/** @deprecated 初始化所有云端头像 hash */
export const initHashAvatarOTA = async () => {
  if (hashAvatarLoaded) return

  // 云端: 版本没有 OTA 高需要重新请求数据
  const version = (await getStorage(OTA_AVATAR_HASH_VERSION)) || VERSION_OSS
  const data = (await getStorage(OTA_AVATAR_HASH_DATA)) || {}

  const ota = getOTA()
  const needUpdate =
    (!hashAvatarLoaded && !Object.keys(data).length) ||
    parseInt(ota.VERSION_OSS) > parseInt(version)

  // 没缓存也要请求数据
  if (needUpdate || !Object.keys(data).length) {
    try {
      hashAvatarLoaded = true

      const version = getVersion('VERSION_OSS', VERSION_OSS)
      const { _response } = await xhrCustom({
        url: `${HOST_OSS}@${version}/hash/avatar.json`
      })

      // 更新了数据需要重置 cache
      hashAvatarOTA = {
        ...hashAvatarOTA,
        ...JSON.parse(_response)
      }
      cacheAvatar = {}

      setStorage(OTA_AVATAR_HASH_VERSION, version)
      setStorage(OTA_AVATAR_HASH_DATA, hashAvatarOTA)
    } catch (error) {
      // 404
      hashAvatarLoaded = true
    }
    return
  }

  // 有缓存直接返回
  hashAvatarLoaded = true
  hashAvatarOTA = {
    ...hashAvatarOTA,
    ...data
  }
  cacheAvatar = {}
}

/** @deprecated 返回云端头像 hash */
export const getHashAvatarOTA = () => hashAvatarOTA

/** @deprecated 头像CDN */
export const CDN_OSS_AVATAR = (src: any) => {
  if (typeof src !== 'string') return src
  if (cacheAvatar[src]) return cacheAvatar[src]

  // 修正图片地址
  let _src = src.split('?')[0]
  if (_src.indexOf('https:') === -1 && _src.indexOf('http:') === -1) {
    _src = `https:${_src}`
  }
  _src = _src.replace('http://', 'https://')

  const _hash = hash(_src)
  if (_hash in hashAvatarOTA) {
    const version = getVersion('VERSION_AVATAR', VERSION_AVATAR)
    const path = _hash.slice(0, 1).toLocaleLowerCase()
    const cdnSrc = `${HOST_OSS}@${version}/data/avatar/m/${path}/${_hash}.jpg`
    if (hashAvatarLoaded) cacheAvatar[src] = cdnSrc
    return cdnSrc
  }

  if (hashAvatarLoaded) cacheAvatar[src] = src
  return src
}
