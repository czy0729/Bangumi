/*
 * @Author: czy0729
 * @Date: 2022-10-18 04:21:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-01 11:52:49
 */
import { EVENT } from '@constants'
import { Navigation, TopicId, UserId } from '@types'
import { Props } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  topicId: '' as TopicId,
  authorId: '' as Props['authorId'],
  avatar: '' as Props['avatar'],
  blockKeywords: [] as any[],
  erase: '' as Props['erase'],
  filterDelete: true as boolean,
  floor: '' as Props['floor'],
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
  showFixedTextare: false as boolean,
  time: '' as Props['time'],
  translate: '' as any,
  uid: '' as string,
  url: '' as string,
  userId: '' as Props['userId'],
  userName: '' as Props['userName'],
  formhash: '' as string,
  likeType: '' as string,
  event: EVENT
}

export const REG_BGM =
  /^<img src="\/img\/smiles\/tv\/\d+\.gif" smileid="\d+" alt="\(bgm\d+\)">$/

export const REG_PLUS = /\+\d/

export const AVATAR_WIDTH = 32
