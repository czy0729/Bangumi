/*
 * @Author: czy0729
 * @Date: 2024-10-10 13:04:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-10 13:29:27
 */
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Bg() {
  return <LinearGradient style={styles.bg} colors={['rgb(0, 0, 0)', _.colorDarkModeLevel2]} />
}

export default obc(Bg, COMPONENT)
