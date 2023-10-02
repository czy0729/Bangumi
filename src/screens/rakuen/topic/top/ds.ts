/*
 * @Author: czy0729
 * @Date: 2022-08-28 13:21:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 15:32:03
 */
import { Navigation } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  topicId: '' as $['topicId'],
  title: '' as $['title'],
  subTitle: '' as $['subTitle'],
  time: '' as $['time'],
  replies: '' as $['params']['_replies'],
  group: '' as $['group'],
  groupHref: '' as $['groupHref'],
  groupThumb: '' as $['groupThumb'],
  groupThumbFallback: '' as $['groupThumb'],
  avatar: '' as $['avatar'],
  userId: '' as $['userId'],
  userName: '' as $['userName'],
  userSign: '' as $['userSign'],
  html: '' as $['html'],
  commentsLoaded: false as $['comments']['_loaded'],
  monoId: '' as $['monoId'],
  isMono: false as $['isMono'],
  delete: false as $['topic']['delete']
}
