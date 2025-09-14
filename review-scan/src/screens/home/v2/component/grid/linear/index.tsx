/*
 * @Author: czy0729
 * @Date: 2022-11-21 02:33:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-27 05:22:30
 */
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Linear() {
  if (!_.isDark) return null

  let colors: string[] = []
  if (IOS && systemStore.setting.homeLayout === 'list') {
    colors = [
      `rgba(${_.colorBgRaw.join()}, 1)`,
      `rgba(${_.colorBgRaw.join()}, 0.8)`,
      `rgba(${_.colorBgRaw.join()}, 0.24)`,
      `rgba(${_.colorBgRaw.join()}, 0)`
    ]
  } else {
    colors = [
      `rgba(${_.colorPlainRaw.join()}, 1)`,
      `rgba(${_.colorPlainRaw.join()}, 0.8)`,
      `rgba(${_.colorPlainRaw.join()}, 0.24)`,
      `rgba(${_.colorPlainRaw.join()}, 0)`
    ]
  }

  return <LinearGradient style={styles.linear} colors={colors} />
}

export default ob(Linear, COMPONENT)
