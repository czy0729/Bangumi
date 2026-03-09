/*
 * @Author: czy0729
 * @Date: 2023-02-12 05:42:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-10 07:10:06
 */
import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { Touchable } from '@components'
import { systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { useAppState, useIsFocused, useObserver } from '@utils/hooks'
import { FROZEN_FN, WEB } from '@constants'
import { getHtml } from './utils'
import { COMPONENT, STAGE_HEIGHT, STAGE_WIDTH } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Mesume({ forwardRef, onMessage }: { forwardRef: (ref: any) => void; onMessage: any }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const show = useIsFocused()
  const appState = useAppState()

  return useObserver(() => {
    const { live2D, live2DModel, live2dScale } = systemStore.setting
    if (!live2D || WEB || $.state.dragging || !show || !appState) return null

    const styles = memoStyles()

    const scale = live2dScale === '大' ? 1 : live2dScale === '中' ? 0.76 : 0.5
    const width = Math.floor(STAGE_WIDTH * scale)
    const height = Math.floor(STAGE_HEIGHT * scale)

    return (
      <>
        <View style={styles.catch}>
          <Touchable
            style={{
              width,
              height
            }}
            ripple={false}
            withoutFeedback
            onPress={FROZEN_FN}
          />
        </View>
        <View
          style={stl(styles.stage, {
            width,
            height
          })}
        >
          <WebView
            key={`${live2DModel}|${live2dScale}`}
            ref={forwardRef}
            style={styles.webview}
            source={{
              html: getHtml(scale, width, height)
            }}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            androidHardwareAccelerationDisabled
            onMessage={onMessage}
          />
        </View>
      </>
    )
  })
}

export default Mesume
