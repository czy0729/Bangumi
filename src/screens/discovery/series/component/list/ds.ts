/*
 * @Author: czy0729
 * @Date: 2024-04-02 17:04:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-02 17:26:49
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

/** 使用进场动画的最前项数 */
export const ENTERING_ANIMATIONS_NUM = 9
