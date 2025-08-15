/*
 * @Author: czy0729
 * @Date: 2022-10-18 04:21:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-03 10:02:03
 */
import { _ } from '@stores'
import { EVENT, FROZEN_FN } from '@constants'
import { BlogId, Navigation, RakuenNewFloorStyleCn, TopicId, UserId } from '@types'
import { Props } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  extraStyle: {} as Props['extraStyle'],
  topicId: '' as TopicId | BlogId,
  authorId: '' as Props['authorId'],
  avatar: '' as Props['avatar'],
  blockKeywords: [] as any[],
  erase: '' as Props['erase'],
  filterDelete: true as boolean,
  floor: '' as Props['floor'],
  directFloor: false as boolean,
  id: 0 as Props['id'],
  isBlockUser: false as any,
  matchLink: false as boolean,
  message: '' as string,
  myFriendsMap: {} as Record<UserId, boolean>,
  postId: '' as Props['postId'],
  postUsersMap: {} as Record<UserId, any>,
  quote: true as boolean,
  quoteAvatar: true as boolean,
  wide: false as boolean,
  readedTime: '' as any,
  replySub: '' as Props['replySub'],
  time: '' as Props['time'],
  translate: '' as any,
  uid: '' as string,
  url: '' as string,
  userId: '' as Props['userId'],
  userName: '' as Props['userName'],
  formhash: '' as string,
  like: false as boolean,
  likeType: '' as string,
  newFloorStyle: '角标' as RakuenNewFloorStyleCn,
  event: EVENT,
  onJumpTo: FROZEN_FN,
  onLikesLongPress: FROZEN_FN,
  onShowFixedTextare: FROZEN_FN
}

export const REG_BGM = /^<img src="\/img\/smiles\/tv\/\d+\.gif" smileid="\d+" alt="\(bgm\d+\)">$/

export const REG_PLUS = /\+\d/

export const AVATAR_WIDTH = _.r(32)
