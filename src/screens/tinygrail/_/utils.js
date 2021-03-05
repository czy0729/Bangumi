/*
 * @Author: czy0729
 * @Date: 2019-10-04 13:51:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-06 07:20:36
 */
import { ToastAndroid } from 'react-native'
import { tinygrailStore } from '@stores'
import { throttle, toFixed, formatNumber } from '@utils'
import { info } from '@utils/ui'
import { IOS, B, M } from '@constants'
import XSBRelationData from '@constants/json/xsb-relation'

/**
 * 计算角色当前股息
 *  - version 2021/03/05
 * @param {*} rate
 * @param {*} rank
 * @param {*} stars
 */
export function calculateRate(rate = 0, rank = 0, stars = 0) {
  if (rank < 501 && rate > 0) {
    return (601 - rank) * 0.005 * rate
  }
  return stars * 2
}

/**
 * 计算角色当前总股息
 * @param {*} item
 */
export function calculateTotalRate(item, isBase) {
  const currentRate = isBase
    ? item.rate || 0
    : calculateRate(item.rate, item.rank, item.stars)
  return ((item.state || 0) + (item.sacrifices || 0)) * currentRate
}

/**
 * 数目缩略
 * @param {*} value
 */
export function decimal(value) {
  if (value > B) return `${toFixed(value / B, 1)}亿`
  if (value > M) return `${toFixed(value / M, 1)}万`
  return formatNumber(value, 0)
}

/**
 * 列表排序
 * @param {*} sort
 * @param {*} direction
 * @param {*} list
 */
export function sortList(sort, direction, list) {
  const base = direction === 'down' ? 1 : -1
  switch (sort) {
    case SORT_SSGX.value:
      return list.sort(
        (a, b) =>
          (calculateRate(b.rate, b.rank, b.stars) -
            calculateRate(a.rate, a.rank, a.stars)) *
          base
      )

    case SORT_SSZGX.value:
      return list.sort(
        (a, b) => (calculateTotalRate(b) - calculateTotalRate(a)) * base
      )

    case SORT_ZGX.value:
      return list.sort(
        (a, b) =>
          (calculateTotalRate(b, true) - calculateTotalRate(a, true)) * base
      )

    case SORT_RK.value:
      return list.sort((a, b) => ((a.rank || 0) - (b.rank || 0)) * base)

    case SORT_XX.value:
      return list.sort((a, b) => ((b.stars || 0) - (a.stars || 0)) * base)

    case SORT_GF.value:
      return list.sort((a, b) => ((b.amount || 0) - (a.amount || 0)) * base)

    case SORT_SC.value:
      return list.sort((a, b) => {
        const aCollected = tinygrailStore.collected(a.id || 0)
        const bCollected = tinygrailStore.collected(b.id || 0)
        return (bCollected - aCollected) * base
      })

    case SORT_GX.value:
      return list.sort((a, b) => ((b.rate || 0) - (a.rate || 0)) * base)

    case SORT_GXB.value:
      return list.sort(
        (a, b) =>
          ((b.rate || 0) / (b.current || 10) -
            (a.rate || 0) / (a.current || 10)) *
          base
      )

    case SORT_SDGX.value:
      return list.sort(
        (a, b) =>
          ((b.rate || 0) * (b.level || 0) - (a.rate || 0) * (a.level || 0)) *
          base
      )

    case SORT_SDGXB.value:
      return list.sort(
        (a, b) =>
          (((b.rate || 0) * (b.level || 0)) / (b.current || 10) -
            ((a.rate || 0) * (a.level || 0)) / (a.current || 10)) *
          base
      )

    case SORT_DJ.value:
      return list.sort((a, b) => ((b.level || 1) - (a.level || 1)) * base)

    case SORT_CGS.value:
      return list.sort((a, b) => ((b.state || 0) - (a.state || 0)) * base)

    case SORT_GDZC.value:
      return list.sort(
        (a, b) => ((b.sacrifices || 0) - (a.sacrifices || 0)) * base
      )

    case SORT_CCJZ.value:
      return list.sort(
        (a, b) =>
          ((b.state || 0) * (b.current || 0) -
            (a.state || 0) * (a.current || 0)) *
          base
      )

    case SORT_HYD.value:
      return list.sort(
        (a, b) => (b.lastOrder || '').localeCompare(a.lastOrder || '') * base
      )

    case SORT_SCJ.value:
      return list.sort(
        (a, b) => ((b.marketValue || 0) - (a.marketValue || 0)) * base
      )

    case SORT_FHL.value:
      return list.sort((a, b) => ((b.total || 0) - (a.total || 0)) * base)

    case SORT_DQJ.value:
      return list.sort((a, b) => ((b.current || 0) - (a.current || 0)) * base)

    case SORT_DQZD.value:
      return list.sort(
        (a, b) => ((b.fluctuation || 0) - (a.fluctuation || 0)) * base
      )

    case SORT_XFJL.value:
      return list.sort(
        (a, b) => (parseInt(b.bonus || 0) - parseInt(a.bonus || 0)) * base
      )

    default:
      return list
  }
}

/**
 * 等级筛选列表
 * @param {*} level
 * @param {*} list
 */
export function levelList(level, list) {
  if (level === undefined) {
    return list
  }

  return list.filter(item => item.level == level)
}

/**
 * 获取角色关联条目信息
 * @param {*} data
 */
export function relation(data) {
  return {
    ...data,
    list: data.list.map(item => {
      const i = {
        ...item
      }
      const { s, r } = XSBRelationData.data[item.monoId || item.id] || {}
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
}

export const SORT_XX = {
  label: '星星',
  value: 'xx'
}

export const SORT_GF = {
  label: '股份',
  value: 'gf'
}

export const SORT_SC = {
  label: '收藏',
  value: 'sc'
}

export const SORT_GX = {
  label: '股息',
  value: 'gx'
}

export const SORT_ZGX = {
  label: '总股息',
  value: 'zgx'
}

export const SORT_SSGX = {
  label: '生效股息',
  value: 'ssgx'
}

export const SORT_SSZGX = {
  label: '生效总股息',
  value: 'sszgx'
}

export const SORT_GXB = {
  label: '流动股息比',
  value: 'gxb'
}

export const SORT_SDGX = {
  label: '圣殿股息',
  value: 'sdgx'
}

export const SORT_SDGXB = {
  label: '圣殿股息比',
  value: 'sdgxb'
}

export const SORT_DJ = {
  label: '等级',
  value: 'dj'
}

export const SORT_GDS = {
  label: '挂单',
  value: 'cgs'
}

export const SORT_CGS = {
  label: '持股',
  value: 'cgs'
}

export const SORT_GDZC = {
  label: '塔',
  value: 'gdzc'
}

export const SORT_CCJZ = {
  label: '持仓价值',
  value: 'ccjz'
}

export const SORT_HYD = {
  label: '活跃度',
  value: 'hyd'
}

export const SORT_SCJ = {
  label: '市场价',
  value: 'scj'
}

export const SORT_FHL = {
  label: '发行量',
  value: 'fhl'
}

export const SORT_DQJ = {
  label: '当前价',
  value: 'dqj'
}

export const SORT_DQZD = {
  label: '当前涨跌',
  value: 'dqzd'
}

export const SORT_XFJL = {
  label: '新番奖励',
  value: 'xfjl'
}

function _info(message) {
  info(message, 0.4)
}
export const throttleInfo = throttle(_info, IOS ? 400 : ToastAndroid.SHORT)
