/*
 * @Author: czy0729
 * @Date: 2021-08-10 00:36:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 14:25:07
 */
import { _ } from '@stores'
import { pick } from '@utils'
import { Fn, SubjectId, ViewStyle } from '@types'

export const DEFAULT_PROPS = {
  style: {} as ViewStyle,
  subjectId: 0 as SubjectId,
  layoutWidth: 0 as number,
  marginRight: 0 as number,
  numbersOfLine: 8 as number,
  lines: 4 as number,
  pagination: false as boolean,
  canPlay: false as boolean,
  login: false as boolean,
  advance: false as boolean,
  eps: [] as any[],
  userProgress: {} as any,
  grid: false as boolean,
  orientation: _.orientation,
  onSelect: (() => {}) as Fn,
  onLongPress: (() => {}) as Fn
}

export const buttonDefaultProps = {
  // stores
  styles: {},
  heatMap: false,

  // props
  props: {
    width: 0,
    margin: 0,
    ...pick(DEFAULT_PROPS, [
      'subjectId',
      'numbersOfLine',
      'canPlay',
      'login',
      'advance',
      'userProgress',
      'onSelect',
      'onLongPress'
    ])
  },
  item: {},
  eps: [],
  isSp: false,
  num: 0
}
