/*
 * @Author: czy0729
 * @Date: 2022-11-11 07:02:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-06 19:36:39
 */

/** 取等级 */
export function lv(item: { cLevel?: any; level?: any }) {
  return item.cLevel || item.level || 1
}

/** 取排名 */
export function rk(item: { rank?: any }) {
  return item.rank || 501
}

/** 取头像 */
export function cover(item: { cover?: any; icon?: any }) {
  return item.cover || item.icon || ''
}

/** 取活股 */
export function assets(item: { state?: any; assets?: any }) {
  return item.state || item.assets || 0
}

/** 取精炼 */
export function refine(item: { refine?: any }) {
  return item.refine || 0
}

/** 取补充数量 */
export function charge(item: { sacrifices?: any; assets?: any }) {
  return (item.sacrifices || 0) - (item.assets || 0)
}

/** 判断文字颜色 */
export function bottomTextType(changeText: string = '') {
  return changeText.includes('+') ? 'bid' : 'ask'
}
