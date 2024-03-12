/*
 * @Author: czy0729
 * @Date: 2024-03-08 17:38:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 06:21:45
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'

function Head(props, { $ }: Ctx) {
  return (
    <Flex>
      <Text type='tinygrailPlain' lineHeight={16}>
        董事会
      </Text>
      <Text style={_.ml.xs} type='warning' size={16}>
        {$.users.total || '-'}
      </Text>
      {!!$.charaPool && (
        <>
          <Text style={_.ml.xs} type='tinygrailText' size={12}>
            /
          </Text>
          <Text style={_.ml.xs} type='tinygrailText' size={12}>
            彩票奖池 {formatNumber($.charaPool, 0)}
          </Text>
        </>
      )}
    </Flex>
  )
}

export default obc(Head)
