/*
 * @Author: czy0729
 * @Date: 2026-09-16 22:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 22:40:00
 *
 * 圆环进度的模块级常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'CircularProgress')

/** 不确定态旋转一圈的时长 (毫秒) */
export const SPIN_DURATION = 1000

/** 不确定态显示的弧长占比 (四分之一圈) */
export const INDETERMINATE_PERCENT = 25

/** 轨道透明度 (进度弧为全色, 轨道淡一些形成层次) */
export const TRACK_OPACITY = 0.28
