/*
 * @Author: czy0729
 * @Date: 2019-10-04 13:51:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-04 14:14:00
 */
export const SORT_CGS = {
  label: '持股数',
  value: 'cgs'
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

export function sortList(sort, direction, list) {
  const base = direction === 'down' ? 1 : -1
  switch (sort) {
    case SORT_CGS.value:
      return list.sort((a, b) => ((b.state || 0) - (a.state || 0)) * base)

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
