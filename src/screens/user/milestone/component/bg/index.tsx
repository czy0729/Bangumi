/*
 * @Author: czy0729
 * @Date: 2024-10-10 13:04:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-14 07:49:00
 */
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Bg(_props, { $ }: Ctx) {
  if (!$.state.bg) return null

  return (
    <LinearGradient
      style={styles.bg}
      colors={_.select(
        ['rgb(255, 255, 255)', _.colorMainLight],
        ['rgb(0, 0, 0)', _.colorDarkModeLevel2]
      )}
    />
  )
}

export default obc(Bg, COMPONENT)
