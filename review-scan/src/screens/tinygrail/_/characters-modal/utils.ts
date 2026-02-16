/*
 * @Author: czy0729
 * @Date: 2022-11-11 07:02:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-04 18:10:10
 */
import { getStorage, setStorage } from '@utils'
import { NAMESPACE } from './ds'

export function setLocal(state: object) {
  return setStorage(NAMESPACE, state)
}

export function getLocal() {
  return getStorage(NAMESPACE)
}

/** 取等级 */
export function lv(item: { cLevel?: number; level?: number }): number {
  return item.cLevel || item.level || 1
}

/** 取排名 */
export function rk(item: { rank?: number }): number {
  return item.rank || 501
}

/** 取头像 */
export function cover(item: { cover?: string; icon?: string }): string {
  return item.cover || item.icon || ''
}

/** 取活股 */
export function assets(item: { state?: number; assets?: number }): number {
  return item.state || item.assets || 0
}

/** 取精炼 */
export function refine(item: { refine?: number }): number {
  return item.refine || 0
}

/** 取补充数量 */
export function charge(item: { sacrifices?: number; assets?: number }): number {
  return (item.sacrifices || 0) - (item.assets || 0)
}

/** 判断文字颜色 */
export function bottomTextType(changeText: string = ''): 'bid' | 'ask' {
  return changeText?.includes('+') ? 'bid' : 'ask'
}
