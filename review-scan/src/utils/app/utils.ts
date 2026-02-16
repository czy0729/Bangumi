/*
 * @Author: czy0729
 * @Date: 2022-08-11 09:15:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-23 09:28:55
 */
import { AnyObject } from '@types'
import { asc } from '../utils'
import { syncSystemStore } from '../async'

/** 是否 null */
export function isNull(value: any) {
  return value === undefined || value === ''
}

/** 返回安全信息 */
export function getSafeValue(
  key: string | number,
  onAir: { [x: string]: any },
  onAirUser: { [x: string]: any }
) {
  const userValue = onAirUser?.[key]
  return isNull(userValue) ? onAir?.[key] : userValue
}

/** 参数转成字符串 */
export function getKeyString(...args: any[]) {
  return args.toString()
}

/** 对象键值排序 */
export function sortObject(object: AnyObject) {
  const newObject = {}
  Object.keys(object)
    .sort((a, b) => asc(a, b))
    .forEach(key => {
      newObject[key] = object[key]
    })
  return newObject
}

/** 获取设置 */
export function getSetting() {
  return syncSystemStore().setting
}
