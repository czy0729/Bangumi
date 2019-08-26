/*
 * 接口
 * @Author: czy0729
 * @Date: 2019-02-21 21:30:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-26 18:02:26
 */
import { HOST_NAME } from './index'

export const API_HOST = 'https://api.bgm.tv'
export const API_HOST_TINYGRAIL = 'https://www.tinygrail.com'

/**
 * oauth获取access_token
 */
export const API_ACCESS_TOKEN = () => `https://${HOST_NAME}/oauth/access_token`

// -------------------- 用户 --------------------
/**
 * 用户信息
 * @param {*} *userId        UID
 */
export const API_USER_INFO = userId => `${API_HOST}/user/${userId}`

/**
 * 用户收藏
 * @param {*} *userId        UID
 * @param {*} *cat           收藏类型: watching = 在看的动画与三次元条目 all_watching = 在看的动画三次元与书籍条目
 * @param {*} ids            收藏条目ID: 批量查询收藏状态，将条目 ID 以半角逗号分隔，如 1,2,4,6
 * @param {*} responseGroup  medium / small
 */
export const API_USER_COLLECTION = userId =>
  `${API_HOST}/user/${userId}/collection`

/**
 * 用户收藏概览
 * @param {*} *subjectType   条目类型: book, anime, music, game, real
 * @param {*} *userId        UID
 * @param {*} max_results    显示条数最多25
 */
export const API_USER_COLLECTIONS = (subjectType = 'anime', userId) =>
  `${API_HOST}/user/${userId}/collections/${subjectType}`

/**
 * 用户收藏统计
 * @param {*} *userId        UID
 */
export const API_USER_COLLECTIONS_STATUS = userId =>
  `${API_HOST}/user/${userId}/collections/status`

/**
 * 用户收视进度
 * @param {*} *userId        UID
 * @param {*} subject_id     条目ID 获取指定条目收视进度
 */
export const API_USER_PROGRESS = userId => `${API_HOST}/user/${userId}/progress`

// -------------------- 条目 --------------------
/**
 * 条目信息
 * @param {*} *subjectId     条目ID
 * @param {*} responseGroup  返回数据大小: small, medium, large
 */
export const API_SUBJECT = subjectId => `${API_HOST}/subject/${subjectId}`

/**
 * 章节数据
 * @param {*} *subjectId     条目ID
 */
export const API_SUBJECT_EP = subjectId => `${API_HOST}/subject/${subjectId}/ep`

/**
 * 每日放送
 */
export const API_CALENDAR = () => `${API_HOST}/calendar`

// 搜索
/**
 * 条目搜索
 * @param {*} *keywords      关键词: 需要 URL Encode
 * @param {*} type           条目类型: 1 = book, 2 = anime, 3 = music, 4 = game, 6 = real
 * @param {*} start          开始条数
 * @param {*} max_results    每页条数, 最多25
 */
export const API_SEARCH = keywords => `${API_HOST}/search/subject/${keywords}`

// -------------------- 进度 --------------------
/**
 * GET, POST 更新收视进度
 * @param {*} *id            章节ID
 * @param {*} *status        收视类型: watched, queue, drop, remove
 * @param {*} ep_id          使用 POST 批量更新 将章节以半角逗号分隔, 如 3697,3698,3699
 *                           请求时 URL 中的 ep_id 为最后一个章节ID
 */
export const API_EP_STATUS = (id, status) =>
  `${API_HOST}/ep/${id}/status/${status}`

/**
 * POST 批量更新收视进度
 * @param {*} *subject_id    条目ID
 * @param {*} *watched_eps   如看到 123 话则 POST 123
 *                           书籍条目传 watched_eps 与 watched_vols 至少其一
 * @param {*} watched_vols   如看到第 3 卷则 POST 3, 仅对书籍条目有效
 */
export const API_SUBJECT_UPDATE_WATCHED = subjectId =>
  `${API_HOST}/subject/${subjectId}/update/watched_eps`

// -------------------- 收藏 --------------------
/**
 * 获取指定条目收藏信息
 * @param {*} *subjectId     条目ID
 */
export const API_COLLECTION = subjectId => `${API_HOST}/collection/${subjectId}`

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
  `${API_HOST}/collection/${subjectId}/${action}`

// -------------------- 小圣杯 --------------------
const TINYGRAIL_LIMIT = 100

/**
 * 指定人物的数据
 * @param {*} *body 人物ids [1, 2, 3]
 */
export const API_TINYGRAIL_CHARAS = () => `${API_HOST_TINYGRAIL}/api/chara/list`

/**
 * 最高市值
 */
export const API_TINYGRAIL_MVC = (page = 1, limit = TINYGRAIL_LIMIT) =>
  `${API_HOST_TINYGRAIL}/api/chara/mvc/${page}/${limit}`

/**
 * 最大涨幅
 */
export const API_TINYGRAIL_MRC = (page = 1, limit = TINYGRAIL_LIMIT) =>
  `${API_HOST_TINYGRAIL}/api/chara/mrc/${page}/${limit}`

/**
 * 最大跌幅
 */
export const API_TINYGRAIL_MFC = (page = 1, limit = TINYGRAIL_LIMIT) =>
  `${API_HOST_TINYGRAIL}/api/chara/mfc/${page}/${limit}`

/**
 * ICO最多资金
 */
export const API_TINYGRAIL_MVI = (page = 1, limit = TINYGRAIL_LIMIT) =>
  `${API_HOST_TINYGRAIL}/api/chara/mvi/${page}/${limit}`

/**
 * ICO最高人气
 */
export const API_TINYGRAIL_MPI = (page = 1, limit = TINYGRAIL_LIMIT) =>
  `${API_HOST_TINYGRAIL}/api/chara/mpi/${page}/${limit}`

/**
 * ICO最近活跃
 */
export const API_TINYGRAIL_RAI = (page = 1, limit = TINYGRAIL_LIMIT) =>
  `${API_HOST_TINYGRAIL}/api/chara/rai/${page}/${limit}`

/**
 * 最近活跃
 */
export const API_TINYGRAIL_RECENT = (page = 1, limit = TINYGRAIL_LIMIT) =>
  `${API_HOST_TINYGRAIL}/api/chara/recent/${page}/${limit}`

/**
 * 交易记录
 * @param {*} monoId
 * @param {*} date
 */
export const API_TINYGRAIL_CHARTS = (
  monoId = 0,
  date = '2019-08-01T00:00:00+08:00'
) => `${API_HOST_TINYGRAIL}/api/chara/charts/${monoId}/${date}`
