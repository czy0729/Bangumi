/*
 * @Author: czy0729
 * @Date: 2022-07-16 07:31:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 00:42:30
 */
import { CollectionStatusValue, SubjectId, SubjectTypeValue, UserId } from '@types'

export const HOST_API_V0 = 'https://api.bgm.tv/v0'

/** 用户收藏 */
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

/** 用户条目收藏状态 */
export const API_COLLECTION = (userId: UserId, subjectId: SubjectId) =>
  `${HOST_API_V0}/users/${userId}/collections/${subjectId}` as const

/** 登录用户信息 */
export const API_ME = () => `${HOST_API_V0}/me` as const

/** 登录用户条目章节收藏状态 */
export const API_EPS_COLLECTION = (subjectId: SubjectId) =>
  `${HOST_API_V0}/users/-/collections/${subjectId}/episodes` as const
