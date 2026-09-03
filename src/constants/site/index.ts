/*
 * @Author: czy0729
 * @Date: 2020-12-03 19:23:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:20:05
 */
import { getOTA } from '../cdn'

/* ==================== 动漫 ==================== */
/** Age动漫 */
export const SITE_AGEFANS = () => {
  const ota = getOTA()
  return ota.SITE_AGEFANS || 'https://www.agedm.io'
}

/* ==================== 文库 ==================== */
/** 文库吧 */
export const SITE_WK8 = () => {
  const ota = getOTA()
  return ota.SITE_WK8 || 'https://www.wenku8.net'
}

/* ==================== 漫画 ==================== */
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

/** https://wnacg.org */
export const SITE_WNACG = () => {
  const ota = getOTA()
  return ota.SITE_WNACG || 'https://wnacg.org'
}
