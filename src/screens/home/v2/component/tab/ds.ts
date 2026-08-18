/*
 * @Author: czy0729
 * @Date: 2024-01-06 01:29:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 01:34:56
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Tab')

export const COMPONENT_MAIN = rc(COMPONENT)

/** 初始布局，同步已知宽度避免冷启动 Pager 首帧位置闪烁 */
export const INITIAL_LAYOUT = { width: _.window.width }
