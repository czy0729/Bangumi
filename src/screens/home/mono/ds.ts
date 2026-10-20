/*
 * @Author: czy0729
 * @Date: 2022-07-20 14:30:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 17:09:53
 *
 * COMPONENT 根常量与封面尺寸
 */
import { _ } from '@stores'

export const COMPONENT = 'Mono'

/** 封面宽度 */
export const COVER_WIDTH = _.r(64)

/** 封面高度, 按 1:1.28 取整 */
export const COVER_HEIGHT = Math.floor(COVER_WIDTH * 1.28)
