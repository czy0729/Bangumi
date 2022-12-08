/*
 * @Author: czy0729
 * @Date: 2022-07-16 07:31:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-16 07:32:01
 */
import { CollectionStatusValue, SubjectId, SubjectTypeValue, UserId } from '@types'

export const HOST_API_V0 = 'https://api.bgm.tv/v0'

export const API_COLLECTIONS = (
  userId: UserId,
  subjectType: SubjectTypeValue,
  page: number = 1,
  limit: number = 100,
  type: CollectionStatusValue = '3'
) =>
  `${HOST_API_V0}/users/${userId}/collections?subject_type=${subjectType}&type=${type}&limit=${limit}&offset=${
    (page - 1) * limit
  }` as const

export const API_COLLECTION = (userId: UserId, subjectId: SubjectId) =>
  `${HOST_API_V0}/users/${userId}/collections/${subjectId}` as const
