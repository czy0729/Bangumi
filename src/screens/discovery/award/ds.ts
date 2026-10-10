/*
 * @Author: czy0729
 * @Date: 2024-02-11 05:21:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:10:00
 *
 * 组件名、缓存命名空间与埋点事件名
 */
export const COMPONENT = 'Award'

export const NAMESPACE = `Screen${COMPONENT}`

export const EVENT = {
  /** 页面 */
  screen: '年鉴',

  /** 条目跳转 */
  id: '年鉴.跳转',

  /** 加载失败 */
  error: '年鉴.错误',

  /** 使用浏览器打开 */
  browser: '年鉴.浏览器打开'
} as const
