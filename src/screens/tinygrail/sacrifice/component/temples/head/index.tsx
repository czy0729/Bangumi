/*
 * @Author: czy0729
 * @Date: 2024-03-08 05:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 17:35:08
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { obc } from '@utils/decorators'
import { calculateRate, calculateRatio } from '@screens/tinygrail/_/utils'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Head(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { rate, rank, stars } = $.chara
  return (
    <Flex style={styles.info}>
      <Text type='tinygrailPlain'>固定资产</Text>
      <Text style={_.ml.xs} type='tinygrailText'>
        {$.charaTemple.list.length || '-'}
      </Text>
      <Text style={_.ml.xs} type='warning'>
        +{rate ? formatNumber(rate, 1) : '-'} / {toFixed(calculateRate(rate, rank, stars), 1)}
      </Text>
      <Text style={_.ml.xs} type='tinygrailText'>
        (x{calculateRatio(rank)})
      </Text>
    </Flex>
  )
}

export default obc(Head)
