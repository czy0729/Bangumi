/*
 * @Author: czy0729
 * @Date: 2024-03-08 05:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:20:25
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { calculateRate } from '@screens/tinygrail/_/utils'
import { Ctx } from '../../../types'
import Refine from '../refine'
import { memoStyles } from './styles'

function Head() {
  const { $ } = useStore<Ctx>()
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

export default ob(Head)
