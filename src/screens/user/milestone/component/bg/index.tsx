/*
 * @Author: czy0729
 * @Date: 2024-10-10 13:04:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-23 20:53:22
 */
import React from 'react'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Bg() {
  const { $ } = useStore<Ctx>(COMPONENT)

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
}

export default observer(Bg)
