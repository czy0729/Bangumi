/*
 * @Author: czy0729
 * @Date: 2024-05-18 17:47:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-18 17:47:40
 */
import { ENTERING_EXITING_ANIMATIONS_NUM } from './ds'

export function keyExtractor(item: { id: any }, index: number) {
  return `${item.id}|${index < ENTERING_EXITING_ANIMATIONS_NUM}`
}
