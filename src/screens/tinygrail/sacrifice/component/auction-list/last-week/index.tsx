/*
 * @Author: czy0729
 * @Date: 2024-03-08 02:06:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:14:11
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { formatNumber } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function LastWeek() {
  const { $ } = useStore<Ctx>()
  if (!$.auctionList._loaded) return null

  const { list } = $.auctionList
  let successCount = 0
  let successAmount = 0
  list
    .filter(item => item.state === 1)
    .forEach(item => {
      successCount += 1
      successAmount += item.amount
    })

  return (
    <View style={styles.lastWeek}>
      {list.length ? (
        <Text type='tinygrailPlain' size={13}>
          上周公示：共 {list.length || '-'} 人拍卖，成功 {successCount || '-'} 人 /{' '}
          {successAmount ? formatNumber(successAmount, 0) : '-'} 股
        </Text>
      ) : (
        <Flex direction='column'>
          <Text style={_.mb.sm} type='tinygrailPlain' size={13}>
            上周没有拍卖纪录
          </Text>
        </Flex>
      )}
    </View>
  )
}

export default ob(LastWeek)
