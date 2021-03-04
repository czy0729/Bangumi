/*
 * @Author: czy0729
 * @Date: 2021-03-03 23:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-04 16:55:37
 */
import React from 'react'
import { Text } from '@components'
import { tinygrailStore, _ } from '@stores'
import { formatNumber, getTimestamp, lastDate, toFixed } from '@utils'
import { formatTime, tinygrailFixedTime } from '@utils/app'
import { ob } from '@utils/decorators'
import { B, M } from '@constants'

const types = ['bid', 'asks', 'chara']
const colorMap = {
  bid: 'bid',
  asks: 'ask',
  chara: 'warning',
  ico: 'primary',
  auction: 'warning'
}

let timezone = new Date().getTimezoneOffset() / -60
if (String(timezone).length === 1) timezone = `0${timezone}`

function Detail({
  // current,
  end,
  lastOrder,
  level,
  marketValue,
  price,
  rate,
  sacrifices,
  state,
  total,
  type,
  users
}) {
  // 用show判断是否精简模式
  const { _stockPreview: show } = tinygrailStore.state
  const isICO = users !== undefined // 有users为ico中
  const isDeal = !!type // 有此值为用户委托单
  const isAuction = type === 'auction'
  const isValhall = type === 'valhall'

  let marketValueText // 总市场价
  let totalText // 总量
  if (show || isICO) {
    if (marketValue > B) {
      marketValueText = `${toFixed(marketValue / B, 1)}亿`
    } else if (marketValue > M) {
      marketValueText = `${toFixed(marketValue / M, 1)}万`
    } else {
      marketValueText = formatNumber(marketValue, 0)
    }

    if (total > 1000) {
      totalText = `${toFixed(total / M, 1)}万`
    } else {
      totalText = formatNumber(total, 0)
    }
  }

  let extra
  if (isICO) {
    // ICO结束时间
    let _end = end
    if (!String(_end).includes('+')) _end = `${end}+${timezone}:00`
    extra = `${formatTime(_end)} / 已筹${totalText || '-'}`
  } else {
    // 流动股息比
    extra = `+${toFixed(rate, 1)}`
    // if (show) {
    //   const rateRatio = toFixed(((rate || 0) / (current || 10)) * 10, 1)
    //   extra += ` (${rateRatio})`
    // }

    /**
     * 圣殿股息比
     *  - 20210304 第一次调整
     */
    // const templeRate = toFixed((rate || 0) * (level + 1) * 0.3, 1)
    const templeRate = toFixed(rate, 1)
    if (level !== undefined) extra += ` / +${templeRate}`
    // if (show) {
    //   const templeRateRatio = toFixed(
    //     ((templeRate || 0) / (current || 10)) * 10,
    //     1
    //   )
    //   extra += ` (${templeRateRatio})`
    // }

    if (isValhall) {
      extra += ` / 底价${toFixed(price, 1)} / 数量${formatNumber(state, 0)}`
    } else {
      if (show || isAuction) {
        extra += ` / ${lastDate(getTimestamp(tinygrailFixedTime(lastOrder)))}`
      }
      if (marketValueText) extra += ` / 总${marketValueText}`
      if (totalText) extra += ` / 量${totalText}`
    }
  }

  let icoUser
  let icoHighlight
  if (users && users !== 'ico') {
    extra += ' / '
    icoUser = users
    icoHighlight = Number(icoUser || 0) > 9 && Number(icoUser || 0) < 15
  }

  let prevText
  if (types.includes(type)) {
    prevText = `${state}股`
  } else if (type === 'ico') {
    prevText = `注资${state}`
  }

  return (
    <Text style={_.mt.xs} type='tinygrailText' size={10} lineHeight={12}>
      {isDeal && (
        <Text type={colorMap[type]} size={10} bold>
          {prevText}
        </Text>
      )}
      {!!sacrifices && ' / '}
      {!!sacrifices && (
        <Text type='bid' size={10}>
          塔{sacrifices}
        </Text>
      )}
      {isDeal && !isAuction && !isValhall && ' / '}
      {extra}
      {!!icoUser && (
        <Text
          size={10}
          type={icoHighlight ? 'warning' : 'tinygrailText'}
          bold={icoHighlight}
        >
          {icoUser}人
        </Text>
      )}
    </Text>
  )
}

export default ob(Detail)
