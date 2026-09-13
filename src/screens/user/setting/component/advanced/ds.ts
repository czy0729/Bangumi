/*
 * @Author: czy0729
 * @Date: 2026-09-13 21:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 21:50:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Advanced')

export const TEXTS = {
  advanced: {
    hd: '高级',
    information: '源头跳转、Webhook、外部浏览器等进阶集成'
  },
  origin: {
    hd: '自定义源头',
    information: '给不同类型的条目，自定义通用跳转',
    search: '源头 跳转'
  },
  webhook: {
    hd: 'Webhook',
    information: '影响用户时间线的操作，允许通知外部自定义接口'
  },
  openInfo: {
    hd: '打开外部浏览器前复制网址',
    information: '开启会先停顿 300ms 再进行跳转'
  }
} as const
