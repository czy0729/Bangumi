/*
 * @Author: czy0729
 * @Date: 2022-09-03 11:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 13:07:18
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

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
  userId: '' as string,
  userName: '' as string,
  groupHref: '' as string,
  groupCn: '' as string,
  href: '' as string,
  title: '' as string,
  time: '' as string,
  topicId: '' as string,
  replyCount: '' as string | number,
  isGroup: false as boolean,
  onPress: FROZEN_FN
}
