/*
 * @Author: czy0729
 * @Date: 2024-09-26 19:20:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 02:54:20
 */
import React from 'react'
import { BlurView, BLURVIEW_TINT_DARK } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'

function Bg(_props, { $ }: Ctx) {
  const src = $.subject?.images?.medium
  if (!src) return null

  return (
    <BlurView
      style={styles.bg}
      tint={BLURVIEW_TINT_DARK}
      src={src}
      intensity={80}
      blurRadius={32}
    />
  )
}

export default obc(Bg)
