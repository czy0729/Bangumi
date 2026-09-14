/*
 * @Author: czy0729
 * @Date: 2026-09-13 21:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Advanced')

export const TEXTS = {
  advanced: {
    hd: '高级',
    information: '时区、Webhook、外部浏览器等进阶设置'
  },
  /**
   * 时区实际渲染在面板内 (component/timezone)
   * 这里保留一份搜索关键词, 否则页内搜索「时区 / 时间」时高级卡片会被整体过滤掉
   */
  timezone: {
    hd: '设置时区',
    information: '影响帖子楼层时间、条目评论时间等的显示',
    search: '时区 时间'
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
