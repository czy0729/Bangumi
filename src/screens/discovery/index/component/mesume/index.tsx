/*
 * @Author: czy0729
 * @Date: 2023-02-12 05:42:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-01 16:15:39
 */
import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { Touchable } from '@components'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { useIsFocused, useObserver } from '@utils/hooks'
import { IOS, STORYBOOK } from '@constants'
import { getHtml } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Mesume({ dragging }) {
  const show = useIsFocused()

  return useObserver(() => {
    if (STORYBOOK || dragging || !show) return null

    const styles = memoStyles()
    return (
      <>
        {!IOS && (
          <View style={styles.prevent}>
            <Touchable style={styles.touch} ripple={false} withoutFeedback onPress={() => {}} />
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
            // androidLayerType='software'
          />
        </View>
      </>
    )
  })
}

export default ob(Mesume, COMPONENT)
