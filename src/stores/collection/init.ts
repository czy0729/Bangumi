/*
 * @Author: czy0729
 * @Date: 2019-07-15 10:48:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-27 05:16:19
 */
import {
  MODEL_SUBJECT_TYPE,
  MODEL_COLLECTION_STATUS,
  MODEL_COLLECTIONS_ORDERBY
} from '@constants'

export const NAMESPACE = 'Collection'

export const DEFAULT_SUBJECT_TYPE = MODEL_SUBJECT_TYPE.getLabel('动画') as 'anime'

export const DEFAULT_COLLECTION_STATUS = MODEL_COLLECTION_STATUS.getValue(
  '在看'
) as 'do'

export const DEFAULT_ORDER = MODEL_COLLECTIONS_ORDERBY.getValue('收藏时间') as ''
