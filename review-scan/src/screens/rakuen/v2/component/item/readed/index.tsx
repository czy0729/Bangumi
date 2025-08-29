/*
 * @Author: czy0729
 * @Date: 2024-01-05 16:02:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 03:25:35
 */
import React from 'react'
import { View } from 'react-native'
import { useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Readed({ topicId, children }) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <View style={stl(styles.container, $.readed(topicId).time && styles.readed)}>{children}</View>
  )
}

export default ob(Readed)
