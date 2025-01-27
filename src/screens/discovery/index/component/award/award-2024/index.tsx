/*
 * @Author: czy0729
 * @Date: 2025-01-27 15:33:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-27 15:54:54
 */
import React from 'react'
import { View } from 'react-native'
import { Image, Squircle, Touchable } from '@components'
import { systemStore } from '@stores'
import { confirm, open } from '@utils'
import { r } from '@utils/dev'
import { useNavigation, useObserver } from '@utils/hooks'
import { ASSETS_AWARDS, TEXT_ONLY } from '@constants'
import { COMPONENT, URI } from './ds'
import { memoStyles } from './styles'

function Award2024() {
  r(COMPONENT)

  const navigation = useNavigation()

  return useObserver(() => {
    const styles = memoStyles()
    const { width, height } = styles.item
    return (
      <View style={styles.container}>
        <Touchable
          animate
          onPress={() => {
            confirm(
              'Bangumi 首届年度作品精选现已开启。目前仅浏览器支持完整功能，客户端仅能显示静态页面，推荐使用浏览器打开。',
              () => {
                open(URI)
              },
              '提示',
              () => {
                navigation.push('Award', {
                  uri: URI
                })
              },
              '浏览器',
              '客户端'
            )
          }}
        >
          <Squircle width={width} height={height} radius={systemStore.coverRadius}>
            <View style={styles.item}>
              {!TEXT_ONLY && (
                <Image
                  src={ASSETS_AWARDS[2024]}
                  size={styles.body.width}
                  height={styles.body.height}
                  placeholder={false}
                />
              )}
            </View>
          </Squircle>
        </Touchable>
      </View>
    )
  })
}

export default Award2024
