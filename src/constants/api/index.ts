/*
 * 接口定义
 *  - https://github.com/bangumi/api
 *
 * @Author: czy0729
 * @Date: 2019-02-21 21:30:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-13 12:21:56
 */
import { HOST, IMG_DEFAULT } from '../constants'
import { WEB } from '../device'

import type { EpId, Id, SubjectId, UserId } from '@types'
import type { EpStatus, SubjectType } from '../model/types'
import type { ApiCollectionAction, ApiCoverType, ApiMonoType } from './types'

export * from './ds'
export * from './tinygrail'

/* -------------------------------------------------------------------------- */
/* 基础域名                                                                    */
/* -------------------------------------------------------------------------- */

/** bangumi 官方 API 域名 */
export const API_HOST = 'https://api.bgm.tv' as const

/** bangumi v0 API */
export const API_V0 = `${API_HOST}/v0` as const

/** bangumi 私有 API（next） */
export const API_P1 = 'https://next.bgm.tv/p1' as const

/* -------------------------------------------------------------------------- */
/* OAuth                                                                      */
/* -------------------------------------------------------------------------- */

/** OAuth 获取 access_token */
export const API_ACCESS_TOKEN = () => `${HOST}/oauth/access_token`

/* -------------------------------------------------------------------------- */
/* 用户相关                                                                    */
/* -------------------------------------------------------------------------- */

/** 用户信息 */
export const API_USER_INFO = (userId: UserId) => `${API_HOST}/user/${userId}` as const

/**
 * 用户收藏（批量）
 *
 * @query *cat
 *  - watching        在看的动画、三次元
 *  - all_watching    在看的动画、三次元、书籍
 * @query ids 条目 ID 半角逗号分隔
 * @query responseGroup
 *  - medium
 *  - small
 */
export const API_USER_COLLECTION = (userId: UserId) =>
  `${API_HOST}/user/${userId}/collection` as const

/**
 * 用户收藏概览
 *
 * @query max_results 最多 25
 */
export const API_USER_COLLECTIONS = (subjectType: SubjectType = 'anime', userId: UserId) =>
  `${API_HOST}/user/${userId}/collections/${subjectType}` as const

/** 用户收藏统计 */
export const API_USER_COLLECTIONS_STATUS = (userId: UserId) =>
  `${API_HOST}/user/${userId}/collections/status` as const

/**
 * 用户收视进度
 *
 * @query subject_id 获取指定条目进度
 */
export const API_USER_PROGRESS = (userId: UserId) => `${API_HOST}/user/${userId}/progress` as const

/* -------------------------------------------------------------------------- */
/* 条目 / 章节                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * 条目信息
 *
 * @query responseGroup
 *  - small
 *  - medium
 *  - large
 */
export const API_SUBJECT = (subjectId: SubjectId) => `${API_HOST}/subject/${subjectId}`

/** 条目章节数据 */
export const API_SUBJECT_EP = (subjectId: SubjectId) => `${API_HOST}/subject/${subjectId}/ep`

/**
 * [GET, POST] 更新收视进度
 *
 * @query ep_id  使用 [POST] 批量更新将章节以半角逗号分隔, 如 3697,3698,3699
 */
export const API_EP_STATUS = (id: EpId, status: EpStatus) => `${API_HOST}/ep/${id}/status/${status}`

/**
 * [POST] 批量更新收视进度
 *
 * @param subjectId    条目 ID
 *
 * @query watched_eps  如看到 123 话则 [POST] 123; 书籍条目传 watched_eps 与 watched_vols 至少其一
 * @query watched_vols 如看到第 3 卷则 [POST] 3, 仅对书籍条目有效
 */
export const API_SUBJECT_UPDATE_WATCHED = (subjectId: SubjectId) =>
  `${API_HOST}/subject/${subjectId}/update/watched_eps`

/* -------------------------------------------------------------------------- */
/* 收藏                                                                        */
/* -------------------------------------------------------------------------- */

/** 获取条目收藏信息 */
export const API_COLLECTION = (subjectId: SubjectId) => `${API_HOST}/collection/${subjectId}`

/**
 * 管理收藏
 *
 * @query *status
 *  - watched
 *  - queue
 *  - drop
 *  - remove
 * @query tags     标签 半角空格分割
 * @query comment  简评
 * @query rating   评分 1 - 10
 * @query privacy  收藏隐私
 *  - 0 公开
 *  - 1 私密
 */
export const API_COLLECTION_ACTION = (
  subjectId: SubjectId,
  action: ApiCollectionAction = 'update'
) => `${API_HOST}/collection/${subjectId}/${action}`

/* -------------------------------------------------------------------------- */
/* v0 API - 图片                                                               */
/* -------------------------------------------------------------------------- */

/** 条目封面 (v0) */
export const API_COVER = (subjectId: SubjectId, type: string = 'common') =>
  `${API_V0}/subjects/${subjectId}/image?type=${type}`

/** 用户头像 (v0) */
export const API_AVATAR = (username: string | number) =>
  WEB ? IMG_DEFAULT : `${API_V0}/users/${username}/avatar?type=large`

/** 角色 / 人物图片 (v0) */
export const API_MONO_COVER = (
  monoId: Id,
  type: ApiCoverType = 'medium',
  monoType: ApiMonoType = 'characters'
) => `${API_V0}/${monoType}/${monoId}/image?type=${type}`

/** 获取用户对指定条目的收藏（v0） */
export const API_USERS_SUBJECT_COLLECTION = (username: UserId, subjectId: SubjectId) =>
  `${API_V0}/users/${username}/collections/${subjectId}`

/* -------------------------------------------------------------------------- */
/* 其他官方接口                                                                 */
/* -------------------------------------------------------------------------- */

/** 每日放送 */
export const API_CALENDAR = () => `${API_HOST}/calendar`

/**
 * 条目搜索
 *
 * @query type
 *  - 1 book
 *  - 2 anime
 *  - 3 music
 *  - 4 game
 *  - 6 real
 * @query start 开始条数
 * @query max_results 每页条数, 最多25
 */
export const API_SEARCH = (keywords: string) => `${API_HOST}/search/subject/${keywords}`

/* -------------------------------------------------------------------------- */
/* 第三方 / 扩展接口                                                             */
/* -------------------------------------------------------------------------- */

/** 瓷砖进度 */
export const API_MOSAIC_TILE = (username: UserId, type: 'progress' | string = 'progress') =>
  `https://bangumi-mosaic-tile.aho.im/users/${username}/timelines/${type}.json`

/** 随机 Pixiv */
export const API_SETU = (num: number = 20) =>
  `https://api.lolicon.app/setu/v2?r18=0&num=${num}&size=small&dateAfter=1609459200000`

/** 随机二次元头像 */
export const API_RANDOM_AVATAR = () => 'https://api.yimian.xyz/img?type=head'

/** 圣地巡游 */
export const API_ANITABI = (subjectId: SubjectId) =>
  `https://api.anitabi.cn/bangumi/${subjectId}/lite`

/* -------------------------------------------------------------------------- */
/* 站内 Ajax                                                                  */
/* -------------------------------------------------------------------------- */

/** 帖子楼层表情 */
export const API_TOPIC_COMMENT_LIKE = (
  type: number,
  mainId: number,
  id: number,
  value: string,
  gh: string
) => `${HOST}/like?type=${type}&main_id=${mainId}&id=${id}&value=${value}&gh=${gh}&ajax=1`

/** 添加好友 */
export const API_CONNECT = (userId: number, gh: string) =>
  `${HOST}/connect/${userId}?gh=${gh}&ajax=1`
