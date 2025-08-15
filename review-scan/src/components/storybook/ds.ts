/*
 * @Author: czy0729
 * @Date: 2023-11-02 04:22:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:30:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Storybook')

const ITEM_DISCOVERY = {
  id: 'Discovery',
  params: {},
  icon: 'home',
  size: 16,
  label: '发现'
} as const

const ITEM_TIMELINE = {
  id: 'Timeline',
  params: {},
  icon: 'md-access-time',
  size: 18,
  label: '时间胶囊'
} as const

const ITEM_HOME = {
  id: 'Home',
  params: {},
  icon: 'md-star-outline',
  size: 22,
  label: '收藏'
} as const

const ITEM_RAKUEN = {
  id: 'Rakuen',
  params: {},
  icon: 'md-chat-bubble-outline',
  size: 17,
  label: '超展开'
} as const

const ITEM_SEARCH = {
  id: 'Search',
  params: {},
  icon: 'md-search',
  size: 22,
  label: '搜索'
} as const

export const BOTTOM_TAB_DS = [ITEM_DISCOVERY, ITEM_TIMELINE, ITEM_RAKUEN, ITEM_SEARCH] as const

export const BOTTOM_TAB_WITH_AUTH_DS = [
  ITEM_DISCOVERY,
  ITEM_TIMELINE,
  ITEM_HOME,
  ITEM_RAKUEN,
  ITEM_SEARCH
] as const
