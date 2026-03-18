/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 22:58:54
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _, useStore } from '@stores'
import { getCover400 } from '@utils'
import { IOS, TEXT_ONLY } from '@constants'
import Bg from './bg'
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
      <Bg style={styles.bg} src={src} cdn={cdn} height={_.ios(styles.bg.height, _.window.width)} />
    </Component>
  )
}

export default observer(BgWrap)
