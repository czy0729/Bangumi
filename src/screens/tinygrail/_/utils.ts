/*
 * @Author: czy0729
 * @Date: 2019-10-04 13:51:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 21:05:59
 */
import { ToastAndroid } from 'react-native'
import { _, tinygrailStore } from '@stores'
import {
  desc,
  formatNumber,
  getTimestamp,
  info,
  lastDate,
  throttle,
  tinygrailFixedTime,
  toFixed
} from '@utils'
import { B, IOS, M } from '@constants'
import { ColorValue } from '@types'

/** 等级背景颜色 */
export function getLevelBackground(level: number) {
  let backgroundColor: ColorValue
  switch (level) {
    case 0:
      backgroundColor = '#aaa'
      break

    case 1:
      backgroundColor = _.colorBid
      break

    case 2:
      backgroundColor = _.colorPrimary
      break

    case 3:
      backgroundColor = '#ffdc51'
      break

    case 4:
      backgroundColor = _.colorWarning
      break

    case 5:
      backgroundColor = _.colorMain
      break

    default:
      backgroundColor = _.colorAsk
      break
  }
  return backgroundColor
}

/** 计算角色当前股息比率 */
export function calculateRatio(rank = 0) {
  return Math.max(Number(toFixed((601 - rank) * 0.005, 2)), 0)
}

/** 计算角色当前股息 (活股) */
export function calculateRate(rate = 0, rank = 0, stars = 0) {
  if (rank && rank < 501 && rate > 0) return calculateRatio(rank) * rate
  return stars * 2
}

/** 计算角色当前股息 (固定资产) */
export function calculateTempleRate(rate = 0, rank = 0, stars = 0, level = 0, refine = 0) {
  if (rank && rank < 501 && rate > 0) {
    return (calculateRate(rate, rank, stars) / (2 * level + 1)) * (2 * (level + refine) + 1)
  }
  return stars * 2
}

/** 计算角色当前总股息 */
export function calculateTotalRate(
  item: {
    rate: any
    rank: any
    stars: any
    state: any
    sacrifices: any
    assets: any
  },
  isBase: boolean = false
) {
  const currentRate = isBase ? item.rate || 0 : calculateRate(item.rate, item.rank, item.stars)
  return ((item.state || 0) + (item.assets || item.sacrifices || 0)) * currentRate
}

/** 计算角色精炼消耗 */
export function calculateRefineCost(refine: number = 0) {
  return Math.floor(Math.pow(1.3, refine) * 10000)
}

/** 数目缩略 */
export function decimal(value: number) {
  const _value = Math.abs(value)
  if (_value >= B) return `${value < 0 ? '-' : ''}${toFixed(_value / B, 1)}亿`
  if (_value >= M) return `${value < 0 ? '-' : ''}${toFixed(_value / M, 1)}万`
  return `${value < 0 ? '-' : ''}${formatNumber(_value, 0)}`
}

/** 列表排序 */
export function sortList(sort: string, direction: string, list: any[]) {
  const base = direction === 'down' ? 1 : -1
  switch (sort) {
    case SORT_SSGX.value:
      return list
        .slice()
        .sort(
          (a, b) =>
            (calculateRate(b.rate, b.rank, b.stars) - calculateRate(a.rate, a.rank, a.stars)) * base
        )

    case SORT_SSZGX.value:
    case SORT_ZGX.value:
      return list
        .slice()
        .sort((a, b) => (calculateTotalRate(b, true) - calculateTotalRate(a, true)) * base)

    case SORT_RK.value:
      return list.slice().sort((a, b) => ((a.rank || 0) - (b.rank || 0)) * base)

    case SORT_XX.value:
      return list.slice().sort((a, b) => ((b.stars || 0) - (a.stars || 0)) * base)

    case SORT_GF.value:
      return list.slice().sort((a, b) => ((b.amount || 0) - (a.amount || 0)) * base)

    case SORT_SC.value:
      return list.slice().sort((a, b) => {
        const aCollected = tinygrailStore.collected(a.id || 0)
        const bCollected = tinygrailStore.collected(b.id || 0)
        return (bCollected - aCollected) * base
      })

    case SORT_GX.value:
      return list.slice().sort((a, b) => ((b.rate || 0) - (a.rate || 0)) * base)

    case SORT_GXB.value:
      return list
        .slice()
        .sort(
          (a, b) => ((b.rate || 0) / (b.current || 10) - (a.rate || 0) / (a.current || 10)) * base
        )

    case SORT_SDGX.value:
      return list
        .slice()
        .sort((a, b) => ((b.rate || 0) * (b.level || 0) - (a.rate || 0) * (a.level || 0)) * base)

    case SORT_SDGXB.value:
      return list
        .slice()
        .sort(
          (a, b) =>
            (((b.rate || 0) * (b.level || 0)) / (b.current || 10) -
              ((a.rate || 0) * (a.level || 0)) / (a.current || 10)) *
            base
        )

    case SORT_DJ.value:
      return list
        .slice()
        .sort((a, b) => ((b.cLevel || b.level || 1) - (a.cLevel || a.level || 1)) * base)

    case SORT_CGS.value:
      return list.slice().sort((a, b) => ((b.state || 0) - (a.state || 0)) * base)

    case SORT_GDZC.value:
      return list.slice().sort((a, b) => ((b.sacrifices || 0) - (a.sacrifices || 0)) * base)

    case SORT_CCJZ.value:
      return list
        .slice()
        .sort(
          (a, b) => ((b.state || 0) * (b.current || 0) - (a.state || 0) * (a.current || 0)) * base
        )

    case SORT_HYD.value:
      return list
        .slice()
        .sort((a, b) => desc(String(b.lastOrder || ''), String(a.lastOrder || '')) * base)

    case SORT_SCJ.value:
      return list.slice().sort((a, b) => ((b.marketValue || 0) - (a.marketValue || 0)) * base)

    case SORT_FHL.value:
      return list.slice().sort((a, b) => ((b.total || 0) - (a.total || 0)) * base)

    case SORT_DQJ.value:
      return list.slice().sort((a, b) => ((b.current || 0) - (a.current || 0)) * base)

    case SORT_DQZD.value:
      return list.slice().sort((a, b) => ((b.fluctuation || 0) - (a.fluctuation || 0)) * base)

    case SORT_XFJL.value:
      return list.slice().sort((a, b) => (parseInt(b.bonus || 0) - parseInt(a.bonus || 0)) * base)

    case SORT_XZL.value:
      return list.slice().sort((a, b) => ((b.starForces || 0) - (a.starForces || 0)) * base)

    case SORT_PM.value:
      return list.slice().sort((a, b) => ((a.rank || 0) - (b.rank || 0)) * base)

    case SORT_XJB.value:
      return list
        .slice()
        .sort(
          (a, b) =>
            (calculateRate(b.rate, b.rank, b.stars) / (b.current || 10000) -
              calculateRate(a.rate, a.rank, a.stars) / (a.current || 10000)) *
            base
        )

    case SORT_MWCS.value:
      return list.slice().sort((a, b) => ((b.crown || 0) - (a.crown || 0)) * base)

    case SORT_SSSJ.value:
      return list
        .slice()
        .sort((a, b) => String(b.listedDate || '').localeCompare(String(a.listedDate || '')) * base)

    default:
      return list
  }
}

