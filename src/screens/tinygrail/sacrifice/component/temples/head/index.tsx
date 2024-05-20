/*
 * @Author: czy0729
 * @Date: 2024-03-08 05:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 19:37:26
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { obc } from '@utils/decorators'
import { calculateRate } from '@screens/tinygrail/_/utils'
import { Ctx } from '../../../types'
import Refine from '../refine'
import { memoStyles } from './styles'

function Head(props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <Flex style={styles.info}>
      <Text type='tinygrailPlain' lineHeight={16}>
        固定资产
      </Text>
      <Text style={_.ml.xs} type='warning' size={16}>
        {$.charaTemple.list.length || '-'}
      </Text>
      <Text style={_.ml.xs} type='tinygrailText' size={10}>
        / +{$.rate} / 活股{toFixed(calculateRate($.rate, $.rank, $.stars), 1)}
      </Text>
      <Refine rate={$.rate} rank={$.rank} stars={$.stars} level={$.level} />
    </Flex>
  )
}

export default obc(Head)
