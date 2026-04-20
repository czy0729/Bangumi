/*
 * @Author: czy0729
 * @Date: 2024-03-13 22:34:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 17:57:08
 */
import React from 'react'
import { observer } from 'mobx-react'
import { BlurViewBottomTab, BlurViewRoot } from '@_'
import { useStore } from '@stores'
import TinygrailScrollView from '@tinygrail/_/scroll-view'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { PropsWithChildren } from 'react'
import type { Ctx } from '../../types'

function Scroll({ children }: PropsWithChildren) {
  const { $ } = useStore<Ctx>(COMPONENT)

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

export default observer(Scroll)
