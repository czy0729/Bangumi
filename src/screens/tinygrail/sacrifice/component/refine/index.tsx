/*
 * @Author: czy0729
 * @Date: 2024-03-11 17:50:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:13:25
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import Action from './action'
import Head from './head'
import Temple from './temple'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Refine() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  if ($.state.showRefine) {
    return (
      <View
        style={[
          styles.container,
          {
            width: _.window.width
          }
        ]}
      >
        <Head />
        <View style={_.mb.sm}>
          <Temple />
          <Action />
        </View>
      </View>
    )
  }

  return (
    <Flex.Item style={styles.container}>
      <Head />
    </Flex.Item>
  )
}

export default observer(Refine)
