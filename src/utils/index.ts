/*
 * @Author: czy0729
 * @Date: 2019-02-21 20:36:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-19 07:18:55
 */
import {
  arrGroup,
  asc,
  cleanQ,
  copy,
  date,
  debounce,
  desc,
  formatNumber,
  getTimestamp,
  gradientColor,
  isObject,
  lastDate,
  omit,
  open,
  pad,
  parseIOS8601,
  pick,
  queue,
  random,
  randomn,
  runAfter,
  safeObject,
  similar,
  simpleTime,
  sleep,
  throttle,
  titleCase,
  toFixed,
  trim,
  urlStringify
} from './utils'

import {
  appNavigate,
  appRandom,
  bootApp,
  caculateICO,
  cnjp,
  correctAgo,
  findSubjectCn,
  fixedBgmUrl,
  formatTime,
  getBangumiUrl,
  getCookie,
  getCoverLarge,
  getCoverMedium,
  getCoverSmall,
  getOnAir,
  getRating,
  getSetting,
  getType,
  getWeekDay,
  keyExtractor,
  matchBgmLink,
  matchCoverUrl,
  navigationReference,
  tinygrailFixedTime,
  tinygrailOSS,
  unzipBangumiData,
  x18,
  x18s,
  privacy
} from './app'

import { getStorage, setStorage } from './storage'

/**
 * utils
 */
export {
  arrGroup,
  asc,
  cleanQ,
  copy,
  date,
  debounce,
  desc,
  formatNumber,
  getTimestamp,
  gradientColor,
  isObject,
  lastDate,
  omit,
  open,
  pad,
  parseIOS8601,
  pick,
  queue,
  random,
  randomn,
  runAfter,
  safeObject,
  similar,
  simpleTime,
  sleep,
  throttle,
  titleCase,
  toFixed,
  trim,
  urlStringify
}

/**
 * app
 */
export {
  appNavigate,
  appRandom,
  bootApp,
  caculateICO,
  cnjp,
  correctAgo,
  findSubjectCn,
  fixedBgmUrl,
  formatTime,
  getBangumiUrl,
  getCookie,
  getCoverLarge,
  getCoverMedium,
  getCoverSmall,
  getOnAir,
  getRating,
  getSetting,
  getType,
  getWeekDay,
  keyExtractor,
  matchBgmLink,
  matchCoverUrl,
  navigationReference,
  tinygrailFixedTime,
  tinygrailOSS,
  unzipBangumiData,
  x18,
  x18s,
  privacy
}

/**
 * storage
 */
export { getStorage, setStorage }
