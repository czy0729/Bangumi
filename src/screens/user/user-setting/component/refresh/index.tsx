/*
 * @Author: czy0729
 * @Date: 2024-01-22 13:17:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 05:55:15
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Refresh({ onRefresh }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  if ($.state.selectedIndex !== 1) return null

  const styles = memoStyles()

  return (
    <View style={styles.btn}>
      <Touchable style={styles.touch} onPress={onRefresh}>
        <Flex style={styles.icon} justify='center'>
          <Iconfont name='md-refresh' color={_.colorPlain} size={20} />
        </Flex>
      </Touchable>
    </View>
  )
}

export default observer(Refresh)
