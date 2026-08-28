/*
 * @Author: czy0729
 * @Date: 2024-01-30 23:04:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 00:33:21
 */
import type { Loaded, UserId } from '@types'
import type { INIT_SETTING, LOADED } from './init'

export type CacheKey = keyof typeof LOADED

/**
 * 打赏记录值
 *  - "渠道|金额" 字符串 (如 "a|15")
 *  - 1: 老用户或特殊关照标记
 */
export type Advance = string | number

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

export type ServerStatus = {
  message: string
  status: 'ok' | 'degraded' | 'down' | ''
  _loaded: Loaded
}
