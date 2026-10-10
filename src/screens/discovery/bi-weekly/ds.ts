/*
 * @Author: czy0729
 * @Date: 2024-05-14 04:47:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 11:00:00
 *
 * 组件名、数据源地址、文章类型与埋点事件名
 */
import { HOST_DOGE } from '@constants'

export const COMPONENT = 'BiWeekly'

export const URL_SOURCE = `${HOST_DOGE}/biweekly.json`

export const TYPE_DS = ['文章', '目录'] as const

export const EVENT = {
  /** 右上角菜单 */
  menu: '半月刊.右上角菜单',

  /** 帖子跳转 */
  id: '半月刊.跳转'
} as const
