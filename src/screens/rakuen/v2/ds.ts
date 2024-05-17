/*
 * @Author: czy0729
 * @Date: 2022-09-03 05:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 20:03:45
 */
import { _ } from '@stores'
import { IOS, PAD, RAKUEN_TYPE } from '@constants'

export const COMPONENT = 'Rakuen'

export const H_TABBAR = 48 + (IOS && PAD ? _.statusBarHeight : 0)

export const TABS = RAKUEN_TYPE.map(item => ({
  title: item.label,
  key: item.value
})).filter(item => !!item.title)

/** 每次预读取未读帖子数量 */
export const PREFETCH_COUNT = 20

export const TEXT_BLOCK_USER = '屏蔽用户'

export const TEXT_IGNORE_USER = '绝交'
