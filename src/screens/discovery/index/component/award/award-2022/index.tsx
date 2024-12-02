/*
 * @Author: czy0729
 * @Date: 2023-01-22 06:05:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 14:39:34
 */
import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { Squircle, Touchable } from '@components'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { withT } from '@utils/fetch'
import { useIsFocused, useNavigation, useObserver } from '@utils/hooks'
import { HOST, TEXT_ONLY } from '@constants'
import { getHtml } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Award2022({ width, height }: { width?: number; height?: number }) {
  r(COMPONENT)

  const navigation = useNavigation()
  const show = useIsFocused()

  return useObserver(() => {
    const styles = memoStyles()
    const w = width || styles.item2022.width
    const h = height || styles.item2022.height
    return (
      <View
        style={[
          styles.container,
          {
            height: height || styles.container.height,
            marginRight: height ? 0 : styles.container.marginRight
          }
        ]}
      >
        <Touchable
          style={[
            styles.item2022,
            {
              width: w,
              height: h
            }
          ]}
          animate
          onPress={withT(
            () => {
              navigation.push('Award', {
                uri: `${HOST}/award/2022`
              })
            },
            '发现.跳转',
            {
              to: 'Award',
              year: 2022,
              from: 'Award2022'
            }
          )}
        >
          <Squircle width={w} height={h} radius={systemStore.coverRadius}>
            {!TEXT_ONLY && (
              <View
                style={[
                  styles.body,
                  {
                    width: width || styles.body.width,
                    height: height || styles.body.height
                  }
                ]}
                pointerEvents='none'
              >
                {show && (
                  <WebView
                    style={[
                      styles.body,
                      {
                        width: width || styles.body.width,
                        height: height || styles.body.height
                      }
                    ]}
                    source={{
                      html: getHtml(width || styles.body.width, height || styles.body.height)
                    }}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    androidHardwareAccelerationDisabled
                    androidLayerType='software'
                  />
                )}
              </View>
            )}
          </Squircle>
        </Touchable>
      </View>
    )
  })
}

export default Award2022