/** 等级筛选列表 */
export function levelList(level: string | number, list: any[]) {
  if (level === undefined) return list

  return list.filter(item => (item.cLevel || item.level) == level)
}

/** 小圣杯用最近时间 */
export function tinygrailLastDate(time: string) {
  return lastDate(getTimestamp(tinygrailFixedTime(time)))
}

/** @deprecated 获取角色关联条目信息 */
export function relation(data: any) {
  return data

  // const XSBRelationData = getXsbRelationOTA()
  // return {
  //   ...data,
  //   list: data.list.map(item => {
  //     const i = {
  //       ...item
  //     }
  //     const { s, r = [] } = XSBRelationData.data[item.monoId || item.id] || {}
  //     if (s) {
  //       i._subject = XSBRelationData.name[s]
  //       i._subjectId = s
  //     }
  //     if (r) i._relation = r
  //     return i
  //   })
  // }
}

/** @deprecated 同排名 */
export const SORT_RK = {
  label: '通天塔',
  value: 'rk'
} as const

export const SORT_XX = {
  label: '星级',
  value: 'xx'
} as const

export const SORT_XZL = {
  label: '星之力',
  value: 'xzl'
} as const

export const SORT_PM = {
  label: '排名',
  value: 'pm'
} as const

export const SORT_GF = {
  label: '股份',
  value: 'gf'
} as const

export const SORT_SC = {
  label: '收藏',
  value: 'sc'
} as const

/** @deprecated */
export const SORT_GX = {
  label: '股息',
  value: 'gx'
} as const

/** @deprecated 总股息 */
export const SORT_ZGX = {
  label: '合计股息',
  value: 'zgx'
} as const

/** 生效股息 */
export const SORT_SSGX = {
  label: '实际股息',
  value: 'ssgx'
} as const

export const SORT_XJB = {
  label: '性价比',
  value: 'xjb'
} as const

/** 合计股息 (生效总股息) */
export const SORT_SSZGX = {
  label: '合计股息',
  value: 'sszgx'
} as const

export const SORT_GXB = {
  label: '流动股息比',
  value: 'gxb'
} as const

export const SORT_SDGX = {
  label: '圣殿股息',
  value: 'sdgx'
} as const

export const SORT_SDGXB = {
  label: '圣殿股息比',
  value: 'sdgxb'
} as const

export const SORT_DJ = {
  label: '等级',
  value: 'dj'
} as const

export const SORT_GDS = {
  label: '挂单',
  value: 'cgs'
} as const

export const SORT_CGS = {
  label: '持股数',
  value: 'cgs'
} as const

/** 塔 */
export const SORT_GDZC = {
  label: '固定资产',
  value: 'gdzc'
} as const

export const SORT_CCJZ = {
  label: '持仓价值',
  value: 'ccjz'
} as const

export const SORT_HYD = {
  label: '活跃度',
  value: 'hyd'
} as const

/** 市场价 */
export const SORT_SCJ = {
  label: '最高买单',
  value: 'scj'
} as const

/** 发行量 */
export const SORT_FHL = {
  label: '流通量',
  value: 'fhl'
} as const

export const SORT_DQJ = {
  label: '当前价',
  value: 'dqj'
} as const

export const SORT_DQZD = {
  label: '当前涨跌',
  value: 'dqzd'
} as const

/** @deprecated */
export const SORT_XFJL = {
  label: '新番奖励',
  value: 'xfjl'
} as const

export const SORT_MWCS = {
  label: '萌王次数',
  value: 'mwcs'
} as const

export const SORT_YLDSL = {
  label: '英灵殿数量',
  value: 'yldsl'
} as const

export const SORT_HXXSL = {
  label: '幻想乡数量',
  value: 'hxxsl'
} as const

export const SORT_ST = {
  label: 'ST',
  value: 'st'
} as const

export const SORT_SSSJ = {
  label: '上市时间',
  value: 'sssj'
} as const

function _info(message: string) {
  info(message, 0.4)
}

export const throttleInfo = throttle(_info, IOS ? 400 : ToastAndroid.SHORT) as (
  info: string
) => void
