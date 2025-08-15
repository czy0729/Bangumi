/*
 * @Author: czy0729
 * @Date: 2024-03-07 16:33:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-28 20:47:21
 */
import React from 'react'
import { Flex, Switch, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Head() {
  const { $ } = useStore<Ctx>()
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
}

export default ob(Head)
