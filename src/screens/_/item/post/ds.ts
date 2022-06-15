/*
 * @Author: czy0729
 * @Date: 2022-06-14 23:11:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-14 23:15:40
 */
import { _ } from '@stores'
import { EVENT } from '@constants'

const AVATAR_WIDTH = 32

export const IMAGES_MAX_WIDTH = _.window.width - 2 * _.wind - AVATAR_WIDTH - _.sm

export const EXPAND_NUMS = 4

export const DEFAULT_PROPS = {
  navigation: {},
  styles: {},
  contentStyle: {},
  authorId: '',
  avatar: '',
  erase: '',
  floor: '',
  id: 0,
  isAuthor: false,
  isExpand: false,
  isFriend: false,
  isJump: false,
  isNew: false,
  matchLink: false,
  msg: '',
  postId: '',
  readedTime: '',
  replySub: '',
  showFixedTextare: false,
  sub: [],
  time: '',
  translate: '',
  url: '',
  userId: '',
  userName: '',
  userSign: '',
  event: EVENT,
  onToggleExpand: () => {}
} as const
