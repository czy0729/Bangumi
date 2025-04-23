/*
 * @Author: czy0729
 * @Date: 2024-03-13 22:34:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:22:23
 */
import React from 'react'
import { BlurViewBottomTab, BlurViewRoot } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import TinygrailScrollView from '@tinygrail/_/scroll-view'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Scroll({ children }) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()

  const elScroll = (
    <TinygrailScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      onRefresh={$.refresh}
    >
      {children}
    </TinygrailScrollView>
  )
  if (!$.params.fromBottomTab) return elScroll

  return (
    <BlurViewRoot>
      {elScroll}
      <BlurViewBottomTab />
    </BlurViewRoot>
  )
}

export default ob(Scroll, COMPONENT)
