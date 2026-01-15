/*
 * @Author: czy0729
 * @Date: 2022-09-03 05:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-15 14:28:36
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
