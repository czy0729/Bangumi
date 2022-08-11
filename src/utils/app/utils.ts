/*
 * @Author: czy0729
 * @Date: 2022-08-11 09:15:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-11 09:37:52
 */

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
