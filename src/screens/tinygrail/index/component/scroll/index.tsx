/*
 * @Author: czy0729
 * @Date: 2024-03-13 22:34:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 22:45:28
 */
import React from 'react'
import { BlurViewBottomTab, BlurViewRoot } from '@_'
import { obc } from '@utils/decorators'
import ScrollView from '@tinygrail/_/scroll-view'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Scroll({ children }, { $ }: Ctx) {
  const styles = memoStyles()
  const elScroll = (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      onRefresh={$.refresh}
    >
      {children}
    </ScrollView>
  )
  if (!$.params.fromBottomTab) return elScroll

  return (
    <BlurViewRoot>
      {elScroll}
      <BlurViewBottomTab />
    </BlurViewRoot>
  )
}

export default obc(Scroll, COMPONENT)
