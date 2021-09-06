/*
 * @Author: czy0729
 * @Date: 2020-12-03 19:23:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-09-06 18:15:59
 */
import { getSystemStoreAsync } from '@utils/async'

/**
 * 获取设置
 */
export function getOTA() {
  return getSystemStoreAsync().ota
}

/* ==================== 动漫 ==================== */
export const SITE_AGEFANS = () => {
  const ota = getOTA()
  return ota.SITE_AGEFANS || 'https://agefans.cc'
}

export const SITE_XUNBO = () => {
  const ota = getOTA()
  return ota.SITE_XUNBO || 'https://www.xbdm.org'
}

/* ==================== 三次元 ==================== */
export const SITE_RRYS = () => {
  const ota = getOTA()
  return ota.SITE_RRYS || 'http://www.rrys2020.com'
}

/* ==================== 文库 ==================== */
export const SITE_WK8 = () => {
  const ota = getOTA()
  return ota.SITE_WK8 || 'https://www.wenku8.net'
}

/* ==================== 漫画 ==================== */
export const SITE_77MH = () => {
  const ota = getOTA()
  return ota.SITE_77MH || 'https://so.77mh.de'
}

export const SITE_COMIC123 = () => {
  const ota = getOTA()
  return ota.SITE_COMIC123 || 'https://m.comic123.net'
}

export const SITE_MANHUADB = () => {
  const ota = getOTA()
  return ota.SITE_MANHUADB || 'https://www.manhuadb.com'
}

export const SITE_MANGABZ = () => {
  const ota = getOTA()
  return ota.SITE_MANGABZ || 'https://www.mangabz.com'
}

export const SITE_MANHUA1234 = () => {
  const ota = getOTA()
  return ota.SITE_MANHUA1234 || 'https://m.mh1234.com'
}

export const SITE_WNACG = () => {
  const ota = getOTA()
  return ota.SITE_WNACG || 'https://wnacg.org'
}
