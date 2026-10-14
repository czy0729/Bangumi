/*
 * @Author: czy0729
 * @Date: 2023-12-17 08:20:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 页面常量: 标签页数据
 */
export const COMPONENT = 'Character'

export const TABS = [
  {
    title: '虚拟角色',
    key: 'characters'
  },
  {
    title: '现实人物',
    key: 'persons'
  }
] as const

/** 自己的人物页多一个近况标签 */
export const TABS_SELF = [
  {
    title: '人物近况',
    key: 'recents'
  },
  ...TABS
] as const
