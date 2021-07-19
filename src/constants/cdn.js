/*
 * jsDelivr CDN
 *  - 每日放送
 *  - 上映中动画单集数据源
 *  - 条目、角色、小组静态数据
 *  - 发现首页、年鉴静态数据
 *  - 头像、条目封面对象存储
 *
 * @Author: czy0729
 * @Date: 2020-01-17 11:59:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-19 16:20:21
 */
import { getTimestamp, getStorage, setStorage } from '@utils'
import { getSystemStoreAsync } from '@utils/async'
import { xhrCustom } from '@utils/fetch'
import _hash from '@utils/thirdParty/hash'
import hashSubject from '@constants/json/hash/subject.min.json'
import hashAvatar from '@constants/json/hash/avatar.min.json'
import { SDK } from './index'

export const HOST_CDN = 'https://cdn.jsdelivr.net'

/**
 * 获取设置
 */
export function getOTA() {
  return getSystemStoreAsync().ota
}

export const VERSION_STATIC = '20210627'
export const VERSION_RAKUEN = '20210607'
export const VERSION_AVATAR = '20210609'
export const VERSION_OSS = '20210611'
export const VERSION_SUBJECT = '20210607'
export const VERSION_MONO = '20201216'
export const VERSION_ANIME = '20210628'
export const VERSION_WENKU = '20210627'
export const VERSION_MANGA = '20210628'
export const VERSION_HENTAI = '20210630'
export const VERSION_GAME = '20210630'
export const VERSION_TINYGRAIL = '20210720'

export const VERSIONS_AVATAR = [
  '20210609',
  '20210410',
  '20201018',
  '20200502',
  '1.0.2'
]

/**
 * 对图片完整地址进行哈希计算
 */
export const hash = _hash

/**
 * 每日放送
 * @url https://github.com/ekibun/bangumi_onair
 */
export const CDN_ONAIR = () =>
  `${HOST_CDN}/gh/ekibot/bangumi-onair@master/calendar.json?t=${getTimestamp()}`

/**
 * 单集数据源
 * @url https://github.com/ekibun/bangumi_onair
 * @param {*} subjectId
 */
export const CDN_EPS = subjectId =>
  `${HOST_CDN}/gh/ekibun/bangumi_onair@master/onair/${parseInt(
    parseInt(subjectId) / 1000
  )}/${subjectId}.json?t=${getTimestamp()}`

/**
 * 条目CDN自维护数据
 * @url https://github.com/czy0729/Bangumi-Subject
 * @param {*} subjectId
 */
export const CDN_SUBJECT = subjectId => {
  const ota = getOTA()
  const version =
    parseInt(ota.VERSION_SUBJECT) > parseInt(VERSION_SUBJECT)
      ? ota.VERSION_SUBJECT
      : VERSION_SUBJECT

  return `${HOST_CDN}/gh/czy0729/Bangumi-Subject@${version}/data/${parseInt(
    parseInt(subjectId) / 100
  )}/${subjectId}.json`
}

/**
 * 角色CDN自维护数据
 * @url https://github.com/czy0729/Bangumi-Mono
 * @param {int} monoId
 * @param {string} type data | person
 */
export const CDN_MONO = (monoId, type = 'data') => {
  const ota = getOTA()
  const version =
    parseInt(ota.VERSION_MONO) > parseInt(VERSION_MONO)
      ? ota.VERSION_MONO
      : VERSION_MONO

  return `${HOST_CDN}/gh/czy0729/Bangumi-Mono@${version}/${type}/${parseInt(
    parseInt(monoId) / 100
  )}/${monoId}.json`
}

/**
 * 超展开小组CDN自维护数据
 * @url https://github.com/czy0729/Bangumi-Rakuen
 * @param {*} topicId
 * @param {*} type topic | comment
 */
export const CDN_RAKUEN = (topicId, type = 'topic') => {
  const ota = getOTA()
  const version =
    parseInt(ota.VERSION_RAKUEN) > parseInt(VERSION_RAKUEN)
      ? ota.VERSION_RAKUEN
      : VERSION_RAKUEN

  return `${HOST_CDN}/gh/czy0729/Bangumi-Rakuen@${version}/data/${type}/${parseInt(
    parseInt(topicId) / 100
  )}/${topicId}.json`
}

