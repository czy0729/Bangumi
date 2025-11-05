/*
 * @Author: czy0729
 * @Date: 2022-09-04 03:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:57:27
 */
import { FROZEN_FN } from '@constants'
import { SubjectId } from '@types'
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
    onFliped: FROZEN_FN,
    onSelect: FROZEN_FN,
    onLongPress: FROZEN_FN
  }
}
