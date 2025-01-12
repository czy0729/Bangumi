/*
 * @Author: czy0729
 * @Date: 2021-03-03 23:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-09 10:53:45
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
import {
  calculateRate,
  calculateTotalRate,
  decimal,
  SORT_CCJZ,
  SORT_FHL,
  SORT_SSGX,
  SORT_SSSJ,
  SORT_SSZGX,
  SORT_XJB,
  SORT_XX,
  SORT_XZL
} from '@tinygrail/_/utils'
import { COLOR_MAP, TIMEZONE, TYPES } from './ds'

function Detail(props) {
  const {
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
    users,
    current,
    listedDate,
    sort
  } = props
  const { _stockPreview: stockPreview } = tinygrailStore.state
  const isICO = !!end
  const isAuction = type === 'auction'
  const isValhall = type === 'valhall'

  /** 总市场价 */
  let marketValueText: string

  /** 总量 */
  let totalText: string
  if (stockPreview || isICO) {
    if (marketValue) marketValueText = decimal(marketValue)
    if (total) totalText = decimal(total)
  }

  const extra: string[] = []
  const extra2: string[] = []
  const extra3: string[] = []
  const extra4: string[] = []
  if (isICO) {
    let _end = end
    if (_end) _end = `${end}+${TIMEZONE}:00`

    /** ICO 结束时间 */
    extra.push(formatTime(_end))

    /** ICO已筹资金 */
    extra.push(`已筹${totalText}`)
  } else {
    extra.push(`+${toFixed(rate, 1)} (${Number(toFixed(calculateRate(rate, rank, stars), 1))}) `)
    if (stockPreview && (state || sacrifices)) {
      extra2.push(
        `+${decimal(calculateTotalRate(props, true))}(${decimal(calculateTotalRate(props))})`
      )
    }

    if (isValhall) {
      /** 英灵殿底价 */
      extra2.push(`底价${toFixed(price, 1)}`)

      /** 英灵殿数量 */
      extra2.push(`数量${formatNumber(state, 0)}`)
    } else {
      if ((stockPreview || isAuction) && lastOrder) {
        /** 最近交易或拍卖出价时间 */
        extra4.push(`${lastDate(getTimestamp(tinygrailFixedTime(lastOrder)))}`)
      }

      /** 市场流通量 */
      if (totalText) extra4.push(`流通量${totalText}`)

      /** 市场总值 */
      if (marketValueText) extra4.push(`总值${marketValueText}`)
    }
  }

  if (stockPreview) {
    /** 市场总献祭量 */
    if (sa) extra3.push(`献祭${decimal(sa)}`)

    /** 星之力 */
    if (starForces) extra3.push(`通天塔${decimal(starForces)}`)
  }

  let icoUser: number
  let icoHighlight: boolean
  if (users && users !== 'ico') {
    const { nextUser } = caculateICO(props)
    icoUser = users

    /** 人数差一点就达成条件 */
    const distance = Math.abs(nextUser - icoUser)
    icoHighlight = distance === 1 || distance === 2
  }

  let sortText: string
  if (sort) {
    if (sort === SORT_SSZGX.value) {
      sortText = `${SORT_SSZGX.label}${decimal(calculateTotalRate(props, true))}`
    } else if (sort === SORT_XX.value) {
      sortText = `${SORT_XX.label}${stars}`
    } else if (sort === SORT_XZL.value) {
      sortText = `${SORT_XZL.label}${formatNumber(starForces, 0)}`
    } else if (sort === SORT_SSGX.value) {
      sortText = `${SORT_SSGX.label}${Number(toFixed(calculateRate(rate, rank, stars), 1))}`
    } else if (sort === SORT_XJB.value) {
      sortText = `${SORT_XJB.label}${Number(
        toFixed(calculateRate(rate, rank, stars) / (current || 10000))
      )}`
    } else if (sort === SORT_FHL.value) {
      sortText = `${SORT_FHL.label}${decimal(total)}`
    } else if (sort === SORT_CCJZ.value) {
      sortText = `${SORT_CCJZ.label}${decimal((state || 0) * (current || 0))}`
    } else if (sort === SORT_SSSJ.value) {
      sortText = `${SORT_SSSJ.label} ${String(listedDate || '').split('T')?.[0]}`
    }
  }

  let prevText: string
  if (TYPES.includes(type) && state) {
    prevText = `${formatNumber(state, 0)}股`
  } else if (type === 'ico') {
    prevText = `注资${decimal(state)}`
  }

  const size = stockPreview ? 10 : 11
  const textBaseProps = {
    type: 'tinygrailText',
    size,
    lineHeight: 12
  } as const
  const elSplit = <Text {...textBaseProps}>{' / '}</Text>

  return (
    <>
      <Text style={_.mt.xs} {...textBaseProps}>
        {!!sortText && (
          <Text {...textBaseProps} bold>
            {sortText}
            {elSplit}
          </Text>
        )}
        {!!prevText && (
          <Text {...textBaseProps} type={COLOR_MAP[type]} bold>
            {prevText}
            {elSplit}
          </Text>
        )}
        {!!sacrifices && (
          <Text {...textBaseProps} type='bid' bold>
            资产
            {!stockPreview || !assets || assets === sacrifices
              ? formatNumber(sacrifices, 0)
              : `${formatNumber(sacrifices, 0)}(${formatNumber(assets, 0)})`}
            {elSplit}
          </Text>
        )}
        {extra.join(' / ')}
        {!!icoUser && (
          <Text
            {...textBaseProps}
            type={icoHighlight ? 'warning' : 'tinygrailText'}
            bold={icoHighlight}
          >
            {' / '}
            当前{icoUser}人
          </Text>
        )}{' '}
        {!stockPreview && <Stars value={stars} />}
      </Text>
      {!!extra2.length && <Text {...textBaseProps}>{extra2.join(' / ')}</Text>}
      {!!extra3.length && (
        <Text {...textBaseProps}>
          {extra3.join(' / ')}
          {!!stars && ' / '}
          <Stars value={stars} />
        </Text>
      )}
      {!!extra4.length && <Text {...textBaseProps}>{extra4.join(' / ')}</Text>}
    </>
  )
}

export default ob(Detail)
