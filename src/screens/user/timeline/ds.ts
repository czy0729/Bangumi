/*
 * @Author: czy0729
 * @Date: 2022-08-20 15:27:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-29 23:54:33
 */
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants'
import { TimeLineScope, TimeLineType } from '@types'

export const COMPONENT = 'UserTimeline'

export const DEFAULT_SCOPE = MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>('自己')

export const DEFAULT_TYPE = MODEL_TIMELINE_TYPE.getValue<TimeLineType>('收藏')
