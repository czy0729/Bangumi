/*
 * @Author: czy0729
 * @Date: 2024-03-07 17:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 17:36:01
 */
import React from 'react'
import { Flex, Text } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import ExpandBtn from '../../expand-btn'

function Head(props, { $ }: Ctx) {
  const { showStarForces } = $.state
  return (
    <Flex>
      <Flex.Item>
        <Text type='tinygrailPlain' size={13}>
          通天塔{showStarForces && '：将固定资产转化为星之力'}
        </Text>
      </Flex.Item>
      <ExpandBtn show={showStarForces} onPress={$.toggleStarForces} />
    </Flex>
  )
}

export default obc(Head)
