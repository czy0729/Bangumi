/*
 * @Author: czy0729
 * @Date: 2024-03-11 17:50:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:17:31
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Action from './action'
import Head from './head'
import Temple from './temple'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Refine() {
  const { $ } = useStore<Ctx>()
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

export default ob(Refine, COMPONENT)
