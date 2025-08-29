/*
 * @Author: czy0729
 * @Date: 2022-02-14 06:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:30:00
 */
import React from 'react'
import { View } from 'react-native'
// import { WebView } from 'react-native-webview'
import { Image, Squircle, Touchable } from '@components'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { withT } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { ASSETS_AWARDS, HOST, TEXT_ONLY } from '@constants'
import { COMPONENT } from './ds'
// import { getHtml } from './utils'
import { memoStyles } from './styles'

function Award2021() {
  r(COMPONENT)

  const navigation = useNavigation()

  // const show = useIsFocused()
  return useObserver(() => {
    const styles = memoStyles()
    // const { showBlockTrain } = $.state
    const { width, height } = styles.item2021
    return (
      <View style={styles.container}>
        <Touchable
          animate
          onPress={withT(
            () => {
              navigation.push('Award', {
                uri: `${HOST}/award/2021`
              })
            },
            '发现.跳转',
            {
              to: 'Award',
              year: 2021,
              from: 'Award2021'
            }
          )}
        >
          <Squircle width={width} height={height} radius={systemStore.coverRadius}>
            <View style={styles.item2021}>
              {/* {!TEXT_ONLY &&
                (showBlockTrain ? (
                  show && (
                    <WebView
                      style={styles.body}
                      source={{
                        html: getHtml(styles.body.width, styles.body.height)
                      }}
                      scrollEnabled={false}
                      androidHardwareAccelerationDisabled
                      androidLayerType='software'
                    />
                  )
                ) : (
                  <Image
                    src={require('@assets/images/static/2021.png')}
                    size={styles.body.width}
                    height={styles.body.height}
                    placeholder={false}
                    resizeMode='contain'
                  />
                ))} */}
              {!TEXT_ONLY && (
                <Image
                  src={ASSETS_AWARDS[2021]}
                  size={styles.body.width}
                  height={styles.body.height}
                  placeholder={false}
                  resizeMode='contain'
                />
              )}
            </View>
          </Squircle>
        </Touchable>
        {/* <View style={styles.touch}>
          <Touchable onPress={$.toggleBlockTrain}>
            <View style={styles.switch}>
              <Text style={styles.switchText} size={12} align='center'>
                {showBlockTrain ? 'ON' : 'OFF'}
              </Text>
            </View>
          </Touchable>
        </View> */}
      </View>
    )
  })
}

export default Award2021
