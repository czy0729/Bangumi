/*
 * @Author: czy0729
 * @Date: 2021-08-10 00:36:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-13 08:40:52
 */
import { _ } from '@stores'
import { pick } from '@utils'

export const defaultProps = {
  style: {},
  subjectId: 0,
  layoutWidth: 0,
  marginRight: 0,
  numbersOfLine: 8,
  lines: 4,
  pagination: false,
  canPlay: false,
  login: false,
  advance: false,
  eps: [],
  userProgress: {},
  grid: false,
  orientation: _.orientation,
  onSelect: Function.prototype,
  onLongPress: Function.prototype
}

export const buttonDefaultProps = {
  // stores
  styles: {},
  heatMap: false,

  // props
  props: {
    width: 0,
    margin: 0,
    ...pick(defaultProps, [
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
