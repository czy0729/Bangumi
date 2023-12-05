/*
 * @Author: czy0729
 * @Date: 2022-11-21 02:56:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 08:10:07
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../../types'
import { styles } from './styles'

function Opacity({ subjectId, children }, { $ }: Ctx) {
  rerender('Home.GridItem.Opacity')

  const { grid } = $.state
  const { subject_id: current } = grid || {}
  const isActive = current === subjectId
  return <View style={isActive && styles.active}>{children}</View>
}

export default obc(Opacity)
