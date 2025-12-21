/*
 * @Author: czy0729
 * @Date: 2019-11-17 14:24:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:14:05
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { calculateMedian } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import LastWeek from './last-week'
import List from './list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function AuctionList() {
  const { $ } = useStore<Ctx>()
  if (!$.state.showAuction) return null

  const styles = memoStyles()
  const { auctionsSort } = $.state
  let list = [...$.auctionList.list]
  if (auctionsSort === '出价') {
    list = list.sort((a, b) => b.price - a.price)
  } else if (auctionsSort === '数量') {
    list = list.sort((a, b) => b.amount - a.amount)
  } else if (auctionsSort === '成交') {
    list = list.sort((a, b) => {
      if (a.state === 1 && b.state !== 1) return -1
      if (a.state !== 1 && b.state === 1) return 1
      if (a.state === 1 && b.state === 1) {
        if (a.amount !== b.amount) return b.amount - a.amount
        return a.price - b.price
      }
      return a.amount * a.price - b.amount * b.price
    })
  } else {
    list.reverse()
  }

  /** 成功竞拍人数 */
  let successCount = 0

  /** 成功竞拍总价 */
  let successPrice = 0

  /** 成功竞拍数量 */
  let successAmount = 0

  const success = list.filter(item => item.state === 1)
  success.forEach(item => {
    successCount += 1
    successPrice += item.amount * item.price
    successAmount += item.amount
  })

  const { length } = list
  if (!$.state.showLogs) list = list = list.slice(0, 3)

  const avg = Math.floor(successAmount ? successPrice / successAmount : 0)
  const median = calculateMedian(success.map(item => [item.price, item.amount]))
  const { rank, extra, price, assets, sacrifices } = $.topWeek
  let current = 0
  if (rank) current = Math.floor((extra + price * sacrifices) / assets) + 1

  return (
    <View style={styles.container}>
      <LastWeek
        total={length}
        count={successCount}
        amount={successAmount}
        avg={avg}
        median={median}
        current={current}
      />
      <List list={list} amount={successAmount} avg={avg} median={median} current={current} />
      {!!length && (
        <Touchable onPress={$.toggleLogs}>
          <Flex style={styles.notice} justify='center'>
            <Iconfont
              name={$.state.showLogs ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
              color={_.colorTinygrailText}
            />
          </Flex>
        </Touchable>
      )}
    </View>
  )
}

export default ob(AuctionList, COMPONENT)
