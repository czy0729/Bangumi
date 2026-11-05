/*
 * @Author: czy0729
 * @Date: 2026-11-05 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 热力图网格: 格子尺寸与刻度常量
 */
import { _ } from '@stores'

/** 单格边长 */
export const PX = _.r(12)

/** 单格间距 */
export const MARGIN = _.r(3)

/** 星期标签, 隔行展示 */
export const WEEK_DAYS = ['日', '二', '四', '六'] as const

/** 月份标签相对所在列的左偏移 */
export const MONTH_LABEL_OFFSET = 2
