/*
 * @Author: czy0729
 * @Date: 2024-07-25 21:01:31
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-07-25 21:01:31
 */
import { GAME_YEAR } from '@utils/subject/game'
import { LIST_EMPTY } from '@constants'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  query: {
    first: '',
    year: GAME_YEAR[0],
    platform: '',
    cate: '',
    dev: '',
    pub: '',
    sort: '发行',
    collected: ''
  },
  data: LIST_EMPTY,
  layout: 'list',
  expand: false,
  _loaded: false as Loaded
}
