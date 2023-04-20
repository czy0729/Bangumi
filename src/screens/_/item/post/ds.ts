/*
 * @Author: czy0729
 * @Date: 2022-06-14 23:11:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 21:19:38
 */
import { _ } from '@stores'
import { EVENT } from '@constants'
import { Navigation, TopicId } from '@types'
import { memoStyles } from './styles'
import { Props } from './types'

const AVATAR_WIDTH = 32

export const IMAGES_MAX_WIDTH = _.window.width - 2 * _.wind - AVATAR_WIDTH - _.sm

export const IMAGES_MAX_WIDTH_SUB =
  _.window.width - 2 * _.wind - 2 * AVATAR_WIDTH - 2 * _.sm

export const EXPAND_NUMS = 3

export const REG_MARK = /mark|mrak|cy|码|马|眼/i

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  inViewY: 0 as number,
  index: 0 as number,
  styles: {} as ReturnType<typeof memoStyles>,
  contentStyle: {} as Props['contentStyle'],
  topicId: '' as TopicId,
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
  expandNums: undefined,
  sub: [] as Props['sub'],
  time: '' as Props['time'],
  translate: '' as any,
  url: '' as string,
  userId: '' as Props['userId'],
  userName: '' as Props['userName'],
  userSign: '' as Props['userSign'],
  formhash: '' as string,
  likeType: '' as string,
  event: EVENT as Props['event'],
  onToggleExpand: (() => {}) as any
} as const
