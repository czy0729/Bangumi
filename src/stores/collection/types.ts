/*
 * @Author: czy0729
 * @Date: 2022-05-27 04:40:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-27 05:40:53
 */
import { CollectionsOrder, CollectionStatus, SubjectType } from '@constants/model/types'
import { UserId } from '@types'

export type FetchUserCollectionsArgs = {
  userId: UserId
  subjectType: SubjectType
  type: CollectionStatus
  order?: CollectionsOrder
  tag?: string
}

export type FetchMosaicTileArgs = {
  userId: UserId
}
