/*
 * @Author: czy0729
 * @Date: 2022-11-21 02:56:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 00:28:59
 */
import React from 'react'
import { View } from 'react-native'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Opacity({ subjectId, children }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { subject_id } = $.state.grid || {}

    return <View style={subject_id === subjectId && styles.active}>{children}</View>
  })
}

export default Opacity
