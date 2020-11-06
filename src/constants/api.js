/*
 * 接口
 *  - Bgm接口 https://github.com/bangumi/api
 *  - 小圣杯接口 https://bgm.tv/dev/app/1143
 *
 * @Author: czy0729
 * @Date: 2019-02-21 21:30:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-06 17:00:45
 */
import { HOST } from './index'

export const API_HOST = 'https://api.bgm.tv'
export const API_HOST_TINYGRAIL = 'https://tinygrail.com'
export const TINYGRAIL_ASSETS_LIMIT = 2000
const TINYGRAIL_LIMIT = 200

/**
 * 瓷砖进度接口
 * @param {*} username
 * @param {*} type
 */
export const API_MOSAIC_TILE = (username, type = 'progress') =>
  `https://bangumi-mosaic-tile.now.sh/users/${username}/timelines/${type}.json`

/**
 * @todo correct
 */
const d = new Date()
const TINYGRAIL_START = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T00:00:00+08:00`

/**
 * oauth获取access_token
 */
export const API_ACCESS_TOKEN = () => `${HOST}/oauth/access_token`

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
/**
 * 指定人物的数据
 * @param {*} *body 人物ids [1, 2, 3]
 */
export const API_TINYGRAIL_CHARAS = () => `${API_HOST_TINYGRAIL}/api/chara/list`

/**
 * 列表
 * mvc: 最高市值
 * mrc: 最大涨幅
 * mfc: 最大跌幅
 * mvi: ICO最多资金
 * mpi: ICO最高人气
 * rai: ICO最近活跃
 * mri: ICO即将结束
 * recent: 最近活跃
 * tnbc: 新番市值
 * nbc: 新番活跃
 * msrc: 最高股息
 */
export const API_TINYGRAIL_LIST = (type, page = 1, limit = TINYGRAIL_LIMIT) =>
  `${API_HOST_TINYGRAIL}/api/chara/${type}/${page}/${limit}`

/**
 * 番市首富
 * @param {*} page
 * @param {*} limit
 */
export const API_TINYGRAIL_RICH = (page = 1, limit = TINYGRAIL_LIMIT) =>
  `${API_HOST_TINYGRAIL}/api/chara/top/${page}/${limit}`

/**
 * 交易记录
 * @param {*} monoId
 * @param {*} date
 */
export const API_TINYGRAIL_CHARTS = (monoId = 0, date = TINYGRAIL_START) =>
  `${API_HOST_TINYGRAIL}/api/chara/charts/${monoId}/${date}`

/**
 * 发行价
 * @param {*} monoId
 */
export const API_TINYGRAIL_ISSUE_PRICE = (monoId = 0) =>
  `${API_HOST_TINYGRAIL}/api/chara/charts/${monoId}/2019-08-08`

/**
 * 角色详情
 * @param {*} monoId
 */
export const API_TINYGRAIL_CHARA = (monoId = 0) =>
  `${API_HOST_TINYGRAIL}/api/chara/${monoId}`

/**
 * 角色深度图
 * @param {*} monoId
 */
export const API_TINYGRAIL_DEPTH = monoId =>
  `${API_HOST_TINYGRAIL}/api/chara/depth/${monoId}`

/**
 * 登出
 */
export const API_TINYGRAIL_LOGOUT = () =>
  `${API_HOST_TINYGRAIL}/api/account/logout`

/**
 * 用户Hash
 */
export const API_TINYGRAIL_HASH = () =>
  `${API_HOST_TINYGRAIL}/api/account/recommend`

/**
 * 资产信息
 */
export const API_TINYGRAIL_ASSETS = hash =>
  `${API_HOST_TINYGRAIL}/api/chara/user/assets${hash ? `/${hash}` : ''}`

/**
 * 用户资产概览信息
 */
export const API_TINYGRAIL_CHARA_ASSETS = hash =>
  `${API_HOST_TINYGRAIL}/api/chara/user/assets/${hash}/true`

/**
 * 用户角色挂单信息
 * @param {*} monoId
 */
export const API_TINYGRAIL_USER_CHARA = monoId =>
  `${API_HOST_TINYGRAIL}/api/chara/user/${monoId}`

/**
 * 买入
 * @param {*} monoId
 * @param {*} price
 * @param {*} amount
 * @param {*} ice    冰山委托
 */
export const API_TINYGRAIL_BID = (monoId, price, amount, ice = false) =>
  `${API_HOST_TINYGRAIL}/api/chara/bid/${monoId}/${price}/${amount}/${ice}`

/**
 * 卖出
 * @param {*} monoId
 * @param {*} price
 * @param {*} amount
 * @param {*} ice    冰山委托
 */
export const API_TINYGRAIL_ASK = (monoId, price, amount, ice = false) =>
  `${API_HOST_TINYGRAIL}/api/chara/ask/${monoId}/${price}/${amount}/${ice}`

/**
 * 取消买入
 * @param {*} id
 */
export const API_TINYGRAIL_CANCEL_BID = id =>
  `${API_HOST_TINYGRAIL}/api/chara/bid/cancel/${id}`

/**
 * 取消卖出
 * @param {*} id
 */
export const API_TINYGRAIL_CANCEL_ASK = id =>
  `${API_HOST_TINYGRAIL}/api/chara/ask/cancel/${id}`

/**
 * 我的买单
 */
export const API_TINYGRAIL_CHARA_BID = () =>
  `${API_HOST_TINYGRAIL}/api/chara/bids/0/1/400`

/**
 * 我的卖单
 */
export const API_TINYGRAIL_CHARA_ASKS = () =>
  `${API_HOST_TINYGRAIL}/api/chara/asks/0/1/400`

/**
 * 我的持仓
 */
export const API_TINYGRAIL_MY_CHARA_ASSETS = () =>
  `${API_HOST_TINYGRAIL}/api/chara/user/assets/0/true`

/**
 * 资金日志
 */
export const API_TINYGRAIL_BALANCE = () =>
  `${API_HOST_TINYGRAIL}/api/chara/user/balance/1/200`

/**
 * ICO参与者
 */
export const API_TINYGRAIL_INITIAL = (icoId, page = 1) =>
  `${API_HOST_TINYGRAIL}/api/chara/initial/users/${icoId}/${page}`

/**
 * 参与ICO
 * @param {*} icoId
 * @param {*} amount
 */
export const API_TINYGRAIL_JOIN = (icoId, amount) =>
  `${API_HOST_TINYGRAIL}/api/chara/join/${icoId}/${amount}`

/**
 * 董事会
 * @param {*} monoId
 */
export const API_TINYGRAIL_USERS = monoId =>
  `${API_HOST_TINYGRAIL}/api/chara/users/${monoId}/1/80`

/**
 * 股息预测
 */
export const API_TINYGRAIL_TEST = () =>
  `${API_HOST_TINYGRAIL}/api/event/share/bonus/test`

/**
 * 角色圣殿
 * @param {*} monoId
 */
export const API_TINYGRAIL_CHARA_TEMPLE = monoId =>
  `${API_HOST_TINYGRAIL}/api/chara/temple/${monoId}`

/**
 * 用户所有角色信息
 */
export const API_TINYGRAIL_CHARA_ALL = hash =>
  `${API_HOST_TINYGRAIL}/api/chara/user/chara/${hash}/1/${TINYGRAIL_ASSETS_LIMIT}`

/**
 * 用户所有圣殿信息
 */
export const API_TINYGRAIL_TEMPLE = hash =>
  `${API_HOST_TINYGRAIL}/api/chara/user/temple/${hash}/1/${TINYGRAIL_ASSETS_LIMIT}`

/**
 * 最近圣殿
 * @param {*} page
 * @param {*} limit
 */
export const API_TINYGRAIL_TEMPLE_LAST = (page = 1, limit = 24) =>
  `${API_HOST_TINYGRAIL}/api/chara/temple/last/${page}/${limit}`

/**
 * 环保刮刮乐
 */
export const API_TINYGRAIL_SCRATCH = () =>
  `${API_HOST_TINYGRAIL}/api/event/scratch/bonus2`

/**
 * 幻想乡刮刮乐
 */
export const API_TINYGRAIL_SCRATCH2 = () =>
  `${API_HOST_TINYGRAIL}/api/event/scratch/bonus2/true`

/**
 * 可拍卖信息
 * @param {*} monoId
 */
export const API_TINYGRAIL_VALHALL_CHARA = monoId =>
  `${API_HOST_TINYGRAIL}/api/chara/user/${monoId}/tinygrail/false`

/**
 * 英灵殿
 * @param {*} page
 * @param {*} limit
 */
export const API_TINYGRAIL_VALHALL_LIST = (page, limit = 20) =>
  `${API_HOST_TINYGRAIL}/api/chara/user/chara/tinygrail/${page}/${limit}`

/**
 * 上周拍卖结果
 * @param {*} monoId
 */
export const API_TINYGRAIL_AUCTION_LIST = monoId =>
  `${API_HOST_TINYGRAIL}/api/chara/auction/list/${monoId}/1`

/**
 * 本周竞拍
 * @method POST
 * @param [monoId]
 */
export const API_TINYGRAIL_AUCTION_STATUS = () =>
  `${API_HOST_TINYGRAIL}/api/chara/auction/list`

/**
 * 拍卖
 * @param {*} monoId
 * @param {*} price
 * @param {*} amount
 */
export const API_TINYGRAIL_AUCTION = (monoId, price, amount) =>
  `${API_HOST_TINYGRAIL}/api/chara/auction/${monoId}/${price}/${amount}`

/**
 * 资产重组 (献祭)
 * @param {*} monoId
 * @param {*} count
 * @param {*} isSale 是否股权融资(卖给英灵殿, 没有道具, 结算日也可以操作)
 */
export const API_TINYGRAIL_SACRIFICE = (monoId, amount, isSale = false) =>
  `${API_HOST_TINYGRAIL}/api/chara/sacrifice/${monoId}/${amount}/${isSale}`

/**
 * 我的拍卖列表
 */
export const API_TINYGRAIL_MY_AUCTION_LIST = () =>
  `${API_HOST_TINYGRAIL}/api/chara/user/auction/1/400`

/**
 * 取消竞拍
 * @param {*} monoId
 */
export const API_TINYGRAIL_AUCTION_CANCEL = id =>
  `${API_HOST_TINYGRAIL}/api/chara/auction/cancel/${id}`

/**
 * Link
 */
export const API_TINYGRAIL_LINK = (monoId, toMonoId) =>
  `${API_HOST_TINYGRAIL}/api/chara/link/${monoId}/${toMonoId}`

/**
 * 每周分红
 */
export const API_TINYGRAIL_BONUS = () =>
  `${API_HOST_TINYGRAIL}/api/event/share/bonus`

/**
 * 每日签到
 */
export const API_TINYGRAIL_BONUS_DAILY = () =>
  `${API_HOST_TINYGRAIL}/api/event/bangumi/bonus/daily`

/**
 * 节日奖励
 */
export const API_TINYGRAIL_BONUS_HOLIDAY = () =>
  `${API_HOST_TINYGRAIL}/api/event/holiday/bonus`

/**
 * 我的道具
 */
export const API_TINYGRAIL_ITEMS = () =>
  `${API_HOST_TINYGRAIL}/api/chara/user/item/0/1/50`

/**
 * 使用道具
 * @param {*} monoId
 * @param {*} type     chaos | guidepost
 * @param {*} toMonoId
 */
export const API_TINYGRAIL_MAGIC = (
  monoId,
  type = 'chaos',
  toMonoId,
  amount = 0,
  isTemple = false
) => {
  if (type === 'stardust') {
    return `${API_HOST_TINYGRAIL}/api/magic/stardust/${monoId}/${toMonoId}/${amount}/${isTemple}`
  }

  return `${API_HOST_TINYGRAIL}/api/magic/${type}/${monoId}${
    toMonoId ? `/${toMonoId}` : ''
  }`
}

/**
 * 每周萌王
 */
export const API_TINYGRAIL_TOP_WEEK = () =>
  `${API_HOST_TINYGRAIL}/api/chara/topweek`

/**
 * 检测用户有多少圣殿
 * @param {*} hash
 */
export const API_TINYGRAIL_USER_TEMPLE_TOTAL = hash =>
  `${API_HOST_TINYGRAIL}/api/chara/user/temple/${hash}/1/1`

/**
 * 检测用户有多少人物
 * @param {*} hash
 */
export const API_TINYGRAIL_USER_CHARA_TOTAL = hash =>
  `${API_HOST_TINYGRAIL}/api/chara/user/chara/${hash}/1/1`

/**
 * 查询
 * @param {*} keyword
 */
export const API_TINYGRAIL_SEARCH = keyword =>
  `${API_HOST_TINYGRAIL}/api/chara/search?keyword=${keyword}`

/**
 * 查询今天刮刮乐刮了多少次
 */
export const API_TINYGRAIL_DAILY_COUNT = () =>
  `${API_HOST_TINYGRAIL}/api/event/daily/count/10`

/**
 * 启动ICO
 * @param {*} monoId
 */
export const API_TINYGRAIL_INIT = monoId =>
  `${API_HOST_TINYGRAIL}/api/chara/init/${monoId}/10000`
