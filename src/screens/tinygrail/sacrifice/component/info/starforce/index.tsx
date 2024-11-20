/*
 * @Author: czy0729
 * @Date: 2024-03-07 06:19:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:15:16
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { formatNumber } from '@utils'
import { ob } from '@utils/decorators'
import Stars from '@tinygrail/_/stars'
import { Ctx } from '../../../types'

function Starforce() {
  const { $ } = useStore<Ctx>()
  if (!$.starForces) return null

  return (
    <Flex style={_.mt.xs} justify='center'>
      <Stars value={$.stars} size={15} />
      <Text type='tinygrailText' align='center' size={12}>
        {!!$.stars && `  / `}
        星之力 {formatNumber($.starForces, 0)}
      </Text>
    </Flex>
  )
}

export default ob(Starforce)
