/*
 * 小圣杯
 *  - https://bgm.tv/dev/app/1143
 *
 * @Author: czy0729
 * @Date: 2022-05-22 14:04:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-13 12:21:44
 */
import type { Id, UserId } from '@types'
import type { ApiTinygrailMagic, ApiTinygrailType } from './types'

/* -------------------------------------------------------------------------- */
/* 基础配置                                                                    */
/* -------------------------------------------------------------------------- */

/** 小圣杯 api 域名 */
export const API_HOST_TINYGRAIL = 'https://tinygrail.com'

/** 通用分页限制 */
export const TINYGRAIL_LIMIT = 200
export const TINYGRAIL_ASSETS_LIMIT = 1000

/** K 线起始时间（当天 00:00 +08:00） */
const now = new Date()
const TINYGRAIL_START = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}T00:00:00+08:00`

/* -------------------------------------------------------------------------- */
/* 角色基础                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * 指定人物的数据
 *
 * @query  *body 人物 IDs [1, 2, 3]
 */
export const API_TINYGRAIL_CHARAS = () => `${API_HOST_TINYGRAIL}/api/chara/list`

/** 角色详情 */
export const API_TINYGRAIL_CHARA = (monoId: Id = 0) => `${API_HOST_TINYGRAIL}/api/chara/${monoId}`

/** 角色深度图 */
export const API_TINYGRAIL_DEPTH = (monoId: Id) => `${API_HOST_TINYGRAIL}/api/chara/depth/${monoId}`

/** 角色奖池 */
export const API_TINYGRAIL_CHARA_POOL = (monoId: Id) =>
  `${API_HOST_TINYGRAIL}/api/chara/pool/${monoId}`

/* -------------------------------------------------------------------------- */
/* 列表 / 排行                                                                 */
/* -------------------------------------------------------------------------- */

/** 热门 / 买盘 / 卖盘 / 拍卖 */
export const API_TINYGRAIL_LIST = (
  type: ApiTinygrailType | 'bid' | 'asks' | 'auction',
  page: number = 1,
  limit: number = TINYGRAIL_LIMIT
) => `${API_HOST_TINYGRAIL}/api/chara/${type}/${page}/${limit}`

/** 英灵殿 */
export const API_TINYGRAIL_VALHALL_LIST = (page: number, limit: number = 20) =>
  `${API_HOST_TINYGRAIL}/api/chara/user/chara/tinygrail/${page}/${limit}`

/** 幻想乡 */
export const API_TINYGRAIL_FANTASY_LIST = (page: number = 1, limit: number = 100) =>
  `${API_HOST_TINYGRAIL}/api/chara/user/chara/blueleaf/${page}/${limit}`

/** 精炼排行 */
export const API_TINYGRAIL_REFINE_TEMPLE = () =>
  `${API_HOST_TINYGRAIL}/api/chara/refine/temple/1/100`

/** 番市首富 */
export const API_TINYGRAIL_RICH = (page: number = 1, limit: number = TINYGRAIL_LIMIT) =>
  `${API_HOST_TINYGRAIL}/api/chara/top/${page}/${limit}`

/** 通天塔 (α) */
export const API_TINYGRAIL_STAR = (page: number = 1, limit: number = 50) =>
  `${API_HOST_TINYGRAIL}/api/chara/babel/${page}/${limit}`

/** 通天塔 (α) 排行记录 */
export const API_TINYGRAIL_STAR_LOGS = (page: number = 1, limit: number = 200) =>
  `${API_HOST_TINYGRAIL}/api/chara/star/log/${page}/${limit}`

/* -------------------------------------------------------------------------- */
/* K 线 / 交易记录                                                              */
/* -------------------------------------------------------------------------- */

/** 交易记录 */
export const API_TINYGRAIL_CHARTS = (monoId: Id = 0, date = TINYGRAIL_START) =>
  `${API_HOST_TINYGRAIL}/api/chara/charts/${monoId}/${date}`

/** 发行价 */
export const API_TINYGRAIL_ISSUE_PRICE = (monoId: Id = 0) =>
  `${API_HOST_TINYGRAIL}/api/chara/charts/${monoId}/2021-08-08`

/* -------------------------------------------------------------------------- */
/* 用户 / 账户                                                                 */
/* -------------------------------------------------------------------------- */

/** 登出 */
export const API_TINYGRAIL_LOGOUT = () => `${API_HOST_TINYGRAIL}/api/account/logout`

/** 用户哈希 */
export const API_TINYGRAIL_HASH = () => `${API_HOST_TINYGRAIL}/api/account/recommend`

/** 用户资产 */
export const API_TINYGRAIL_ASSETS = (hash?: UserId) =>
  `${API_HOST_TINYGRAIL}/api/chara/user/assets${hash ? `/${hash}` : ''}`

/** 用户资产概览 */
export const API_TINYGRAIL_CHARA_ASSETS = (hash: UserId) =>
  `${API_HOST_TINYGRAIL}/api/chara/user/assets/${hash}/true`

/** 用户角色挂单 */
export const API_TINYGRAIL_USER_CHARA = (monoId: Id) =>
  `${API_HOST_TINYGRAIL}/api/chara/user/${monoId}`

/** 用户股息预测 */
export const API_TINYGRAIL_TEST = () => `${API_HOST_TINYGRAIL}/api/event/share/bonus/test`

/** 用户所有角色信息 */
export const API_TINYGRAIL_CHARA_ALL = (hash: UserId) =>
  `${API_HOST_TINYGRAIL}/api/chara/user/chara/${hash}/1/${TINYGRAIL_ASSETS_LIMIT}`

/** 用户所有圣殿信息 */
export const API_TINYGRAIL_TEMPLE = (hash: UserId) =>
  `${API_HOST_TINYGRAIL}/api/chara/user/temple/${hash}/1/${TINYGRAIL_ASSETS_LIMIT}`

/** 用户可拍卖信息 */
export const API_TINYGRAIL_VALHALL_CHARA = (monoId: Id) =>
  `${API_HOST_TINYGRAIL}/api/chara/user/${monoId}/tinygrail/false`

/** 检测用户有多少圣殿 */
export const API_TINYGRAIL_USER_TEMPLE_TOTAL = (hash: UserId) =>
  `${API_HOST_TINYGRAIL}/api/chara/user/temple/${hash}/1/1`

/** 检测用户有多少人物 */
export const API_TINYGRAIL_USER_CHARA_TOTAL = (hash: UserId) =>
  `${API_HOST_TINYGRAIL}/api/chara/user/chara/${hash}/1/1`

/* -------------------------------------------------------------------------- */
/* 买卖盘                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * 买入
 *
 * @param monoId
 * @param price
 * @param amount
 * @param ice 冰山委托
 */
export const API_TINYGRAIL_BID = (
  monoId: Id,
  price: string,
  amount: number,
  ice: boolean = false
) => `${API_HOST_TINYGRAIL}/api/chara/bid/${monoId}/${price}/${amount}/${ice}`

/**
 * 卖出
 *
 * @param monoId
 * @param price
 * @param amount
 * @param ice 冰山委托
 */
export const API_TINYGRAIL_ASK = (
  monoId: Id,
  price: string,
  amount: number,
  ice: boolean = false
) => `${API_HOST_TINYGRAIL}/api/chara/ask/${monoId}/${price}/${amount}/${ice}`

/** 取消买入 */
export const API_TINYGRAIL_CANCEL_BID = (id: Id) =>
  `${API_HOST_TINYGRAIL}/api/chara/bid/cancel/${id}`

/** 取消卖出 */
export const API_TINYGRAIL_CANCEL_ASK = (id: Id) =>
  `${API_HOST_TINYGRAIL}/api/chara/ask/cancel/${id}`

/** 我的买单 */
export const API_TINYGRAIL_CHARA_BID = () => `${API_HOST_TINYGRAIL}/api/chara/bids/0/1/800`

/** 我的卖单 */
export const API_TINYGRAIL_CHARA_ASKS = () => `${API_HOST_TINYGRAIL}/api/chara/asks/0/1/800`

/* -------------------------------------------------------------------------- */
/* 持仓 / 资金                                                                 */
/* -------------------------------------------------------------------------- */

/** 我的持仓 */
export const API_TINYGRAIL_MY_CHARA_ASSETS = () =>
  `${API_HOST_TINYGRAIL}/api/chara/user/assets/0/true`

/** 资金日志 */
export const API_TINYGRAIL_BALANCE = (page = 1) =>
  `${API_HOST_TINYGRAIL}/api/chara/user/balance/${page}/200`

/* -------------------------------------------------------------------------- */
/* ICO / 董事会                                                                */
/* -------------------------------------------------------------------------- */

/** 启动 ICO */
export const API_TINYGRAIL_INIT = (monoId: Id) =>
  `${API_HOST_TINYGRAIL}/api/chara/init/${monoId}/10000`

/** ICO 参与者 */
export const API_TINYGRAIL_INITIAL = (icoId: Id, page = 1) =>
  `${API_HOST_TINYGRAIL}/api/chara/initial/users/${icoId}/${page}`

/** 参与 ICO */
export const API_TINYGRAIL_JOIN = (icoId: Id, amount: number) =>
  `${API_HOST_TINYGRAIL}/api/chara/join/${icoId}/${amount}`

/** 董事会 */
export const API_TINYGRAIL_USERS = (monoId: Id) =>
  `${API_HOST_TINYGRAIL}/api/chara/users/${monoId}/1/80`

/* -------------------------------------------------------------------------- */
/* 圣殿                                                                       */
/* -------------------------------------------------------------------------- */

/** 角色圣殿 */
export const API_TINYGRAIL_CHARA_TEMPLE = (monoId: Id) =>
  `${API_HOST_TINYGRAIL}/api/chara/temple/${monoId}`

/** 最近圣殿 */
export const API_TINYGRAIL_TEMPLE_LAST = (page: number = 1, limit: number = 24) =>
  `${API_HOST_TINYGRAIL}/api/chara/temple/last/${page}/${limit}`

/** 我的圣殿 */
export const API_TINYGRAIL_MY_TEMPLE = (hash: UserId, keyword: Id) =>
  `${API_HOST_TINYGRAIL}/api/chara/user/temple/${hash}/1/1?keyword=${keyword}`

/* -------------------------------------------------------------------------- */
/* 资产重组                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * 资产重组 (献祭)
 *
 * @param monoId
 * @param count
 * @param isSale 是否股权融资 (卖给英灵殿, 没有道具, 结算日也可以操作)
 */
export const API_TINYGRAIL_SACRIFICE = (monoId: Id, amount: number, isSale: boolean = false) =>
  `${API_HOST_TINYGRAIL}/api/chara/sacrifice/${monoId}/${amount}/${isSale}`

/** 灌注星之力 */
export const API_TINYGRAIL_CHARA_STAR = (monoId: number = 0, amount: number = 0) =>
  `${API_HOST_TINYGRAIL}/api/chara/star/${monoId}/${amount}`

/** 改变角色圣殿塔图 */
export const API_CHARA_TEMPLE_COVER = (monoId: Id) =>
  `${API_HOST_TINYGRAIL}/api/chara/temple/cover/${monoId}`

/* -------------------------------------------------------------------------- */
/* 拍卖 / 英灵殿                                                                */
/* -------------------------------------------------------------------------- */

/** 上周拍卖结果 */
export const API_TINYGRAIL_AUCTION_LIST = (monoId: Id) =>
  `${API_HOST_TINYGRAIL}/api/chara/auction/list/${monoId}/1`

/**
 * [POST] 本周竞拍
 *
 * @query monoId
 */
export const API_TINYGRAIL_AUCTION_STATUS = () => `${API_HOST_TINYGRAIL}/api/chara/auction/list`

/** 拍卖 */
export const API_TINYGRAIL_AUCTION = (monoId: Id, price: string, amount: number) =>
  `${API_HOST_TINYGRAIL}/api/chara/auction/${monoId}/${price}/${amount}`

/** 取消竞拍 */
export const API_TINYGRAIL_AUCTION_CANCEL = (id: Id) =>
  `${API_HOST_TINYGRAIL}/api/chara/auction/cancel/${id}`

/** 我的拍卖列表 */
export const API_TINYGRAIL_MY_AUCTION_LIST = () =>
  `${API_HOST_TINYGRAIL}/api/chara/user/auction/1/200`

/* -------------------------------------------------------------------------- */
/* 道具 / 魔法                                                                 */
/* -------------------------------------------------------------------------- */

/** 我的道具 */
export const API_TINYGRAIL_ITEMS = () => `${API_HOST_TINYGRAIL}/api/chara/user/item/0/1/50`

/** 使用道具 */
export const API_TINYGRAIL_MAGIC = (
  monoId: Id,
  type: ApiTinygrailMagic = 'chaos',
  toMonoId: Id,
  amount: number = 0,
  isTemple: boolean = false
) => {
  if (type === 'stardust') {
    return `${API_HOST_TINYGRAIL}/api/magic/stardust/${monoId}/${toMonoId}/${amount}/${isTemple}`
  }

  return `${API_HOST_TINYGRAIL}/api/magic/${type}/${monoId}${toMonoId ? `/${toMonoId}` : ''}`
}

/* -------------------------------------------------------------------------- */
/* 活动 / 奖励                                                                 */
/* -------------------------------------------------------------------------- */

/** 每周分红 */
export const API_TINYGRAIL_BONUS = () => `${API_HOST_TINYGRAIL}/api/event/share/bonus`

/** 每日签到 */
export const API_TINYGRAIL_BONUS_DAILY = () => `${API_HOST_TINYGRAIL}/api/event/bangumi/bonus/daily`

/** 节日奖励 */
export const API_TINYGRAIL_BONUS_HOLIDAY = () => `${API_HOST_TINYGRAIL}/api/event/holiday/bonus`

/** 环保刮刮乐 */
export const API_TINYGRAIL_SCRATCH = () => `${API_HOST_TINYGRAIL}/api/event/scratch/bonus2`

/** 幻想乡刮刮乐 */
export const API_TINYGRAIL_SCRATCH2 = () => `${API_HOST_TINYGRAIL}/api/event/scratch/bonus2/true`

/** 查询今天刮刮乐刮了多少次 */
export const API_TINYGRAIL_DAILY_COUNT = () => `${API_HOST_TINYGRAIL}/api/event/daily/count/10`

/* -------------------------------------------------------------------------- */
/* 搜索 / 统计                                                                 */
/* -------------------------------------------------------------------------- */

/** 查询 */
export const API_TINYGRAIL_SEARCH = (keyword: string) =>
  `${API_HOST_TINYGRAIL}/api/chara/search?keyword=${keyword}`

/** 每周萌王 */
export const API_TINYGRAIL_TOP_WEEK = () => `${API_HOST_TINYGRAIL}/api/chara/topweek`

/** 历史萌王 */
export const API_TINYGRAIL_TOP_WEEK_HISTORY = (prev: number = 1) =>
  `${API_HOST_TINYGRAIL}/api/chara/topweek/history/${prev}`

/* -------------------------------------------------------------------------- */
/* 杂项                                                                        */
/* -------------------------------------------------------------------------- */

/** OSS 签名 */
export const API_TINYGRAIL_OSS_SIGNATURE = (hash: string) =>
  `${API_HOST_TINYGRAIL}/api/chara/oss/sign/cover/${hash}/image%2Fjpeg`

/** 链接 */
export const API_TINYGRAIL_LINK = (monoId: Id, toMonoId: Id) =>
  `${API_HOST_TINYGRAIL}/api/chara/link/${monoId}/${toMonoId}`