/**
 * 某用户的超展开
 * @url https://github.com/czy0729/Bangumi-Rakuen
 * @param {*} userId
 */
export const CDN_RAKUEN_USER_TOPICS = userId => {
  const ota = getOTA()
  const version =
    parseInt(ota.VERSION_RAKUEN) > parseInt(VERSION_RAKUEN)
      ? ota.VERSION_RAKUEN
      : VERSION_RAKUEN

  return `${HOST_CDN}/gh/czy0729/Bangumi-Rakuen@${version}/data/user/${String(
    userId
  ).slice(0, 1)}/${userId}.json`
}

/**
 * 发现首页
 * @url https://github.com/czy0729/Bangumi-Static
 * @param {*} version
 */
export const CDN_DISCOVERY_HOME = () => {
  const ota = getOTA()
  const version =
    parseInt(ota.VERSION_STATIC) > parseInt(VERSION_STATIC)
      ? ota.VERSION_STATIC
      : VERSION_STATIC

  return `${HOST_CDN}/gh/czy0729/Bangumi-Static@${version}/data/discovery/home.json`
}

/**
 * 找番剧数据
 * @url https://github.com/czy0729/Bangumi-Static
 * @param {*} version
 */
export const CDN_STATIC_ANIME = () => {
  const ota = getOTA()
  const version =
    parseInt(ota.VERSION_ANIME) > parseInt(VERSION_ANIME)
      ? ota.VERSION_ANIME
      : VERSION_ANIME

  return `${HOST_CDN}/gh/czy0729/Bangumi-Static@${version}/data/agefans/anime.min.json`
}

/**
 * 找文库数据
 * @url https://github.com/czy0729/Bangumi-Static
 * @param {*} version
 */
export const CDN_STATIC_WENKU = () => {
  const ota = getOTA()
  const version =
    parseInt(ota.VERSION_WENKU) > parseInt(VERSION_WENKU)
      ? ota.VERSION_WENKU
      : VERSION_WENKU

  return `${HOST_CDN}/gh/czy0729/Bangumi-Static@${version}/data/wenku8/wenku.min.json`
}

/**
 * 找漫画数据
 * @url https://github.com/czy0729/Bangumi-Static
 * @param {*} version
 */
export const CDN_STATIC_MANGA = () => {
  const ota = getOTA()
  const version =
    parseInt(ota.VERSION_MANGA) > parseInt(VERSION_MANGA)
      ? ota.VERSION_MANGA
      : VERSION_MANGA

  return `${HOST_CDN}/gh/czy0729/Bangumi-Static@${version}/data/manhuadb/manga.min.json`
}

/**
 * 找 Hentai 数据
 * @url https://github.com/czy0729/Bangumi-Static
 * @param {*} version
 */
export const CDN_STATIC_HENTAI = () => {
  const ota = getOTA()
  const version =
    parseInt(ota.VERSION_HENTAI) > parseInt(VERSION_HENTAI)
      ? ota.VERSION_HENTAI
      : VERSION_HENTAI

  return `${HOST_CDN}/gh/czy0729/Bangumi-Static@${version}/data/h/hentai.min.json`
}

/**
 * 找游戏数据
 * @url https://github.com/czy0729/Bangumi-Game
 * @param {*} version
 */
export const CDN_STATIC_GAME = () => {
  const ota = getOTA()
  const version =
    parseInt(ota.VERSION_GAME) > parseInt(VERSION_GAME)
      ? ota.VERSION_GAME
      : VERSION_GAME

  return `${HOST_CDN}/gh/czy0729/Bangumi-Game@${version}/data/game.min.json`
}

/**
 * 年鉴
 * @url https://github.com/czy0729/Bangumi-Static
 */
