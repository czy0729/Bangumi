/*
 * @Author: czy0729
 * @Date: 2019-02-21 21:30:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-08 18:33:37
 */
export const HOST = 'https://api.bgm.tv'
export const SERVER = 'https://bangumi.tv'

/**
 * oauth获取access_token
 */
export const API_ACCESS_TOKEN = () => 'https://bgm.tv/oauth/access_token'

// -------------------- HTML --------------------
/**
 * 条目HTML
 * @param {*} *subjectId
 */
export const API_HTML_SUBJECT = subjectId => `${SERVER}/subject/${subjectId}`

export const API_HTML_SUBJECT_COMMENTS = subjectId =>
  `${SERVER}/subject/${subjectId}/comments`

// -------------------- 用户 --------------------
/**
 * 用户信息
 * @param {*} *userId        UID
 */
export const API_USER_INFO = userId => `${HOST}/user/${userId}`

/**
 * 用户收藏
 * @param {*} *userId        UID
 * @param {*} *cat           收藏类型: watching = 在看的动画与三次元条目 all_watching = 在看的动画三次元与书籍条目
 * @param {*} ids            收藏条目ID: 批量查询收藏状态，将条目 ID 以半角逗号分隔，如 1,2,4,6
 * @param {*} responseGroup  medium / small
 */
export const API_USER_COLLECTION = userId => `${HOST}/user/${userId}/collection`

/**
 * 用户收藏概览
 * @param {*} *userId        UID
 * @param {*} *subjectType   条目类型: book, anime, music, game, real
 * @param {*} max_results    显示条数最多25
 */
export const API_USER_COLLECTIONS = (userId, subjectType = 'anime') =>
  `${HOST}/user/${userId}/collections/${subjectType}`

/**
 * 用户收藏统计
 * @param {*} *userId        UID
 */
export const API_USER_COLLECTIONS_STATUS = userId =>
  `${HOST}/user/${userId}/collections/status`

/**
 * 用户收视进度
 * @param {*} *userId        UID
 * @param {*} subject_id     条目ID 获取指定条目收视进度
 */
export const API_USER_PROGRESS = userId => `${HOST}/user/${userId}/progress`

// -------------------- 条目 --------------------
/**
 * 条目信息
 * @param {*} *subjectId     条目ID
 * @param {*} responseGroup  返回数据大小: small, medium, large
 */
export const API_SUBJECT = subjectId => `${HOST}/subject/${subjectId}`

/**
 * 章节数据
 * @param {*} *subjectId     条目ID
 */
export const API_SUBJECT_EP = subjectId => `${HOST}/subject/${subjectId}/ep`

/**
 * 每日放送
 */
export const API_CALENDAR = () => `${HOST}/calendar`

// 搜索
/**
 * 条目搜索
 * @param {*} *keywords      关键词: 需要 URL Encode
 * @param {*} type           条目类型: 1 = book, 2 = anime, 3 = music, 4 = game, 6 = real
 * @param {*} start          开始条数
 * @param {*} max_results    每页条数, 最多25
 */
export const API_SEARCH = keywords => `${HOST}/search/subject/${keywords}`

// -------------------- 进度 --------------------
/**
 * GET, POST 更新收视进度
 * @param {*} *id            章节ID
 * @param {*} *status        收视类型: watched, queue, drop, remove
 * @param {*} ep_id          使用 POST 批量更新 将章节以半角逗号分隔, 如 3697,3698,3699
 *                           请求时 URL 中的 ep_id 为最后一个章节ID
 */
export const API_EP_STATUS = (id, status) => `${HOST}/ep/${id}/status/${status}`

/**
 * POST 批量更新收视进度
 * @param {*} *subject_id    条目ID
 * @param {*} *watched_eps   如看到 123 话则 POST 123
 *                           书籍条目传 watched_eps 与 watched_vols 至少其一
 * @param {*} watched_vols   如看到第 3 卷则 POST 3, 仅对书籍条目有效
 */
export const API_SUBJECT_UPDATE_WATCHED = subjectId =>
  `${HOST}/subject/${subjectId}/update/watched_eps`

// -------------------- 收藏 --------------------
/**
 * 获取指定条目收藏信息
 * @param {*} *subjectId     条目ID
 */
export const API_COLLECTION = subjectId => `${HOST}/collection/${subjectId}`

/**
 * 管理收藏
 * @param {*} *subjectId     条目ID
 * @param {*} *action        收藏动作: create = 添加收藏, update = 更新收藏
 *                           可以统一使用 update, 系统会自动判断需要新建还是更新收藏
 * @param {*} *status        章节状态: watched, queue, drop, remove
 * @param {*} tags           标签 以半角空格分割
 * @param {*} comment        简评
 * @param {*} rating         评分 1-10
 * @param {*} privacy        收藏隐私: 0 = 公开, 1 = 私密
 */
export const API_COLLECTION_ACTION = (subjectId, action = 'update') =>
  `${HOST}/collection/${subjectId}/${action}`
