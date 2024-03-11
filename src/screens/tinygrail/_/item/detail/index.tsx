/*
 * @Author: czy0729
 * @Date: 2021-03-03 23:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 09:35:33
 */
import React from 'react'
import { Text } from '@components'
import { _, tinygrailStore } from '@stores'
import {
  caculateICO,
  formatNumber,
  formatTime,
  getTimestamp,
  lastDate,
  tinygrailFixedTime,
  toFixed
} from '@utils'
import { ob } from '@utils/decorators'
import Stars from '@tinygrail/_/stars'
import { calculateRate, calculateTotalRate, decimal } from '@tinygrail/_/utils'

const TYPES = ['bid', 'asks', 'chara', 'merge'] as const
const COLOR_MAP = {
  bid: 'bid',
  asks: 'ask',
  chara: 'warning',
  ico: 'primary',
  auction: 'warning',
  merge: 'warning'
} as const

let timezone: any = new Date().getTimezoneOffset() / -60
if (String(timezone).length === 1) timezone = `0${timezone}`

function Detail({
  Users,
  assets,
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
  const isICO = !!end
  const isAuction = type === 'auction'
  const isValhall = type === 'valhall'

  let marketValueText: string // 总市场价
  let totalText: string // 总量
  if (show || isICO) {
    if (marketValue) marketValueText = decimal(marketValue)
    if (total) totalText = decimal(total)
  }

  const extra = []
  const extra2 = []
  const extra3 = []
  const extra4 = []
  if (isICO) {
    let _end = end
    if (_end) _end = `${end}+${timezone}:00`
    extra.push(formatTime(_end)) // ICO结束时间
    extra.push(`已筹${totalText}`) // ICO已筹资金
  } else {
    extra.push(`+${toFixed(rate, 1)}(${Number(toFixed(calculateRate(rate, rank, stars), 1))})`)

    if (show && (state || sacrifices)) {
      extra2.push(
        `+${decimal(
          calculateTotalRate(
            {
              rate,
              rank,
              stars,
              state,
              sacrifices,
              assets
            },
            true
          )
        )}(${decimal(
          calculateTotalRate({
            rate,
            rank,
            stars,
            state,
            sacrifices,
            assets
          })
        )})`
      )
    }

    if (isValhall) {
      extra2.push(`底价${toFixed(price, 1)}`) // 英灵殿底价
      extra2.push(`数量${formatNumber(state, 0)}`) // 英灵殿数量
    } else {
      if ((show || isAuction) && lastOrder) {
        extra4.push(`${lastDate(getTimestamp(tinygrailFixedTime(lastOrder)))}`) // 最近交易或拍卖出价时间
      }
      if (totalText) extra4.push(`流通量${totalText}`) // 市场流通量
      if (marketValueText) extra4.push(`总值${marketValueText}`) // 市场总值
    }
  }

  if (show) {
    if (sa) extra3.push(`献祭${decimal(sa)}`) // 市场总献祭量
    if (starForces) extra3.push(`通天塔${decimal(starForces)}`) // 市场通天塔献祭量
  }

  let icoUser: number
  let icoHighlight: boolean
  if (users && users !== 'ico') {
    const { nextUser } = caculateICO({ users, total, Users })
    icoUser = users

    // 人数差一点就达成条件
    const distance = Math.abs(nextUser - icoUser)
    icoHighlight = distance === 1 || distance === 2
  }

  let prevText: string
  if (TYPES.includes(type) && state) {
    prevText = `${state}股`
  } else if (type === 'ico') {
    prevText = `注资${decimal(state)}`
  }

  const size = show ? 10 : 11
  return (
    <>
      <Text style={_.mt.xs} type='tinygrailText' size={size} lineHeight={12}>
        {!!prevText && (
          <Text type={COLOR_MAP[type]} size={size} bold lineHeight={12}>
            {prevText}
            <Text type='tinygrailText' size={size} lineHeight={12}>
              {' / '}
            </Text>
          </Text>
        )}
        {!!sacrifices && (
          <Text type='bid' size={size} bold lineHeight={12}>
            塔{!show || !assets || assets === sacrifices ? sacrifices : `${sacrifices}(${assets})`}
            <Text type='tinygrailText' size={size} lineHeight={12}>
              {' / '}
            </Text>
          </Text>
        )}
        {extra.join(' / ')}
        {!!icoUser && (
          <Text
            size={size}
            lineHeight={12}
            type={icoHighlight ? 'warning' : 'tinygrailText'}
            bold={icoHighlight}
          >
            {' / '}
            当前{icoUser}人
          </Text>
        )}{' '}
        {!show && <Stars value={stars} />}
      </Text>
      {!!extra2.length && (
        <Text type='tinygrailText' size={size} lineHeight={12}>
          {extra2.join(' / ')}
        </Text>
      )}
      {!!extra3.length && (
        <Text type='tinygrailText' size={size} lineHeight={12}>
          {extra3.join(' / ')}
          {!!stars && ' / '}
          <Stars value={stars} />
        </Text>
      )}
      {!!extra4.length && (
        <Text type='tinygrailText' size={size} lineHeight={12}>
          {extra4.join(' / ')}
        </Text>
      )}
    </>
  )
}

export default ob(Detail)
