/*
 * @Author: czy0729
 * @Date: 2020-12-03 19:23:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-03 19:33:00
 */

/**
 * 获取设置
 */
export function getOTA() {
  const systemStore = require('../stores/system').default
  const { ota } = systemStore
  return ota
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
  return ota.SITE_RRYS || 'https://www.wenku8.net'
}

export const SITE_77MH = () => {
  const ota = getOTA()
  return ota.SITE_RRYS || 'https://so.77mh.cool'
}

export const SITE_COMIC123 = () => {
  const ota = getOTA()
  return ota.SITE_RRYS || 'https://m.comic123.net'
}
