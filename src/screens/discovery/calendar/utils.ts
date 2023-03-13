/*
 * @Author: czy0729
 * @Date: 2023-03-13 15:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-13 16:56:03
 */
export function getTime(item: any) {
  return String(item?.timeLocal || item?.timeCN || item?.timeJP || '2359')
}
