/*
 * @Author: czy0729
 * @Date: 2021-03-03 23:17:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-07 04:57:19
 */
import React from 'react'
import { Flex, Text } from '@components'
import { tinygrailStore } from '@stores'
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
  getCharaItemSortText
} from '@tinygrail/_/utils'
import { COLOR_MAP, TEXT_SPLIT, TIMEZONE, TYPES } from './ds'
import { styles } from './styles'

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
    auction
  } = props

  const isICO = !!end
  const isAuction = type === 'auction'
  const isValhall = type === 'valhall'

  /** 总市场价 */
  let marketValueText = ''

  /** 总量 */
  let totalText = ''

  const stockPreview = tinygrailStore.state._stockPreview
  if (stockPreview || isICO) {
    if (marketValue) marketValueText = decimal(marketValue)
    if (total) totalText = decimal(total)
  }

  const extra: string[] = []
  const extra2: string[] = []
  const extra3: string[] = []
  const extra4: string[] = []
  const extra5: string[] = []
  if (isICO) {
    let endTime = end
    if (endTime) endTime = `${end}+${TIMEZONE}:00`

    // ICO 结束时间和已筹资金
    extra.push(formatTime(endTime), `已筹 ${totalText}`)
  } else {
    let rateText = `+${toFixed(rate, 1)}`
    if (!isAuction) rateText += ` (${Number(toFixed(calculateRate(rate, rank, stars), 1))}) `
    extra.push(rateText)

    if (stockPreview && (state || sacrifices)) {
      extra2.push(
        `+${decimal(calculateTotalRate(props, true))}(${decimal(calculateTotalRate(props))})`
      )
    }

    if (isValhall) {
      // 英灵殿底价和数量
      extra2.push(`底价 ${toFixed(price, 1)}`, `数量 ${formatNumber(state, 0)}`)
    } else {
      if ((stockPreview || isAuction) && lastOrder) {
        // 最近交易或拍卖出价时间
        extra4.push(`${lastDate(getTimestamp(tinygrailFixedTime(lastOrder)))}`)
      }

      // 市场流通量
      if (totalText) extra4.push(`流通量 ${totalText}`)

      // 市场总值
      if (marketValueText) extra4.push(`总值 ${marketValueText}`)
    }
  }

  if (stockPreview) {
    // 市场总献祭量
    if (sa) extra3.push(`献祭 ${decimal(sa)}`)

    // 星之力
    if (starForces) extra3.push(`通天塔 ${decimal(starForces)}`)
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

  const sortText = getCharaItemSortText(props)
  let prevText: string
  if (TYPES.includes(type) && state) {
    prevText = `${formatNumber(state, 0)}股`
  } else if (type === 'ico') {
    prevText = `注资 ${decimal(state)}`
  }

  if (isAuction && auction) {
    extra5.push(
      `竞拍人数 ${auction.state} / 总量 ${formatNumber(auction.type, 0)} / 库存 ${formatNumber(
        auction.total,
        0
      )}`
    )
  }

  const size = stockPreview ? 10 : 11
  const textBaseProps = {
    type: 'tinygrailText',
    size,
    lineHeight: 12
  } as const
  const elSplit = <Text {...textBaseProps}>{TEXT_SPLIT}</Text>

  return (
    <Flex style={styles.detail} wrap='wrap'>
      <Text {...textBaseProps}>
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
            资产{formatNumber(assets || sacrifices, 0)}
            {!!sacrifices && !!assets && sacrifices !== assets && (
              <Text {...textBaseProps} type='tinygrailText' bold>
                {' '}
                ({formatNumber(sacrifices, 0)})
              </Text>
            )}
            {elSplit}
          </Text>
        )}
        {extra.join(TEXT_SPLIT)}
        {!!icoUser && (
          <Text
            {...textBaseProps}
            type={icoHighlight ? 'warning' : 'tinygrailText'}
            bold={icoHighlight}
          >
            {TEXT_SPLIT}
            当前 {icoUser} 人
          </Text>
        )}{' '}
        {!stockPreview && <Stars value={stars} />}
      </Text>
      {!!extra2.length && (
        <Text {...textBaseProps}>
          {TEXT_SPLIT}
          {extra2.join(TEXT_SPLIT)}
        </Text>
      )}
      {!!extra3.length && (
        <Text {...textBaseProps}>
          {TEXT_SPLIT}
          {extra3.join(TEXT_SPLIT)}
          {!!stars && TEXT_SPLIT}
          <Stars value={stars} />
        </Text>
      )}
      {!!extra4.length && (
        <Text {...textBaseProps}>
          {TEXT_SPLIT}
          {extra4.join(TEXT_SPLIT)}
        </Text>
      )}
      {!!extra5.length && <Text {...textBaseProps}>{extra5.join(TEXT_SPLIT)}</Text>}
    </Flex>
  )
}

export default ob(Detail)
