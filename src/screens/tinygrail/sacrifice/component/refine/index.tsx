/*
 * @Author: czy0729
 * @Date: 2024-03-11 17:50:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:17:31
 */
import React from 'react'
import { View } from 'react-native'
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
  return (
    <View style={styles.container}>
      <Head />
      {$.state.showRefine && (
        <View style={_.mb.sm}>
          <Temple />
          <Action />
        </View>
      )}
    </View>
  )
}

export default ob(Refine, COMPONENT)
