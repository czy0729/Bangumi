/*
 * @Author: czy0729
 * @Date: 2022-06-14 23:11:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-25 04:14:53
 */
import { _ } from '@stores'
import { EVENT } from '@constants'
import { Navigation } from '@types'
import { memoStyles } from './styles'
import { Props } from './types'

const AVATAR_WIDTH = 32

export const IMAGES_MAX_WIDTH = _.window.width - 2 * _.wind - AVATAR_WIDTH - _.sm

export const EXPAND_NUMS = 4

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  contentStyle: {} as Props['contentStyle'],
  authorId: '' as Props['authorId'],
  avatar: '' as Props['avatar'],
  erase: '' as Props['erase'],
  floor: '' as Props['floor'],
  id: 0 as Props['id'],
  isAuthor: false as boolean,
  isExpand: false as boolean,
  isFriend: false as boolean,
  isJump: false as boolean,
  isNew: false as boolean,
  matchLink: false as Props['matchLink'],
  msg: '' as string,
  postId: '' as Props['postId'],
  readedTime: '' as string,
  replySub: '' as Props['replySub'],
  showFixedTextare: (() => {}) as any,
  expandNums: EXPAND_NUMS as number,
  sub: [] as Props['sub'],
  time: '' as Props['time'],
  translate: '' as any,
  url: '' as string,
  userId: '' as Props['userId'],
  userName: '' as Props['userName'],
  userSign: '' as Props['userSign'],
  event: EVENT as Props['event'],
  onToggleExpand: (() => {}) as any
} as const
