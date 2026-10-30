/*
 * @Author: czy0729
 * @Date: 2022-09-03 05:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 超展开页面常量
 */
import { IOS, PAD, RAKUEN_TYPE } from '@constants'
import { STATUS_BAR_HEIGHT } from '@styles'

export const COMPONENT = 'Rakuen'

export const H_TABBAR = 48 + (IOS && PAD ? STATUS_BAR_HEIGHT : 0)

export const TABS = RAKUEN_TYPE.map(item => ({
  title: item.label,
  key: item.value
})).filter(item => !!item.title)

/** 条目菜单项前缀: 进入 */
export const TEXT_PREFIX_ENTER = '进入'

/** 条目菜单项前缀: 屏蔽 */
export const TEXT_PREFIX_BLOCK = '屏蔽'

/** 每次预读取未读帖子数量 */
export const PREFETCH_COUNT = 20
