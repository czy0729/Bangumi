/*
 * @Author: czy0729
 * @Date: 2022-09-04 03:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 15:37:06
 */
import { FROZEN_FN } from '@constants'

import type { SubjectId } from '@types'
import type { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  heatMap: false as boolean,
  item: {} as any,
  eps: [] as any[],
  epStatus: '' as string,
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
