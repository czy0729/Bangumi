/*
 * @Author: czy0729
 * @Date: 2022-06-15 10:48:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 05:03:14
 */
import { rc } from '@utils/dev'
import { EVENT } from '@constants'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'
import { Props as $ } from './types'

export const COMPONENT = rc(PARENT, 'ItemSearch')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  style: {} as $['style'],
  index: 0 as number,
  id: '' as $['id'],
  name: '' as $['name'],
  nameCn: '' as $['nameCn'],
  cover: '' as $['cover'],
  typeCn: '' as $['typeCn'],
  tip: '' as $['tip'],
  rank: '' as $['rank'],
  score: '' as $['score'],
  total: '' as $['total'],
  comments: '' as $['comments'],

  /** 动画才有, 具体收藏状态 */
  collection: '' as $['collection'],
  showManage: true as boolean,
  position: [] as $['position'],
  screen: '' as string,
  highlight: '' as string,
  event: EVENT as $['event']
}
