/*
 * @Author: czy0729
 * @Date: 2020-12-03 19:23:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-11 21:47:36
 */
import { getSystemStoreAsync } from '@utils/async'

/**
 * 获取设置
 */
export function getOTA() {
  return getSystemStoreAsync().ota
}

export const SITE_AGEFANS = () => {
  const ota = getOTA()
  return ota.SITE_AGEFANS || 'https://agefans.net'
}

export const SITE_XUNBO = () => {
  const ota = getOTA()
  return ota.SITE_XUNBO || 'https://www.xbdm.org'
}

export const SITE_RRYS = () => {
  const ota = getOTA()
  return ota.SITE_RRYS || 'http://www.rrys2020.com'
}

export const SITE_WK8 = () => {
  const ota = getOTA()
  return ota.SITE_WK8 || 'https://www.wenku8.net'
}

export const SITE_77MH = () => {
  const ota = getOTA()
  return ota.SITE_77MH || 'https://so.77mh.cool'
}

export const SITE_COMIC123 = () => {
  const ota = getOTA()
  return ota.SITE_COMIC123 || 'https://m.comic123.net'
}

export const SITE_MANHUADB = () => {
  const ota = getOTA()
  return ota.SITE_MANHUADB || 'https://www.manhuadb.com'
}
