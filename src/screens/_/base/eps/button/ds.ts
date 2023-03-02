/*
 * @Author: czy0729
 * @Date: 2022-09-04 03:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 22:09:07
 */
import { Fn, SubjectId } from '@types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  heatMap: false as boolean,
  item: {} as any,
  eps: [] as any[],
  isSp: false as boolean,
  num: 0 as number,
  props: {
    width: 0 as number,
    margin: 0 as number,
    subjectId: 0 as SubjectId,
    numbersOfLine: 8 as number,
    canPlay: false as boolean,
    login: false as boolean,
    advance: false as boolean,
    userProgress: {} as any,
    flip: false as boolean,
    onFliped: (() => {}) as Fn,
    onSelect: (() => {}) as Fn,
    onLongPress: (() => {}) as Fn
  }
}
