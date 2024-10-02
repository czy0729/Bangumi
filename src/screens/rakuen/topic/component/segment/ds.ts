/*
 * @Author: czy0729
 * @Date: 2024-01-03 23:48:43
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-03 23:48:43
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Segement')

export const FILTER_ALL = '全部'

export const FILTER_POST = '跳转'

export const FILTER_FOLLOW = '关注'

export const FILTER_LIKES = '贴贴'

export const FILTER_ME = '我'

export const FILTER_FRIENDS = '好友'

export const FILTER_MAP = {
  follow: FILTER_FOLLOW,
  likes: FILTER_LIKES,
  me: FILTER_ME,
  friends: FILTER_FRIENDS
} as const
