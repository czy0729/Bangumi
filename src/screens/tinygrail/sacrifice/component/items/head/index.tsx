/*
 * @Author: czy0729
 * @Date: 2024-03-08 03:12:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 07:02:22
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Head() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
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
  })
}

export default Head
