/*
 * @Author: czy0729
 * @Date: 2019-07-15 11:07:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-09 15:02:10
 */
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants/model'

export const NAMESPACE = 'Timeline'

// -------------------- default --------------------
export const DEFAULT_SCOPE = MODEL_TIMELINE_SCOPE.getValue('好友')

export const DEFAULT_TYPE = MODEL_TIMELINE_TYPE.getValue('全部')

export const INIT_SAY_ITEM = {
  id: '',
  name: '',
  text: ''
}
