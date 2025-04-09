/*
 * @Author: czy0729
 * @Date: 2021-03-05 16:47:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-07 07:18:22
 */
import {
  SORT_CCJZ,
  SORT_CGS,
  SORT_DJ,
  SORT_DQJ,
  SORT_FHL,
  SORT_GDZC,
  SORT_GX,
  SORT_HJGX,
  SORT_JLDJ,
  SORT_MWCS,
  SORT_PM,
  SORT_SDGX,
  SORT_SDZGX,
  SORT_SSD,
  SORT_SSGX,
  SORT_SSSJ,
  SORT_SYZC,
  SORT_WZD,
  SORT_XJB,
  SORT_XX,
  SORT_XZL,
  SORT_ZHXZL
} from '@tinygrail/_/utils'

export const COMPONENT = 'TinygrailCharaAssets'

export const TABS = [
  {
    title: '总览',
    key: 'merge'
  },
  {
    title: '人物',
    key: 'chara'
  },
  {
    title: '圣殿',
    key: 'temple'
  },
  {
    title: 'ICO',
    key: 'ico'
  }
] as const

const SORT_DS_CONFIG = [
  /** 持股数 */
  {
    data: SORT_CGS,
    index: [0, 1]
  },

  /** 精炼等级 */
  {
    data: SORT_JLDJ,
    index: [0, 2]
  },

  /** 角色等级 */
  {
    data: SORT_DJ,
    index: [0, 1, 2]
  },

  /** 星级 */
  {
    data: SORT_XX,
    index: [0, 1, 2]
  },

  /** 星之力 */
  {
    data: SORT_XZL,
    index: [0, 1, 2]
  },

  /** 转化星之力 */
  {
    data: SORT_ZHXZL,
    index: [0, 2]
  },

  /** 排名 */
  {
    data: SORT_PM,
    index: [0, 1, 2]
  },

  /** 当前价 */
  {
    data: SORT_DQJ,
    index: [0, 1]
  },

  /** 性价比 */
  {
    data: SORT_XJB,
    index: [0, 1]
  },

  /** 固定资产 */
  {
    data: SORT_GDZC,
    index: [0, 2]
  },

  /** 剩余资产 */
  {
    data: SORT_SYZC,
    index: [0, 2]
  },

  /** 基本股息 */
  {
    data: SORT_GX,
    index: [0, 1, 2]
  },

  /** 实际股息 */
  {
    data: SORT_SSGX,
    index: [0, 1]
  },

  /** 圣殿股息 */
  {
    data: SORT_SDGX,
    index: [0, 2]
  },

  /** 圣殿总股息 */
  {
    data: SORT_SDZGX,
    index: [0, 2]
  },

  /** 合计股息 */
  {
    data: SORT_HJGX,
    index: [0]
  },

  /** 流通量 */
  {
    data: SORT_FHL,
    index: [0, 1]
  },

  /** 萌王次数 */
  {
    data: SORT_MWCS,
    index: [0, 1]
  },

  /** 上市时间 */
  {
    data: SORT_SSSJ,
    index: [0, 1]
  },

  /** 持仓价值 */
  {
    data: SORT_CCJZ,
    index: [0]
  },

  /** 受损度 */
  {
    data: SORT_SSD,
    index: [0, 2]
  },

  /** 完整度 */
  {
    data: SORT_WZD,
    index: [0, 2]
  }
] as const

export const SORT_DS = SORT_DS_CONFIG.map(item => item.data)

export const SORT_CHARA_DS = SORT_DS_CONFIG.filter(item =>
  (item.index as readonly number[]).includes(1)
).map(item => item.data)

export const SORT_TEMPLE_DS = SORT_DS_CONFIG.filter(item =>
  (item.index as readonly number[]).includes(2)
).map(item => item.data)

export const PER_BATCH_COUNT = 50
