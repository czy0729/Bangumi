/*
 * @Author: czy0729
 * @Date: 2024-03-08 03:12:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 04:01:09
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Head() {
  const { $ } = useStore<Ctx>()
  const { showItems } = $.state
  if (!showItems) {
    return (
      <Touchable onPress={$.toggleItems}>
        <Text style={styles.touch} type='tinygrailPlain' size={13} align='center'>
          道具
        </Text>
      </Touchable>
    )
  }

  return (
    <Flex style={_.mb.sm}>
      <Flex.Item>
        <Touchable onPress={$.toggleItems}>
          <Text style={styles.touch} type='tinygrailPlain' size={13}>
            道具
          </Text>
        </Touchable>
      </Flex.Item>
    </Flex>
  )
}

export default ob(Head)
