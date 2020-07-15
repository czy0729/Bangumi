/* eslint-disable no-cond-assign, no-bitwise */
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
 * @Last Modified time: 2020-07-15 21:25:54
 */
import { getTimestamp } from '@utils'
import { getOTA } from '@utils/app'
import { SDK } from './index'
import { HASH_AVATAR, HASH_SUBJECT } from './hash'

export const HOST_CDN = 'https://cdn.jsdelivr.net'

const VERSION_MONO = '20200502'
const VERSION_SUBJECT = '20200615'
const VERSION_OSS = '20200615'
const VERSION_AVATAR = '20200712'
const VERSION_STATIC = '20200715'
const VERSION_RAKUEN = '20200712'

const I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split(
  ''
)
export function hash(input) {
  let hash = 5381
  let i = input.length - 1

  if (typeof input == 'string') {
    for (; i > -1; i -= 1) hash += (hash << 5) + input.charCodeAt(i)
  } else {
    for (; i > -1; i -= 1) hash += (hash << 5) + input[i]
  }
  let value = hash & 0x7fffffff

  let retValue = ''
  do {
    retValue += I64BIT_TABLE[value & 0x3f]
  } while ((value >>= 6))

  return retValue
}

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
 * 头像CDN
 * @url https://github.com/czy0729/Bangumi-OSS
 */
const avatarCache = {}
export const CDN_OSS_AVATAR = src => {
  if (typeof src !== 'string') {
    return src
  }

  if (avatarCache[src]) {
    return avatarCache[src]
  }

  // 修正图片地址
  let _src = src.split('?')[0]
  if (_src.indexOf('https:') === -1 && _src.indexOf('http:') === -1) {
    _src = `https:${_src}`
  }
  _src = _src.replace('http://', 'https://')

  /**
   * 计算图片hash, 之后查询在不在OSS缓存里面
   * 计算规则: 带https://开头, 使用/m/质量, 去掉?后面的参数
   */
  const _hash = hash(_src)
  if (_hash in HASH_AVATAR) {
    const ota = getOTA()
    const version =
      parseInt(ota.VERSION_AVATAR) > parseInt(VERSION_AVATAR)
        ? ota.VERSION_AVATAR
        : VERSION_AVATAR

    const path = _hash.slice(0, 1).toLocaleLowerCase()
    const cdnSrc = `${HOST_CDN}/gh/czy0729/Bangumi-OSS@${version}/data/avatar/m/${path}/${_hash}.jpg`
    avatarCache[src] = cdnSrc
    return cdnSrc
  }

  avatarCache[src] = src
  return src
}

/**
 * 条目封面CDN
 * @url https://github.com/czy0729/Bangumi-OSS
 */
const subjectCache = {}
export const CDN_OSS_SUBJECT = src => {
  if (typeof src !== 'string') {
    return src
  }

  if (subjectCache[src]) {
    return subjectCache[src]
  }

  // 修正图片地址
  let _src = src.split('?')[0]
  if (_src.indexOf('https:') === -1 && _src.indexOf('http:') === -1) {
    _src = `https:${_src}`
  }
  _src = _src.replace('http://', 'https://')

  /**
   * 计算图片hash, 之后查询在不在OSS缓存里面
   * 计算规则: 带https://开头, 使用/c/质量, 去掉?后面的参数
   */
  const _hash = hash(_src)
  if (_hash in HASH_SUBJECT) {
    const ota = getOTA()
    const version =
      parseInt(ota.VERSION_OSS) > parseInt(VERSION_OSS)
        ? ota.VERSION_OSS
        : VERSION_OSS

    const path = _hash.slice(0, 1).toLocaleLowerCase()
    const cdnSrc = `${HOST_CDN}/gh/czy0729/Bangumi-OSS@${version}/data/subject/c/${path}/${_hash}.jpg`
    subjectCache[src] = cdnSrc
    return cdnSrc
  }

  subjectCache[src] = src
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

  return `${HOST_CDN}/gh/czy0729/Bangumi-Static@${version}/data/discovery/index.json`
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
