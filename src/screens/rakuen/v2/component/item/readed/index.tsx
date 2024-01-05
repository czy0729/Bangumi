/*
 * @Author: czy0729
 * @Date: 2024-01-05 16:02:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-05 16:06:38
 */
import React from 'react'
import { View } from 'react-native'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Readed({ topicId, children }, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <View style={stl(styles.container, $.readed(topicId).time && styles.readed)}>{children}</View>
  )
}

export default obc(Readed)
