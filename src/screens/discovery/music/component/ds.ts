/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 00:00:00
 *
 * 找音乐页面私有组件共享常量
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Component')

/** 网格布局列数 (随横竖屏变化, 需在渲染期调用以保持响应) */
export const getColumnNum = () => _.portrait(_.device(3, 4), 5)
