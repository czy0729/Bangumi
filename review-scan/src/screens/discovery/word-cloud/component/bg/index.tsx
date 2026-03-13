/*
 * @Author: czy0729
 * @Date: 2024-09-26 19:20:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:18:42
 */
import React from 'react'
import { BlurView, BLURVIEW_TINT_DARK } from '@components'
import { useStore } from '@stores'
import { getMonoCoverSmall } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Bg() {
  const { $ } = useStore<Ctx>()
  let src: string = ''
  if ($.subjectId) {
    src = $.subject?.images?.medium
  } else if ($.topicId) {
    src = $.topic?.avatar || $.topic?.groupThumb
  } else if ($.monoId) {
    src = $.mono?.cover
    if (src) src = getMonoCoverSmall(src)
  } else if ($.userId) {
    src = $.users.avatar
  }
  if (!src) return null

  return (
    <BlurView
      style={styles.bg}
      tint={BLURVIEW_TINT_DARK}
      src={src}
      intensity={96}
      blurRadius={32}
    />
  )
}

export default ob(Bg, COMPONENT)
