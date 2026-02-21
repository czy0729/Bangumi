/*
 * @Author: czy0729
 * @Date: 2024-10-10 13:04:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:49:22
 */
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Bg() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.state.bg) return null

    return (
      <LinearGradient
        style={_.absoluteFill}
        colors={_.select(
          ['rgb(255, 255, 255)', _.colorMainLight],
          ['rgb(0, 0, 0)', _.colorDarkModeLevel2]
        )}
      />
    )
  })
}

export default Bg
