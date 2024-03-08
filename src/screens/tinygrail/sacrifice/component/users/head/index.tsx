/*
 * @Author: czy0729
 * @Date: 2024-03-08 17:38:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 17:56:28
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber, info } from '@utils'
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
          <Text style={_.ml.xs} type='tinygrailText' size={16}>
            /
          </Text>
          <Touchable
            style={_.ml.xs}
            onPress={() => {
              info('彩票奖池')
            }}
          >
            <Text type='tinygrailText' size={16}>
              {formatNumber($.charaPool, 0)}
            </Text>
          </Touchable>
        </>
      )}
    </Flex>
  )
}

export default obc(Head)
