/*
 * @Author: czy0729
 * @Date: 2021-03-03 23:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-06 07:29:05
 */
import React from 'react'
import { Text, Icon } from '@components'
import { tinygrailStore, _ } from '@stores'
import { formatNumber, getTimestamp, lastDate, toFixed } from '@utils'
import { formatTime, tinygrailFixedTime } from '@utils/app'
import { ob } from '@utils/decorators'
import { decimal, calculateRate, calculateTotalRate } from '@tinygrail/_/utils'

const types = ['bid', 'asks', 'chara', 'merge']
const colorMap = {
  bid: 'bid',
  asks: 'ask',
  chara: 'warning',
  ico: 'primary',
  auction: 'warning',
  merge: 'warning'
}

let timezone = new Date().getTimezoneOffset() / -60
if (String(timezone).length === 1) timezone = `0${timezone}`

function Detail({
  end,
  lastOrder,
  marketValue,
  price,
  rank,
  rate,
  sa,
  sacrifices,
  starForces,
  stars,
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
    if (marketValue) marketValueText = decimal(marketValue)
    if (total) totalText = decimal(total)
  }

  const extra = []
  if (isICO) {
    let _end = end
    if (!String(_end).includes('+')) _end = `${end}+${timezone}:00`
    extra.push(`剩余${formatTime(_end)}`) // ICO结束时间
    extra.push(`已筹${totalText || '-'}`) // ICO已筹资金
  } else {
    extra.push(
      `+${toFixed(rate, 1)} (${Number(
        toFixed(calculateRate(rate, rank, stars), 1)
      )})`
    )

    if (show) {
      extra.push(
        `+${decimal(
          calculateTotalRate(
            {
              rate,
              rank,
              stars,
              state,
              sacrifices
            },
            true
          )
        )} (${decimal(
          calculateTotalRate({
            rate,
            rank,
            stars,
            state,
            sacrifices
          })
        )})`
      )
    }

    if (isValhall) {
      extra.push(`底价${toFixed(price, 1)}`) // 英灵殿底价
      extra.push(`数量${formatNumber(state, 0)}`) // 英灵殿数量
    } else {
      if ((show || isAuction) && lastOrder) {
        extra.push(`${lastDate(getTimestamp(tinygrailFixedTime(lastOrder)))}`) // 拍卖出价时间
      }
      if (totalText) extra.push(`流通量${totalText}`) // 市场流通量
      if (marketValueText) extra.push(`总值${marketValueText}`) // 市场总值
    }
  }

  if (show) {
    if (sa) extra.push(`献祭${decimal(sa)}`) // 市场总献祭量
    if (starForces) extra.push(`通天塔${decimal(starForces)}`) // 市场通天塔献祭量
  }

  let icoUser
  let icoHighlight
  if (users && users !== 'ico') {
    // extra += ' / '
    icoUser = users
    icoHighlight = Number(icoUser || 0) > 9 && Number(icoUser || 0) < 15
  }

  let prevText
  if (types.includes(type) && state) {
    prevText = `${state}股`
  } else if (type === 'ico') {
    prevText = `注资${decimal(state)}`
  }

  return (
    <Text style={_.mt.xs} type='tinygrailText' size={11} lineHeight={12}>
      {isDeal && (
        <Text type={colorMap[type]} size={11} bold lineHeight={12}>
          {prevText}
        </Text>
      )}
      {!!prevText && !!sacrifices && ' / '}
      {!!sacrifices && (
        <Text type='bid' size={11} bold lineHeight={12}>
          塔{sacrifices}
        </Text>
      )}
      {isDeal && !isAuction && !isValhall && ' / '}
      {extra.join(' / ')}
      {!!icoUser && (
        <Text
          size={11}
          lineHeight={12}
          type={icoHighlight ? 'warning' : 'tinygrailText'}
          bold={icoHighlight}
        >
          {' / '}
          当前{icoUser}人
        </Text>
      )}
      {!!stars && ' '}
      {!!stars && (
        <>
          {new Array(stars).fill('').map((item, index) => (
            <Icon
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              name='ios-star'
              size={11}
              color='#ffc107'
            />
          ))}
        </>
      )}
    </Text>
  )
}

export default ob(Detail)
