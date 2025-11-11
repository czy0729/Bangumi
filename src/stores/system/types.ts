/*
 * @Author: czy0729
 * @Date: 2024-01-30 23:04:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-13 20:59:54
 */
import type { UserId } from '@types'
import type { INIT_SETTING, LOADED } from './init'

export type CacheKey = keyof typeof LOADED

/**
 * - true 显示
 * - false 折叠
 * - -1 永久隐藏
 */
export type LayoutValue = true | false | -1

export type HomeTabsKeys = 'Discovery' | 'Timeline' | 'Home' | 'Rakuen' | 'User' | 'Tinygrail'

export type HomeRenderTabs = HomeTabsKeys[]

export type HomeTabs = ('all' | 'anime' | 'book' | 'real')[]

export type UserRemark = Record<
  /** 需要使用数字 ID */
  UserId,
  string
>

export type TrackIds = UserId[]

export type LikeRec = (1 | 0)[]

export type Setting = typeof INIT_SETTING

export type SettingKeys = keyof Setting
