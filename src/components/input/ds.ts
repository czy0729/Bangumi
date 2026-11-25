/*
 * @Author: czy0729
 * @Date: 2024-01-14 15:32:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:34:52
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Input')

/** 一行的大概高度 */
export const INPUT_LINE_HEIGHT = 18

/** 清空按钮触摸区尺寸 */
export const CLEAR_SIZE = 32

/** 有清空按钮时输入框右侧留白, 避免文字被图标遮挡 */
export const CLEAR_PADDING_RIGHT = 28
