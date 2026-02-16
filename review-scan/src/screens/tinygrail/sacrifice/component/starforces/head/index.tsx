/*
 * @Author: czy0729
 * @Date: 2024-03-07 17:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-28 20:46:11
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Head() {
  const { $ } = useStore<Ctx>()
  const { showStarForces } = $.state
  if (!showStarForces) {
    return (
      <Touchable onPress={$.toggleStarForces}>
        <Text style={styles.touch} type='tinygrailPlain' size={13} align='center'>
          通天塔
        </Text>
      </Touchable>
    )
  }

  return (
    <Flex>
      <Flex.Item>
        <Touchable onPress={$.toggleStarForces}>
          <Text style={styles.touch} type='tinygrailPlain' size={13}>
            通天塔：将固定资产转化为星之力
          </Text>
        </Touchable>
      </Flex.Item>
    </Flex>
  )
}

export default ob(Head)
