/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:07:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-02 00:59:48
 */
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants'
import { TimeLineScope, TimeLineType } from '@types'

export const NAMESPACE = 'Timeline'

export const DEFAULT_SCOPE = MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>('好友')

export const DEFAULT_TYPE = MODEL_TIMELINE_TYPE.getValue<TimeLineType>('全部')

export const INIT_SAY_ITEM = {
  id: '',
  name: '',
  text: ''
}
