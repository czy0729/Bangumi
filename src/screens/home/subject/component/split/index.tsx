/*
 * @Author: czy0729
 * @Date: 2025-04-10 06:18:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-11 04:17:05
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Divider } from '@components'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { ViewStyle } from '@types'
import { memoStyles } from './styles'

function Split({ style }: { style?: ViewStyle }) {
  return useObserver(() => {
    const { subjectSplitStyles } = systemStore.setting
    if (!subjectSplitStyles) return null

    const styles = memoStyles()
    if (subjectSplitStyles === 'line-1') {
      return <View style={stl(styles.split, styles.splitStyle1, style)} />
    }

    if (subjectSplitStyles === 'line-2') return <Divider style={stl(styles.split, style)} />

    return null
  })
}

export default Split
