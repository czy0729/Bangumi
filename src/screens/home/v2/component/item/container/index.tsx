/*
 * @Author: czy0729
 * @Date: 2024-01-20 08:32:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-20 09:33:25
 */
import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'
import { systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SubjectId } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Container({
  subjectId,
  children
}: PropsWithChildren<{
  subjectId: SubjectId
}>) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <View
      style={
        systemStore.setting.heatMap && $.$Item(subjectId).expand ? styles.heatMap : styles.item
      }
    >
      {children}
    </View>
  )
}

export default ob(Container, COMPONENT)
