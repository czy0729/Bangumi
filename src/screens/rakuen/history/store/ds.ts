/*
 * @Author: czy0729
 * @Date: 2023-07-03 10:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-01 18:36:12
 */
import { COMPONENT } from '../ds'

import type { Topic } from '@stores/rakuen/types'
import type { Loaded } from '@types'
import type { DS } from '../ds'
import type { CollectRankItem, CollectRankSort } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  page: 0,
  replyPage: 0,
  ipt: '1',
  show: true,
  topics: {} as Record<`favor_${string}`, Topic>,
  collectRank: [] as CollectRankItem[],
  collectRankSort: '收藏数' as CollectRankSort,
  type: '小组' as (typeof DS)[number],

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

export const COMMENT_LIMIT = 3

export const COMMENT_LIMIT_ADVANCE = 10
