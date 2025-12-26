/*
 * @Author: czy0729
 * @Date: 2022-09-03 05:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:38:31
 */
import { IOS, PAD, RAKUEN_TYPE } from '@constants'
import { STATUS_BAR_HEIGHT } from '@styles'

export const COMPONENT = 'Rakuen'

export const H_TABBAR = 48 + (IOS && PAD ? STATUS_BAR_HEIGHT : 0)

export const TABS = RAKUEN_TYPE.map(item => ({
  title: item.label,
  key: item.value
})).filter(item => !!item.title)

/** 每次预读取未读帖子数量 */
export const PREFETCH_COUNT = 20

export const TEXT_BLOCK_USER = '屏蔽用户'

export const TEXT_IGNORE_USER = '绝交'
