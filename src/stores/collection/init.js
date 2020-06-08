/*
 * @Author: czy0729
 * @Date: 2019-07-15 10:48:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-15 10:49:42
 */
import {
  MODEL_SUBJECT_TYPE,
  MODEL_COLLECTION_STATUS,
  MODEL_COLLECTIONS_ORDERBY
} from '@constants/model'

export const NAMESPACE = 'Collection'

// -------------------- default --------------------
export const DEFAULT_SUBJECT_TYPE = MODEL_SUBJECT_TYPE.getLabel('动画')
export const DEFAULT_TYPE = MODEL_COLLECTION_STATUS.getValue('在看')
export const DEFAULT_ORDER = MODEL_COLLECTIONS_ORDERBY.getValue('收藏时间')
