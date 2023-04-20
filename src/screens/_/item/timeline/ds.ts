/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:17:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 19:12:10
 */
import { _ } from '@stores'
import { EVENT } from '@constants'
import { UserId } from '@types'
import { memoStyles } from './styles'
import { Props } from './types'

export const AVATAR_WIDTH = 40

export const AVATAR_COVER_WIDTH = _.r(40)

export const HIDDEN_DS = ['1天不看TA', '3天不看TA', '7天不看TA', '重置']

export const DEFAULT_PROPS = {
  navigation: {} as Props['navigation'],
  styles: {} as ReturnType<typeof memoStyles>,
  style: {} as Props['style'],
  avatar: {} as Props['avatar'],
  userId: '' as UserId,
  p1: {} as Props['p1'],
  p2: {} as Props['p2'],
  p3: {
    text: [],
    url: []
  } as Props['p3'],
  p4: {} as Props['p4'],
  image: [] as Props['image'],
  comment: '' as Props['comment'],
  reply: {} as Props['reply'],
  time: '' as Props['time'],
  star: '' as Props['star'],
  subject: '' as Props['subject'],
  subjectId: 0 as Props['subjectId'],
  clearHref: '' as Props['clearHref'],
  index: 0 as number,
  event: EVENT as Props['event'],
  onDelete: (() => {}) as Props['onDelete'],
  onHidden: (() => {}) as Props['onHidden']
} as const
