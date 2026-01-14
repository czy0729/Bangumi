/*
 * @Author: czy0729
 * @Date: 2024-03-07 16:33:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:12:48
 */
import React from 'react'
import { Flex, Switch, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Head() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { showRefine } = $.state
    if (!showRefine) {
      return (
        <Touchable onPress={$.toggleRefine}>
          <Text style={styles.touch} type='tinygrailPlain' size={13} align='center'>
            精炼
          </Text>
        </Touchable>
      )
    }

    return (
      <Flex>
        <Flex.Item>
          <Touchable onPress={$.toggleRefine}>
            <Text style={styles.touch} type='tinygrailPlain' size={13}>
              精炼
            </Text>
          </Touchable>
        </Flex.Item>
        <Text type='tinygrailText' size={10} bold>
          二次确认
        </Text>
        <Switch
          style={styles.switch}
          checked={$.state.confirmRefine}
          onChange={$.switchConfirmRefine}
        />
      </Flex>
    )
  })
}

export default Head
