/*
 * @Author: czy0729
 * @Date: 2023-07-03 10:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 13:22:36
 */
import { Loaded } from '@types'
import { COMPONENT, DS } from '../ds'
import { CollectRankItem, CollectRankSort } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  page: 0,
  replyPage: 0,
  ipt: '1',
  show: true,
  topics: {},
  collectRank: [] as CollectRankItem[],
  collectRankSort: '收藏数' as CollectRankSort,
  type: '小组' as (typeof DS)[number],

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

export const COMMENT_LIMIT = 3

export const COMMENT_LIMIT_ADVANCE = 10
