/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:17:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 20:50:08
 */
import { _ } from '@stores'
import { EVENT } from '@constants'

export const AVATAR_WIDTH = 40

export const AVATAR_COVER_WIDTH = _.r(40)

export const HIDDEN_DS = ['1天不看TA', '3天不看TA', '7天不看TA', '重置']

export const DEFAULT_PROPS = {
  navigation: {},
  styles: {},
  style: {},
  avatar: {},
  userId: '',
  p1: {},
  p2: {},
  p3: {
    text: [],
    url: []
  },
  p4: {},
  image: [],
  comment: '',
  reply: {},
  time: '',
  star: '',
  subject: '',
  subjectId: 0,
  clearHref: '',
  event: EVENT,
  onDelete: () => {},
  onHidden: () => {}
} as const
