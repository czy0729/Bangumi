/*
 * @Author: czy0729
 * @Date: 2023-02-12 05:42:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 17:37:06
 */
import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { Touchable } from '@components'
import { systemStore, useStore } from '@stores'
import { r } from '@utils/dev'
import { useIsFocused, useObserver } from '@utils/hooks'
import { FROZEN_FN, IOS, WEB } from '@constants'
import { getHtml } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Mesume() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>(COMPONENT)
  const show = useIsFocused()

  return useObserver(() => {
    if (!systemStore.setting.live2D) return null

    const { dragging } = $.state
    if (WEB || dragging || !show) return null

    const styles = memoStyles()

    return (
      <>
        {!IOS && (
          <View style={styles.prevent}>
            <Touchable style={styles.touch} ripple={false} withoutFeedback onPress={FROZEN_FN} />
          </View>
        )}
        <View style={styles.stage}>
          <WebView
            style={styles.webview}
            source={{
              html: getHtml(systemStore.setting.live2DVoice)
            }}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            androidHardwareAccelerationDisabled
          />
        </View>
      </>
    )
  })
}

export default Mesume
