/*
 * @Author: czy0729
 * @Date: 2024-02-29 23:54:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 时间线条目: 调试标识与封面尺寸
 */
import { rc } from '@utils/dev'
import { _ } from '@stores'
import { IMG_HEIGHT, IMG_WIDTH } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

/** 封面宽度 */
export const WIDTH = _.r(IMG_WIDTH / 1.1)

/** 封面高度 */
export const HEIGHT = _.r(IMG_HEIGHT / 1.1)
