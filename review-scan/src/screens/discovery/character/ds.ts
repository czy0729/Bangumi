/*
 * @Author: czy0729
 * @Date: 2023-12-17 08:20:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 16:55:39
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

export const TABS_SELF = [
  {
    title: '人物近况',
    key: 'recents'
  },
  ...TABS
] as const
