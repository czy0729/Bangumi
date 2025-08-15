/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:17:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:59:06
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { EVENT, FROZEN_FN } from '@constants'
import { UserId } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'
import { Props } from './types'

export const COMPONENT = rc(PARENT, 'ItemTimeline')

export const COMPONENT_MAIN = rc(COMPONENT)

export const ITEM_HEIGHT = 84

export const AVATAR_WIDTH = 40

export const AVATAR_COVER_WIDTH = _.r(40)

export const HIDDEN_DS = ['1天不看TA', '3天不看TA', '7天不看TA', '重置']

export const DEFAULT_PROPS = {
  navigation: {} as Props['navigation'],
  styles: {} as ReturnType<typeof memoStyles>,
  style: {} as Props['style'],
  full: false as Props['full'],
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
  like: {} as Props['like'],
  time: '' as Props['time'],
  star: '' as Props['star'],
  subject: '' as Props['subject'],
  subjectId: 0 as Props['subjectId'],
  clearHref: '' as Props['clearHref'],
  index: 0 as number,
  event: EVENT as Props['event'],
  onDelete: FROZEN_FN as Props['onDelete'],
  onHidden: FROZEN_FN as Props['onHidden']
} as const

export const LIKES_OFFSETS = {
  x: 46
} as const
