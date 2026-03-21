/*
 * @Author: czy0729
 * @Date: 2024-01-05 16:02:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 02:59:06
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import { stl } from '@utils'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Readed({ topicId, children }: Props) {
  const { $ } = useStore<Ctx>()

  const styles = memoStyles()

  return (
    <View style={stl(styles.container, $.readed(topicId).time && styles.readed)}>{children}</View>
  )
}

export default observer(Readed)
