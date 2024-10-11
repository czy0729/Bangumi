/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 01:07:34
 */
import { COLLECTION_STATUS, COLLECTIONS_ORDERBY, SUBJECT_TYPE } from '@constants'
import { CollectionsOrder, CollectionStatus, Loaded, SubjectType } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {}

export const STATE = {
  ...EXCLUDE_STATE,
  subjectType: SUBJECT_TYPE[0].label as SubjectType,
  type: COLLECTION_STATUS[1].value as CollectionStatus,
  order: COLLECTIONS_ORDERBY[0].value as CollectionsOrder,
  _loaded: false as Loaded
}
