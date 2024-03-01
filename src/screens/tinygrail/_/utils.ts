/*
 * @Author: czy0729
 * @Date: 2019-10-04 13:51:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-02 05:35:31
 */
import { ToastAndroid } from 'react-native'
import { _, tinygrailStore } from '@stores'
import { desc, formatNumber, info, throttle, toFixed } from '@utils'
import { B, getXsbRelationOTA, IOS, M } from '@constants'
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

/** 计算角色当前股息 */
export function calculateRate(rate = 0, rank = 0, stars = 0) {
  if (rank < 501 && rate > 0) return (601 - rank) * 0.005 * rate
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
      return list.slice().sort((a, b) => (calculateTotalRate(b) - calculateTotalRate(a)) * base)

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
      return list.slice().sort((a, b) => ((b.level || 1) - (a.level || 1)) * base)

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

    default:
      return list
  }
}

/** 等级筛选列表 */
export function levelList(level: string | number, list: any[]) {
  if (level === undefined) return list
  return list.filter(item => item.level == level)
}

/** 获取角色关联条目信息 */
export function relation(data) {
  const XSBRelationData = getXsbRelationOTA()
  return {
    ...data,
    list: data.list.map(item => {
      const i = {
        ...item
      }
      const { s, r = [] } = XSBRelationData.data[item.monoId || item.id] || {}
      if (s) {
        i._subject = XSBRelationData.name[s]
        i._subjectId = s
      }
      if (r) i._relation = r
      return i
    })
  }
}

export const SORT_RK = {
  label: '通天塔',
  value: 'rk'
} as const

export const SORT_XX = {
  label: '星星',
  value: 'xx'
} as const

export const SORT_GF = {
  label: '股份',
  value: 'gf'
} as const

export const SORT_SC = {
  label: '收藏',
  value: 'sc'
} as const

export const SORT_GX = {
  label: '股息',
  value: 'gx'
} as const

export const SORT_ZGX = {
  label: '总股息',
  value: 'zgx'
} as const

export const SORT_SSGX = {
  label: '生效股息',
  value: 'ssgx'
} as const

export const SORT_SSZGX = {
  label: '生效总股息',
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
  label: '持股',
  value: 'cgs'
} as const

export const SORT_GDZC = {
  label: '塔',
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

export const SORT_SCJ = {
  label: '市场价',
  value: 'scj'
} as const

export const SORT_FHL = {
  label: '发行量',
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

export const SORT_XFJL = {
  label: '新番奖励',
  value: 'xfjl'
} as const

function _info(message: string) {
  info(message, 0.4)
}

export const throttleInfo = throttle(_info, IOS ? 400 : ToastAndroid.SHORT) as (
  info: string
) => void
