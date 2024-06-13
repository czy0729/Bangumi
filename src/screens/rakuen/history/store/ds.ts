/*
 * @Author: czy0729
 * @Date: 2023-07-03 10:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-05 20:32:04
 */
import { Loaded } from '@types'
import { COMPONENT, DS } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  page: 0,
  replyPage: 0,
  ipt: '1',
  show: true,
  topics: {},
  type: '小组' as (typeof DS)[number],
  _loaded: false as Loaded
}

export const COMMENT_LIMIT = 3

export const COMMENT_LIMIT_ADVANCE = 10
