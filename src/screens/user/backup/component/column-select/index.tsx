/*
 * @Author: czy0729
 * @Date: 2022-12-08 10:47:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 00:40:53
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Touchable } from '@components'
import { r } from '@utils/dev'
import { COLOR_SUCCESS, COMPONENT, HIT_SLOP } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function ColumnSelect({ select, disabled, onPress }: Props) {
  r(COMPONENT)

  if (disabled) {
    return <View style={styles.columnSelect} />
  }

  return (
    <Touchable style={styles.columnSelect} hitSlop={HIT_SLOP} onPress={() => onPress(!select)}>
      <Flex style={styles.radio} justify='center'>
        <Iconfont
          name={select ? 'md-check-circle' : 'md-radio-button-off'}
          color={select ? COLOR_SUCCESS : undefined}
          size={16}
        />
      </Flex>
    </Touchable>
  )
}

export default observer(ColumnSelect)
