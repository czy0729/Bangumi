/*
 * @Author: czy0729
 * @Date: 2024-01-14 03:01:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:21:17
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'InView')

/** 提前渲染的 y 轴距离 */
export const PRE_DISTANCE = _.window.height * 2
