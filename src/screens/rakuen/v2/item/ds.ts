/*
 * @Author: czy0729
 * @Date: 2022-09-03 11:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 17:02:44
 */
import { _ } from '@stores'
import { Fn } from '@types'
import { memoStyles } from './styles'

/** 限制首次渲染项数 */
export const LIMIT_HEAVY = _.device(10, 20)

/** 回复数少于的数字, 判断为广告姬 */
export const AD_REPLIES_COUNT = 4

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
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
  isReaded: false as boolean,
  isGroup: false as boolean,
  onPress: (() => {}) as Fn
}
