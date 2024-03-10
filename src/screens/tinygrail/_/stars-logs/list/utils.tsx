/*
 * @Author: czy0729
 * @Date: 2024-03-10 03:56:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 04:03:16
 */
import Log from '../log'

export function renderItem({ item, index }) {
  return <Log index={index} {...item} />
}
