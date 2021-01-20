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
 * @Last Modified time: 2021-01-21 00:55:50
 */
import { getTimestamp } from '@utils'
import { getSystemStoreAsync } from '@utils/async'
import _hash from '@utils/thirdParty/hash'
import hashSubject from '@constants/json/hash/subject.json'
import hashAvatar from '@constants/json/hash/avatar.json'
import { SDK } from './index'

export const HOST_CDN = 'https://cdn.jsdelivr.net'

/**
 * 获取设置
 */
export function getOTA() {
  return getSystemStoreAsync().ota
}

export const VERSION_STATIC = '20210113'
export const VERSION_RAKUEN = '20210113'
export const VERSION_AVATAR = '20210113'
export const VERSION_OSS = '20210113'
export const VERSION_SUBJECT = '20210113'
export const VERSION_MONO = '20201216'
export const VERSION_ANIME = '20201126'
export const VERSION_WENKU = '20200927'
export const VERSIONS_AVATAR = [
  '20201213',
  '20201018',
  '20200712',
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
  `${HOST_CDN}/gh/ekibun/bangumi_onair@master/calendar.json?t=${getTimestamp()}`

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
 * 头像CDN
 * @url https://github.com/czy0729/Bangumi-OSS
 */
const cacheAvatar = {}
export const CDN_OSS_AVATAR = src => {
  if (typeof src !== 'string') {
    return src
  }

  if (cacheAvatar[src]) {
    return cacheAvatar[src]
  }

  // 修正图片地址
  let _src = src.split('?')[0]
  if (_src.indexOf('https:') === -1 && _src.indexOf('http:') === -1) {
    _src = `https:${_src}`
  }
  _src = _src.replace('http://', 'https://')

  const _hash = hash(_src)
  if (_hash in hashAvatar) {
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

/**
 * 条目封面CDN
 * @url https://github.com/czy0729/Bangumi-OSS
 */
const cacheSubject = {}
export const CDN_OSS_SUBJECT = src => {
  if (typeof src !== 'string') {
    return src
  }

  if (cacheSubject[src]) {
    return cacheSubject[src]
  }

  // 修正图片地址
  let _src = src.split('?')[0]
  if (_src.indexOf('https:') === -1 && _src.indexOf('http:') === -1) {
    _src = `https:${_src}`
  }
  _src = _src.replace('http://', 'https://')

  const _hash = hash(_src)
  if (_hash in hashSubject) {
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
    parseInt(ota.VERSION_STATIC) > parseInt(VERSION_STATIC)
      ? ota.VERSION_STATIC
      : VERSION_STATIC

  return `${HOST_CDN}/gh/czy0729/Bangumi-Static@${version}/data/agefans/anime.json`
}

/**
 * 找文库数据
 * @url https://github.com/czy0729/Bangumi-Static
 * @param {*} version
 */
export const CDN_STATIC_WENKU = () => {
  const ota = getOTA()
  const version =
    parseInt(ota.VERSION_STATIC) > parseInt(VERSION_STATIC)
      ? ota.VERSION_STATIC
      : VERSION_STATIC

  return `${HOST_CDN}/gh/czy0729/Bangumi-Static@${version}/data/wenku8/wenku.json`
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
