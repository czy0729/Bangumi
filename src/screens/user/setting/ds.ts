/*
 * @Author: czy0729
 * @Date: 2024-01-10 20:32:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 21:40:00
 */
export const COMPONENT = 'Setting'

/**
 * 顶层分组
 *  - key 为滚动定位锚点 id, 与显示文案解耦, 改文案不会影响跳转定位
 * */
export const GROUPS = {
  appearance: '外观',
  language: '文字与语言',
  filter: '内容偏好',
  module: '页面模块',
  extra: '额外页面',
  system: '系统与网络',
  about: '关于与帮助'
} as const

export type GroupKey = keyof typeof GROUPS

/**
 * 外部跳转时指定要展开的设置项 (route.params.open) → 所属分组锚点
 *  - 用于进入页面后自动滚动到目标设置项所在分组
 * */
export const OPEN_GROUP: Record<string, GroupKey> = {
  // 内容偏好
  Track: 'filter',

  // 页面模块 (页面导航的 Tab 页面)
  Discovery: 'module',
  Timeline: 'module',
  Home: 'module',
  Rakuen: 'module',
  User: 'module',

  // 额外页面
  Subject: 'extra',
  Route: 'extra',
  Tinygrail: 'extra',

  // 系统与网络
  Worker: 'system',
  Advanced: 'system'
}
