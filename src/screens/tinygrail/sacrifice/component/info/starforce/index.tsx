/*
 * @Author: czy0729
 * @Date: 2024-03-07 06:19:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 11:39:39
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import Stars from '@tinygrail/_/stars'
import { Ctx } from '../../../types'

function Starforce(props, { $ }: Ctx) {
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

export default obc(Starforce)
