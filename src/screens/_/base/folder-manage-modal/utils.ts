/*
 * @Author: czy0729
 * @Date: 2024-08-01 23:13:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 06:30:00
 *
 * 目录管理弹窗工具函数
 */
import { HTMLDecode } from '@utils'

export function fixedOrder(order: string) {
  const _order = Number(order)
  return Number.isNaN(_order) ? 10 : _order
}

/** 从删除楼层链接提取 formhash */
export function getFormhash(url?: string) {
  return url?.split('?gh=')[1]
}

/** 解码楼层内容 (去 <br>) */
export function decodeContent(value?: string) {
  return HTMLDecode(value || '').replace(/<br>/g, '')
}
