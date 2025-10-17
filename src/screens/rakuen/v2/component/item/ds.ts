/*
 * @Author: czy0729
 * @Date: 2022-09-03 11:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 23:31:28
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { TopicId, UserId } from '@types'
import type { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Item')

export const COMPONENT_MAIN = rc(COMPONENT)

/** 限制首次渲染项数 */
export const LIMIT_HEAVY = _.device(12, 20)

/** 项高度 */
export const ITEM_HEIGHT = 60

/** 回复数少于的数字, 判断为广告姬 */
export const AD_REPLIES_COUNT = 4

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  index: 0 as number,
  avatar: '' as string,
  userId: '' as UserId,
  userName: '' as string,
  groupHref: '' as string,
  groupCn: '' as string,
  href: '' as string,
  title: '' as string,
  time: '' as string,
  topicId: '' as TopicId,
  replyCount: 0 as number,
  isGroup: false as boolean,
  onPress: FROZEN_FN
}