export const CDN_AWARD = year => {
  const ota = getOTA()
  const version =
    parseInt(ota.VERSION_STATIC) > parseInt(VERSION_STATIC)
      ? ota.VERSION_STATIC
      : VERSION_STATIC

  return `${HOST_CDN}/gh/czy0729/Bangumi-Static@${version}/data/award/${year}${
    SDK >= 36 ? '.expo' : ''
  }.json`
}

export const CDN_HD = subjectId => {
  const ota = getOTA()
  return `${HOST_CDN}/${ota.SITE_HD}/${subjectId}/index.json`
}

export const CDN_HD_OBJECT = (subjectId, vol) => {
  const ota = getOTA()
  return `${HOST_CDN}/${ota.SITE_HD}/${subjectId}/${vol}/cover.jpg`
}

export const CDN_GAME = (subjectId, index) =>
  `${HOST_CDN}/gh/czy0729/Bangumi-Game@${VERSION_GAME}/preview/${parseInt(
    parseInt(subjectId) / 100
  )}/${subjectId}/${index}.jpg`

/* ==================== 获取云端最新 avatar hash 和合并本地 fallback hash ==================== */
let cacheAvatar = {}
let hashAvatarOTA = hashAvatar
let hashAvatarLoaded = false
const hashAvatarOTAVersionKey = '@cdn|oss-avatar-hash|version|210719'
const hashAvatarOTADataKey = '@cdn|oss-avatar-hash|data|210719'
export const initHashAvatarOTA = async () => {
  if (hashAvatarLoaded) return

  // 云版本
  // 版本没有 OTA 高需要重新请求数据
  const version = (await getStorage(hashAvatarOTAVersionKey)) || VERSION_OSS
  const data = (await getStorage(hashAvatarOTADataKey)) || []

  const ota = getOTA()
  const needUpdate =
    (!hashAvatarLoaded && !Object.keys(data).length) ||
    parseInt(ota.VERSION_OSS) > parseInt(version)

  // 没缓存也要请求数据
  if (needUpdate || !Object.keys(data).length) {
    try {
      hashAvatarLoaded = true

      const version =
        parseInt(ota.VERSION_OSS) > parseInt(VERSION_OSS)
          ? ota.VERSION_OSS
          : VERSION_OSS
      const { _response } = await xhrCustom({
        url: `${HOST_CDN}/gh/czy0729/Bangumi-OSS@${version}/hash/avatar.json`
      })

      // 更新了数据需要重置cache
      hashAvatarOTA = JSON.parse(_response)
      cacheAvatar = {}
      setStorage(hashAvatarOTAVersionKey, version)
      setStorage(hashAvatarOTADataKey, hashAvatarOTA)
    } catch (error) {
      // 404
      hashAvatarLoaded = true
    }
    return
  }

  // 有缓存直接返回
  hashAvatarLoaded = true
  hashAvatarOTA = data
  cacheAvatar = {}
}

export const getHashAvatarOTA = () => hashAvatarOTA

/**
 * 头像CDN
 * @url https://github.com/czy0729/Bangumi-OSS
 */
export const CDN_OSS_AVATAR = src => {
  initHashAvatarOTA()

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
    const ota = getOTA()
    const version =
      parseInt(ota.VERSION_AVATAR) > parseInt(VERSION_AVATAR)
        ? ota.VERSION_AVATAR
        : VERSION_AVATAR

    const path = _hash.slice(0, 1).toLocaleLowerCase()
    const cdnSrc = `${HOST_CDN}/gh/czy0729/Bangumi-OSS@${version}/data/avatar/m/${path}/${_hash}.jpg`
    cacheAvatar[src] = cdnSrc
    return cdnSrc
  }

  cacheAvatar[src] = src
  return src
}

