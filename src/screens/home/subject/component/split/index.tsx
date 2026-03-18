/*
 * @Author: czy0729
 * @Date: 2025-04-10 06:18:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:34:59
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Divider } from '@components'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { memoStyles } from './styles'

import type { WithViewStyles } from '@types'

function Split({ style }: WithViewStyles) {
  const { subjectSplitStyles } = systemStore.setting
  if (!subjectSplitStyles) return null

  const styles = memoStyles()
  if (subjectSplitStyles === 'line-1') {
    return <View style={stl(styles.split, styles.splitStyle1, style)} />
  }

  if (subjectSplitStyles === 'line-2') return <Divider style={stl(styles.split, style)} />

  return null
}

export default observer(Split)
