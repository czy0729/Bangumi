/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:10:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:10:32
 *
 * 列表结构与分页上限
 */
import { WEB } from '../device'

import type { ListEmpty } from '@types'

export const USE_NATIVE_DRIVER = !WEB

/** App 列表数据结构 */
export const LIST_EMPTY: ListEmpty = {
  list: [],
  pagination: {
    page: 0,
    pageTotal: 0
  },

  /** 用于某些方法制造分页效果 */
  _list: [],
  _loaded: false as boolean | number
}

/** 用于制造分页数据 */
export const LIMIT_LIST = 100

/** 用于制造分页数据 (评论) */
export const LIMIT_LIST_COMMENTS = 24

/** 对评论数多的帖子进行网页跳转 */
export const LIMIT_TOPIC_PUSH = 500