/* ==================== 获取云端最新 subject hash 和合并本地 fallback hash ==================== */
let cacheSubject = {}
let hashSubjectOTA = hashSubject
let hashSubjectLoaded = false
const hashSubjectOTAVersionKey = '@cdn|oss-subject-hash|version|210719'
const hashSubjectOTADataKey = '@cdn|oss-subject-hash|data|210719'
export const initHashSubjectOTA = async () => {
  if (hashSubjectLoaded) return

  // 云版本
  // 版本没有 OTA 高需要重新请求数据
  const version = (await getStorage(hashSubjectOTAVersionKey)) || VERSION_OSS
  const data = (await getStorage(hashSubjectOTADataKey)) || []

  const ota = getOTA()
  const needUpdate =
    (!hashSubjectLoaded && !Object.keys(data).length) ||
    parseInt(ota.VERSION_OSS) > parseInt(version)

  // 没缓存也要请求数据
  if (needUpdate || !Object.keys(data).length) {
    try {
      hashSubjectLoaded = true

      const version =
        parseInt(ota.VERSION_OSS) > parseInt(VERSION_OSS)
          ? ota.VERSION_OSS
          : VERSION_OSS
      const { _response } = await xhrCustom({
        url: `${HOST_CDN}/gh/czy0729/Bangumi-OSS@${version}/hash/subject.json`
      })

      // 更新了数据需要重置cache
      hashSubjectOTA = JSON.parse(_response)
      cacheSubject = {}
      setStorage(hashSubjectOTAVersionKey, version)
      setStorage(hashSubjectOTADataKey, hashSubjectOTA)
    } catch (error) {
      // 404
      hashSubjectLoaded = true
    }
    return
  }

  // 有缓存直接返回
  hashSubjectLoaded = true
  hashSubjectOTA = data
  cacheSubject = {}
}

export const getHashSubjectOTA = () => hashSubjectOTA

/**
 * 条目封面CDN
 * @url https://github.com/czy0729/Bangumi-OSS
 */
export const CDN_OSS_SUBJECT = src => {
  initHashSubjectOTA()

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
      parseInt(ota.VERSION_OSS) > parseInt(VERSION_OSS)
        ? ota.VERSION_OSS
        : VERSION_OSS

    const path = _hash.slice(0, 1).toLocaleLowerCase()
    const cdnSrc = `${HOST_CDN}/gh/czy0729/Bangumi-OSS@${version}/data/subject/c/${path}/${_hash}.jpg`
    cacheSubject[src] = cdnSrc
    return cdnSrc
  }

  cacheSubject[src] = src
  return src
}

/* ==================== tinygrail xsb relation ==================== */
let xsbRelationOTA = {
  name: {},
  data: {},
  relation: {}
}
let xsbRelationLoaded = false
const xsbRelationOTAVersionKey = '@cdn|oss-xsb-relation|version|210719'
const xsbRelationOTADataKey = '@cdn|oss-xsb-relation|data|210719'
export const initXsbRelationOTA = async () => {
  if (xsbRelationLoaded) return

  // 云版本
  // 版本没有 OTA 高需要重新请求数据
  const version =
    (await getStorage(xsbRelationOTAVersionKey)) || VERSION_TINYGRAIL
  const data = (await getStorage(xsbRelationOTADataKey)) || {
    name: {},
    data: {},
    relation: {}
  }

  const ota = getOTA()
  const needUpdate =
    (!xsbRelationLoaded && !Object.keys(xsbRelationOTA.data).length) ||
    parseInt(ota.VERSION_TINYGRAIL) > parseInt(version)

  // 没缓存也要请求数据
  if (needUpdate || !Object.keys(data.data).length) {
    try {
      xsbRelationLoaded = true

      const version =
        parseInt(ota.VERSION_TINYGRAIL) > parseInt(VERSION_TINYGRAIL)
          ? ota.VERSION_TINYGRAIL
          : VERSION_TINYGRAIL
      const { _response } = await xhrCustom({
        url: `${HOST_CDN}/gh/czy0729/Bangumi-Static@${version}/data/tinygrail/relation.min.json`
      })

      xsbRelationOTA = JSON.parse(_response)
      setStorage(xsbRelationOTAVersionKey, version)
      setStorage(xsbRelationOTADataKey, xsbRelationOTA)
    } catch (error) {
      // 404
      xsbRelationLoaded = true
    }
    return
  }

  // 有缓存直接返回
  xsbRelationLoaded = true
  xsbRelationOTA = data
}

export const getXsbRelationOTA = () => xsbRelationOTA
