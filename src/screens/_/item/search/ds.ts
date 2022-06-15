/*
 * @Author: czy0729
 * @Date: 2022-06-15 10:48:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 10:49:04
 */
import { EVENT } from '@constants'

export const DEFAULT_PROPS = {
  navigation: {},
  styles: {},
  style: {},
  id: '',
  name: '',
  nameCn: '',
  cover: '',
  type: '',
  typeCn: '',
  tip: '',
  rank: '',
  score: '',
  total: '',
  comments: '',

  /** 动画才有, 具体收藏状态 */
  collection: '',

  /** 是否收藏 */
  collected: false,
  position: [],
  event: EVENT
}
