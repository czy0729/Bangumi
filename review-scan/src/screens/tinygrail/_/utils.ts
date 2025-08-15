/*
 * @Author: czy0729
 * @Date: 2019-10-04 13:51:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-02 16:02:06
 */
import { ToastAndroid } from 'react-native'
import { _, tinygrailStore } from '@stores'
import {
  decimal,
  desc,
  formatNumber,
  getTimestamp,
  info,
  lastDate,
  throttle,
  tinygrailFixedTime,
  toFixed
} from '@utils'
import { IOS } from '@constants'
import { ColorValue, ListArray } from '@types'

export { decimal }

/** 等级背景颜色 */
export function getLevelBackground(level: number): ColorValue {
  switch (level) {
    case 0:
      return '#aaa'

    case 1:
      return _.colorBid

    case 2:
      return _.colorPrimary

    case 3:
      return '#ffdc51'

    case 4:
      return _.colorWarning

    case 5:
      return _.colorMain

    default:
      return _.colorAsk
  }
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
    rate?: any
    rank?: any
    stars?: any
    amount?: any
    state?: any
    sacrifices?: any
    assets?: any
  } = {},

  /** 是否计算基本股息 (通常不传, 并没有太大意义) */
  isBase: boolean = false
) {
  return (
    (item.amount || item.state || 0) *
    (isBase ? item.rate || 0 : calculateRate(item.rate, item.rank, item.stars))
  )
}

/** 计算角色当前圣殿总股息 */
export function calculateTempleTotalRate(
  item: {
    rate?: any
    rank?: any
    stars?: any
    level?: any
    cLevel?: any
    refine?: any
    assets?: any
  } = {}
) {
  return (
    calculateTempleRate(item.rate, item.rank, item.stars, item.cLevel || item.level, item.refine) *
    (item.assets || 0)
  )
}

