/*
 * @Author: czy0729
 * @Date: 2022-11-21 02:33:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 00:34:17
 */
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { _, systemStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Linear() {
  r(COMPONENT)

  return useObserver(() => {
    if (!_.isDark) return null

    const colorRaw =
      IOS && systemStore.setting.homeLayout === 'list' ? _.colorBgRaw : _.colorPlainRaw
    const colors = [
      `rgba(${colorRaw.join()}, 1)`,
      `rgba(${colorRaw.join()}, 0.8)`,
      `rgba(${colorRaw.join()}, 0.24)`,
      `rgba(${colorRaw.join()}, 0)`
    ] as const

    return <LinearGradient style={styles.linear} colors={colors} />
  })
}

export default Linear
