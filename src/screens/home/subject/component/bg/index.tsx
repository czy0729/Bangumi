/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-08 23:36:19
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView, BLURVIEW_TINT_DARK, Component } from '@components'
import { _, useStore } from '@stores'
import { getCover400 } from '@utils'
import { IOS, TEXT_ONLY } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function BgWrap() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  if (TEXT_ONLY) {
    if (IOS) return null

    return <View style={styles.bg} />
  }

  const image = $.coverPlaceholder || $.subject.images?.common || $.cover
  const cdn = !$.nsfw
  const src = cdn ? getCover400(image) : $.subject.images?.common || image
  if (typeof src !== 'string') return <View style={styles.bg} />

  return (
    <Component id='screen-subject-bg'>
      <BlurView
        style={styles.bg}
        tint={_.select('light', BLURVIEW_TINT_DARK)}
        src={src}
        height={_.ios(styles.bg.height, _.window.width)}
        intensity={80}
        blurRadius={_.web(16, 8)}
        cdn={cdn}
      />
    </Component>
  )
}

export default observer(BgWrap)
