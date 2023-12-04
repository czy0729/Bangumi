/*
 * @Author: czy0729
 * @Date: 2023-12-03 21:42:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-03 21:43:00
 */
import devtools from 'devtools-detect'

/** 控制台是否开启 */
export function isDevtoolsOpen() {
  return devtools.isOpen
}
