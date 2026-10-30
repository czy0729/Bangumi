/*
 * @Author: czy0729
 * @Date: 2022-09-03 11:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 帖子条目标识与常量
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { TopicId, UserId } from '@types'

export const COMPONENT = rc(PARENT, 'Item')

export const COMPONENT_MAIN = rc(COMPONENT)

/** 限制首次渲染项数 */
export const LIMIT_HEAVY = _.device(12, 20)

/** 项高度 */
export const ITEM_HEIGHT = 64

/** 回复数少于的数字, 判断为广告姬 */
export const AD_REPLIES_COUNT = 4

/** 打开帖子后更新已读记录的延时 */
export const DELAY_UPDATE_READED = 400

/** 跳转外部浏览器前的延时 */
export const DELAY_OPEN_URL = 800

export const DEFAULT_PROPS = {
  index: 0 as number,
  avatar: '' as string,
  userId: '' as UserId,
  userName: '' as string,
  groupHref: '' as string,
  groupCn: '' as string,
  href: '' as string,
  title: '' as string,
  time: '' as string,
  epoch: 0 as number,
  topicId: '' as TopicId,
  replyCount: 0 as number,
  isGroup: false as boolean,
  onPress: FROZEN_FN
}
