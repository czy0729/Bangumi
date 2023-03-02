/*
 * @Author: czy0729
 * @Date: 2021-08-10 00:36:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 22:11:25
 */
import { _ } from '@stores'
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
  flip: false as boolean,
  onFliped: (() => {}) as Fn,
  onSelect: (() => {}) as Fn
}
