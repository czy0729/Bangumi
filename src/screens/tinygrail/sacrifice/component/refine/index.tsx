/*
 * @Author: czy0729
 * @Date: 2024-03-11 17:50:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-12 07:13:26
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Action from './action'
import Head from './head'
import Temple from './temple'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Refine(props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Head />
      {$.state.showRefine && (
        <>
          <Temple />
          <Action />
        </>
      )}
    </View>
  )
}

export default obc(Refine, COMPONENT)
