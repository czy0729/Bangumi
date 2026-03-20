/*
 * @Author: czy0729
 * @Date: 2022-11-21 02:56:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:28:14
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../../types'
import type { Props } from './types'

function Opacity({ subjectId, children }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { subject_id } = $.state.grid || {}

  return <View style={subject_id === subjectId && styles.active}>{children}</View>
}

export default observer(Opacity)
