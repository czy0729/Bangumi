/*
 * 接口
 * https://github.com/bangumi/api
 * @Author: czy0729
 * @Date: 2019-02-21 21:30:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:51:20
 */
import { EpId, Id, SubjectId, UserId } from '@types'
import { HOST, IMG_DEFAULT } from '../constants'
import { WEB } from '../device'
import { EpStatus, SubjectType } from '../model/types'
import { CollectionAction } from './types'

export * from './enum'
export * from './tinygrail'

/** bgm api 域名 */
export const API_HOST = 'https://api.bgm.tv'

/** bgm 新 api 域名 */
export const API_V0 = `${API_HOST}/v0` as const

/** 瓷砖进度接口 */
export const API_MOSAIC_TILE = (username: UserId, type = 'progress') =>
  `https://bangumi-mosaic-tile.aho.im/users/${username}/timelines/${type}.json`

/** oauth 获取 access_token */
export const API_ACCESS_TOKEN = () => `${HOST}/oauth/access_token`

/** 用户信息 */
export const API_USER_INFO = (userId: UserId) => `${API_HOST}/user/${userId}`

/**
 * [POST] 用户收藏
 *
 * @query *cat 收藏类型: watching = 在看的动画与三次元条目 all_watching = 在看的动画三次元与书籍条目
 * @query ids 收藏条目ID: 批量查询收藏状态，将条目 ID 以半角逗号分隔，如 1,2,4,6
 * @query responseGroup 'medium' | 'small'
 */
export const API_USER_COLLECTION = (userId: UserId) =>
  `${API_HOST}/user/${userId}/collection` as const

/**
 * 用户收藏概览
 *
 * @query  max_results 显示条数最多25
 */
export const API_USER_COLLECTIONS = (subjectType: SubjectType = 'anime', userId: UserId) =>
  `${API_HOST}/user/${userId}/collections/${subjectType}` as const

/** 用户收藏统计 */
export const API_USER_COLLECTIONS_STATUS = (userId: UserId) =>
  `${API_HOST}/user/${userId}/collections/status` as const

/**
 * 用户收视进度
 *
 * @query subject_id 条目ID 获取指定条目收视进度
 */
export const API_USER_PROGRESS = (userId: UserId) => `${API_HOST}/user/${userId}/progress` as const

/**
 * 条目信息
 *
 * @query responseGroup 返回数据大小: small, medium, large
 */
export const API_SUBJECT = (subjectId: SubjectId) => `${API_HOST}/subject/${subjectId}`

/** 章节数据 */
export const API_SUBJECT_EP = (subjectId: SubjectId) => `${API_HOST}/subject/${subjectId}/ep`

/** 每日放送 */
export const API_CALENDAR = () => `${API_HOST}/calendar`

/**
 * 条目搜索
 *
 * @query type 条目类型: 1 = book, 2 = anime, 3 = music, 4 = game, 6 = real
 * @query start 开始条数
 * @query max_results 每页条数, 最多25
 */
export const API_SEARCH = (keywords: string) => `${API_HOST}/search/subject/${keywords}`

/**
 * [GET, POST] 更新收视进度
 * @param {*} id 章节ID
 * @param {*} status 收视类型
 *
 * @query ep_id 使用 POST 批量更新 将章节以半角逗号分隔, 如 3697,3698,3699
 *         请求时 URL 中的 ep_id 为最后一个章节ID
 */
export const API_EP_STATUS = (id: EpId, status: EpStatus) => `${API_HOST}/ep/${id}/status/${status}`

/**
 * [POST] 批量更新收视进度
 * @param {*} subjectId
 *
 * @query watched_eps 如看到 123 话则 POST 123; 书籍条目传 watched_eps 与 watched_vols 至少其一
 * @query watched_vols 如看到第 3 卷则 POST 3, 仅对书籍条目有效
 */
export const API_SUBJECT_UPDATE_WATCHED = (subjectId: SubjectId) =>
  `${API_HOST}/subject/${subjectId}/update/watched_eps`

/** 获取指定条目收藏信息 */
export const API_COLLECTION = (subjectId: SubjectId) => `${API_HOST}/collection/${subjectId}`

/**
 * 管理收藏
 * @param {*} subjectId
 * @param {*} action  收藏动作: create = 添加收藏, update = 更新收藏; 可以统一使用 update, 系统会自动判断需要新建还是更新收藏
 *
 * @query *status 章节状态: watched, queue, drop, remove
 * @query tags    标签 以半角空格分割
 * @query comment 简评
 * @query rating  评分 1-10
 * @query privacy 收藏隐私: 0 = 公开, 1 = 私密
 */
export const API_COLLECTION_ACTION = (subjectId: SubjectId, action: CollectionAction = 'update') =>
  `${API_HOST}/collection/${subjectId}/${action}`

/** v0 api: 条目封面 */
export const API_COVER = (subjectId: SubjectId, type: string = 'common') =>
  `${API_HOST}/v0/subjects/${subjectId}/image?type=${type}`

/** v0 api: 用户头像 */
export const API_AVATAR = (username: string | number) =>
  WEB ? IMG_DEFAULT : `${API_HOST}/v0/users/${username}/avatar?type=large`

/** v0 api: 角色图  */
export const API_MONO_COVER = (
  monoId: Id,
  type: 'small' | 'grid' | 'large' | 'medium' = 'medium',
  monoType: 'characters' | 'persons' = 'characters'
) => `${API_HOST}/v0/${monoType}/${monoId}/image?type=${type}`

/** v0 api: 获取对应用户的收藏 */
export const API_USERS_SUBJECT_COLLECTION = (username: string | number, subjectId: SubjectId) =>
  `${API_HOST}/v0/users/${username}/collections/${subjectId}`

/** 随机 pixiv */
export const API_SETU = (num: number = 20) =>
  `https://api.lolicon.app/setu/v2?r18=0&num=${num}&size=small&dateAfter=1609459200000`

/** 随机二次元头像 */
export const API_RANDOM_AVATAR = () => `https://api.yimian.xyz/img?type=head`

/** 圣地巡游 */
export const API_ANITABI = (subjectId: SubjectId) =>
  `https://api.anitabi.cn/bangumi/${subjectId}/lite`

/** 帖子楼层表情 */
export const API_TOPIC_COMMENT_LIKE = (
  type: number,
  main_id: number,
  id: number,
  value: string,
  gh: string
) => `${HOST}/like?type=${type}&main_id=${main_id}&id=${id}&value=${value}&gh=${gh}&ajax=1`

/** 添加好友 */
export const API_CONNECT = (userId: number, gh: string) =>
  `${HOST}/connect/${userId}?gh=${gh}&ajax=1`
