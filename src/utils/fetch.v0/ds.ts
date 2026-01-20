/*
 * @Author: czy0729
 * @Date: 2022-07-16 07:31:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 00:42:30
 */
import { API_V0 } from '@constants/api'

import type { CollectionStatusValue, SubjectId, SubjectTypeValue, UserId } from '@types'

/** 用户收藏 */
export const API_COLLECTIONS = (
  userId: UserId,
  subjectType: SubjectTypeValue,
  page: number = 1,
  limit: number = 100,
  type: CollectionStatusValue = '3'
) =>
  `${API_V0}/users/${userId}/collections?subject_type=${subjectType}&type=${type}&limit=${limit}&offset=${
    (page - 1) * limit
  }` as const

/** 用户条目收藏状态 */
export const API_COLLECTION = (userId: UserId, subjectId: SubjectId) =>
  `${API_V0}/users/${userId}/collections/${subjectId}` as const

/** 登录用户信息 */
export const API_ME = () => `${API_V0}/me` as const

/** 登录用户条目章节收藏状态 */
export const API_EPS_COLLECTION = (subjectId: SubjectId) =>
  `${API_V0}/users/-/collections/${subjectId}/episodes` as const
