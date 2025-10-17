/*
 * @Author: czy0729
 * @Date: 2024-01-05 16:02:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 11:53:15
 */
import React from 'react'
import { View } from 'react-native'
import { useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Readed({ topicId, children }: Props) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <View style={stl(styles.container, $.readed(topicId).time && styles.readed)}>{children}</View>
    )
  })
}

export default Readed
