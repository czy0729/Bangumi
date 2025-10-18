/*
 * @Author: czy0729
 * @Date: 2024-01-20 08:32:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:23:47
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Container({ subjectId, children }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default Container
