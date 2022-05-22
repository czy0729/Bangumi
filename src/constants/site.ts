/*
 * @Author: czy0729
 * @Date: 2020-12-03 19:23:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-20 10:08:37
 */
import { getSystemStoreAsync } from '@utils/async'

type OTAType = {
  [key: string]: string
}

/** 获取云端设置 */
export function getOTA(): OTAType {
  return getSystemStoreAsync().ota
}

/* ==================== 动漫 ==================== */
/** Age动漫 */
export const SITE_AGEFANS = () => {
  const ota = getOTA()
  return ota.SITE_AGEFANS || 'https://www.agemys.com/'
}

/** [已废弃] 迅播动漫 */
export const SITE_XUNBO = () => {
  const ota = getOTA()
  return ota.SITE_XUNBO || 'https://www.xbdm.org'
}

/* ==================== 三次元 ==================== */
/** [已废弃] 人人影视 */
export const SITE_RRYS = () => {
  const ota = getOTA()
  return ota.SITE_RRYS || 'http://www.rrys2020.com'
}

/* ==================== 文库 ==================== */
/** 文库吧 */
export const SITE_WK8 = () => {
  const ota = getOTA()
  return ota.SITE_WK8 || 'https://www.wenku8.net'
}

/* ==================== 漫画 ==================== */
/** [已废弃] */
export const SITE_77MH = () => {
  const ota = getOTA()
  return ota.SITE_77MH || 'https://so.77mh.de'
}

/** [已废弃] */
export const SITE_COMIC123 = () => {
  const ota = getOTA()
  return ota.SITE_COMIC123 || 'https://m.comic123.net'
}

/** 漫画DB */
export const SITE_MANHUADB = () => {
  const ota = getOTA()
  return ota.SITE_MANHUADB || 'https://www.manhuadb.com'
}

/** Mangabz */
export const SITE_MANGABZ = () => {
  const ota = getOTA()
  return ota.SITE_MANGABZ || 'https://www.mangabz.com'
}

/** [已废弃] */
export const SITE_MANHUA1234 = () => {
  const ota = getOTA()
  return ota.SITE_MANHUA1234 || 'https://m.mh1234.com'
}

/** https://wnacg.org */
export const SITE_WNACG = () => {
  const ota = getOTA()
  return ota.SITE_WNACG || 'https://wnacg.org'
}
