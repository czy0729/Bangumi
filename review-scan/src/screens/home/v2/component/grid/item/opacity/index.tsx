/*
 * @Author: czy0729
 * @Date: 2022-11-21 02:56:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-30 06:05:25
 */
import React from 'react'
import { View } from 'react-native'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Opacity({ subjectId, children }) {
  const { $ } = useStore<Ctx>()
  const { subject_id: current } = $.state.grid || {}
  return <View style={current === subjectId && styles.active}>{children}</View>
}

export default ob(Opacity, COMPONENT)