/** 计算角色精炼消耗 */
export function calculateRefineCost(refine: number = 0) {
  return Math.floor(Math.pow(1.3, refine) * 10000)
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

/** 角色星之力 (所有用户转化总星之力) */
export const SORT_XZL = {
  label: '星之力',
  value: 'xzl'
} as const

/** 角色星之力 (你转化的星之力) */
export const SORT_ZHXZL = {
  label: '转化星之力',
  value: 'zhxzl'
} as const

/** 角色星级 (单一用户献祭1000固定资产转星之力, 升级1星) */
export const SORT_XX = {
  label: '星级',
  value: 'xx'
} as const

/** 角色星之力排名 (前500名享受股息加成) */
export const SORT_PM = {
  label: '排名',
  value: 'pm'
} as const

export const SORT_GF = {
  label: '股份',
  value: 'gf'
} as const

/** 角色收藏 (是否本地收藏) */
export const SORT_SC = {
  label: '收藏',
  value: 'sc'
} as const

/** 角色基本股息 (不含任何加成) */
export const SORT_GX = {
  label: '基本股息',
  value: 'gx'
} as const

/** 实际股息 (含角色基本加成) */
export const SORT_SSGX = {
  label: '实际股息',
  value: 'ssgx'
} as const

export const SORT_XJB = {
  label: '性价比',
  value: 'xjb'
} as const

/** 合计股息 (生效总股息) */
export const SORT_HJGX = {
  label: '合计股息',
  value: 'sszgx'
} as const

/** 圣殿总股息 */
export const SORT_SDZGX = {
  label: '圣殿总股息',
  value: 'sdzgx'
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
  label: '角色等级',
  value: 'dj'
} as const

export const SORT_JLDJ = {
  label: '精炼等级',
  value: 'jldj'
} as const

export const SORT_GDS = {
  label: '挂单',
  value: 'cgs'
} as const

export const SORT_CGS = {
  label: '持股数',
  value: 'cgs'
} as const

/** 圣殿固定资产 */
export const SORT_GDZC = {
  label: '固定资产',
  value: 'gdzc'
} as const

/** 圣殿剩余资产 */
export const SORT_SYZC = {
  label: '剩余资产',
  value: 'syzc'
} as const

/** 圣殿受损度 */
export const SORT_SSD = {
  label: '受损度',
  value: 'ssd'
} as const

/** 圣殿完整度 */
export const SORT_WZD = {
  label: '完整度',
  value: 'wzd'
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

/** 萌王次数 */
export const SORT_MWCS = {
  label: '萌王次数',
  value: 'mwcs'
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

/** 列表排序 */
export function sortList<T>(sort: string, direction: '' | 'up' | 'down', list: ListArray<T>): T[] {
  const base = direction === 'down' ? 1 : -1
  const sortedList = list.slice()

  if (sort === SORT_SSD.value) {
    return sortedList
      .filter((item: any) => !(item.assets === 0 || item.assets === item.sacrifices))
      .sort(
        (a: any, b: any) =>
          ((b.sacrifices || 0) - (b.assets || 0) - ((a.sacrifices || 0) - (a.assets || 0))) * base
      )
  }

  if (sort === SORT_WZD.value) {
    return sortedList
      .filter(
        (item: any) =>
          !(
            item.assets === 0 ||
            item.assets === item.sacrifices ||
            item.sacrifices - item.assets < 100
          )
      )
      .sort((a: any, b: any) => {
        const aValue = !a.assets || !a.sacrifices ? 0 : a.assets / a.sacrifices
        const bValue = !b.assets || !b.sacrifices ? 0 : b.assets / b.sacrifices
        return (bValue - aValue) * base
      })
  }

  const numericSort = (a: any, b: any, key: string) => ((b[key] || 0) - (a[key] || 0)) * base
  if (sort === SORT_CGS.value) {
    return sortedList
      .filter((item: any) => item.state)
      .sort((a: any, b: any) => numericSort(a, b, 'state'))
  }

  if (sort === SORT_JLDJ.value) {
    return sortedList.sort((a: any, b: any) => {
      if ((a.refine || 0) === (b.refine || 0)) return numericSort(a, b, 'state')
      return numericSort(a, b, 'refine')
    })
  }

  const calculatedSort = (a: any, b: any, calcFn: (item: any) => number) =>
    (calcFn(b) - calcFn(a)) * base

  const sortHandlers: Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (a: any, b: any) => number
  > = {
    [SORT_CCJZ.value]: (a, b) =>
      ((b.state || 0) * (b.current || 0) - (a.state || 0) * (a.current || 0)) * base,
    [SORT_DJ.value]: (a, b) => numericSort(a, b, 'cLevel') || numericSort(a, b, 'level'),
    [SORT_DQJ.value]: (a, b) => numericSort(a, b, 'current'),
    [SORT_DQZD.value]: (a, b) => numericSort(a, b, 'fluctuation'),
    [SORT_FHL.value]: (a, b) => numericSort(a, b, 'total'),
    [SORT_GDZC.value]: (a, b) => numericSort(a, b, 'sacrifices'),
    [SORT_GF.value]: (a, b) => numericSort(a, b, 'amount'),
    [SORT_GX.value]: (a, b) => numericSort(a, b, 'rate'),
    [SORT_GXB.value]: (a, b) =>
      ((b.rate || 0) / (b.current || 10) - (a.rate || 0) / (a.current || 10)) * base,
    [SORT_HYD.value]: (a, b) => desc(String(b.lastOrder || ''), String(a.lastOrder || '')) * base,
    [SORT_MWCS.value]: (a, b) => numericSort(a, b, 'crown'),
    [SORT_PM.value]: (a, b) => ((a.rank || 0) - (b.rank || 0)) * base,
    [SORT_SC.value]: (a, b) =>
      (tinygrailStore.collected(b.id || 0) - tinygrailStore.collected(a.id || 0)) * base,
    [SORT_SCJ.value]: (a, b) => numericSort(a, b, 'marketValue'),
    [SORT_SDGX.value]: (a, b) =>
      calculatedSort(a, b, item =>
        calculateTempleRate(
          item.rate,
          item.rank,
          item.stars,
          item.cLevel || item.level,
          item.refine
        )
      ),
    [SORT_SDGXB.value]: (a, b) =>
      (((b.rate || 0) * (b.level || 0)) / (b.current || 10) -
        ((a.rate || 0) * (a.level || 0)) / (a.current || 10)) *
      base,
    [SORT_SDZGX.value]: (a, b) => calculatedSort(a, b, item => calculateTempleTotalRate(item)),
    [SORT_SSGX.value]: (a, b) =>
      calculatedSort(a, b, item => calculateRate(item.rate, item.rank, item.stars)),
    [SORT_SSSJ.value]: (a, b) =>
      String(b.listedDate || '').localeCompare(String(a.listedDate || '')) * base,
    [SORT_SYZC.value]: (a, b) => numericSort(a, b, 'assets'),
    [SORT_XFJL.value]: (a, b) => (parseInt(b.bonus || '0') - parseInt(a.bonus || '0')) * base,
    [SORT_XJB.value]: (a, b) =>
      (calculateRate(b.rate, b.rank, b.stars) / (b.current || 10000) -
        calculateRate(a.rate, a.rank, a.stars) / (a.current || 10000)) *
      base,
    [SORT_XX.value]: (a, b) => numericSort(a, b, 'stars'),
    [SORT_XZL.value]: (a, b) => numericSort(a, b, 'starForces'),
    [SORT_HJGX.value]: (a, b) =>
      calculatedSort(a, b, item => calculateTotalRate(item) + calculateTempleTotalRate(item)),
    [SORT_ZHXZL.value]: (a, b) => numericSort(a, b, 'userStarForces')
  }

  if (sortHandlers[sort]) return sortedList.sort(sortHandlers[sort])

  return sortedList as T[]
}

/** 等级筛选列表 */
export function levelList<T>(level: string | number, list: ListArray<T>): T[] {
  if (level === undefined) return list as T[]

  return list.filter(item => ((item as any)?.cLevel || (item as any)?.level) == level)
}

/** 获取当前排序, 角色、圣殿根据的根据信息 */
export function getCharaItemSortText(props: any, showAll: boolean = false) {
  const {
    assets,
    cLevel,
    crown,
    current,
    level,
    listedDate,
    rank,
    rate,
    refine,
    sacrifices,
    sort,
    starForces,
    stars,
    state,
    total,
    userStarForces
  } = props || {}
  if (!sort) return ''

  const sortHandlers = {
    [SORT_CCJZ.value]: () => `${SORT_CCJZ.label} ${decimal((state || 0) * (current || 0))}`,
    [SORT_FHL.value]: () => `${SORT_FHL.label} ${decimal(total || 0)}`,
    [SORT_SDZGX.value]: () => `总股息 ${decimal(calculateTempleTotalRate(props))}`,
    [SORT_SSGX.value]: () =>
      `${SORT_SSGX.label} ${Number(toFixed(calculateRate(rate, rank, stars), 1))}`,
    [SORT_SSSJ.value]: () => `${SORT_SSSJ.label} ${String(listedDate || '').split('T')?.[0]}`,
    [SORT_HJGX.value]: () =>
      `${SORT_HJGX.label} ${decimal(calculateTotalRate(props) + calculateTempleTotalRate(props))}`,
    [SORT_XJB.value]: () =>
      `${SORT_XJB.label} ${Number(toFixed(calculateRate(rate, rank, stars) / (current || 10000)))}`,
    [SORT_XX.value]: () => `${SORT_XX.label} ${stars}`,
    [SORT_XZL.value]: () =>
      `${SORT_XZL.label} ${formatNumber(starForces, 0)} (${formatNumber(userStarForces, 0)})`,

    [SORT_GDZC.value]: () => `${SORT_GDZC.label} ${decimal(sacrifices || 0)}`,
    [SORT_GX.value]: () => `${SORT_GX.label} ${toFixed(rate || 0, 1)}`,
    [SORT_JLDJ.value]: () => `精炼 ${refine || 0}`,
    [SORT_SDGX.value]: () =>
      `${SORT_SDGX.label} ${toFixed(
        calculateTempleRate(rate, rank, stars, cLevel || level, refine),
        1
      )}`,
    [SORT_SSD.value]: () =>
      `${SORT_SSD.label} ${formatNumber((sacrifices || 0) - (assets || 0), 0)}`,
    [SORT_WZD.value]: () => `${SORT_WZD.label} ${toFixed((assets / (sacrifices || 1)) * 100, 1)}%`,
    [SORT_ZHXZL.value]: () =>
      `星之力 ${formatNumber(starForces, 0)} (${formatNumber(userStarForces, 0)})`
  }

  const showAllHandlers = {
    [SORT_CGS.value]: () => `${SORT_CGS.label} ${formatNumber(state || 0, 0)}`,
    [SORT_DJ.value]: () => `等级 ${cLevel || level || 0}`,
    [SORT_PM.value]: () => `${SORT_PM.label} ${rank || 0}`,
    [SORT_DQJ.value]: () => `${SORT_DQJ.label} ${decimal(current || 0)}`,
    [SORT_SYZC.value]: () => `${SORT_SYZC.label} ${decimal(assets || 0)}`,
    [SORT_MWCS.value]: () => `${SORT_MWCS.label} ${crown}`
  }

  if (sortHandlers[sort]) return sortHandlers[sort]()

  if (showAll && showAllHandlers[sort]) return showAllHandlers[sort]()

  return ''
}

const CHARA_LEVEL_LOWEST_PRICE = {
  1: 5,
  2: 14,
  3: 28,
  4: 46,
  5: 75,
  6: 101,
  7: 132,
  8: 167,
  9: 207,
  10: 252,
  11: 301,
  12: 354,
  13: 412,
  14: 474,
  15: 541,
  16: 613,
  17: 688,
  18: 769,
  19: 854,
  20: 943,
  21: 1034,
  22: 1135,
  23: 1237
} as const

export function getCharaLevelLowestPrice(level: number = 1) {
  if (level > 23) return 1500
  return CHARA_LEVEL_LOWEST_PRICE[level] || 5
}
