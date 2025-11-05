/*
 * @Author: czy0729
 * @Date: 2025-01-27 15:33:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-08 22:02:11
 */
import React from 'react'
import { View } from 'react-native'
import { Image, Squircle, Text, Touchable } from '@components'
import { systemStore } from '@stores'
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
            // confirm(
            //   'Bangumi 首届年度作品精选现已开启。目前仅浏览器支持完整功能，客户端仅能显示静态页面，推荐使用浏览器打开。',
            //   () => {
            //     open(URI)
            //   },
            //   '提示',
            //   () => {
            //     navigation.push('Award', {
            //       uri: URI
            //     })
            //   },
            //   '浏览器',
            //   '客户端'
            // )

            navigation.push('Award', {
              uri: URI
            })
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
        <View style={styles.fixed}>
          <Touchable
            onPress={() => {
              navigation.push('Award', {
                uri: 'https://bgm.tv/award/2024/winner'
              })
            }}
          >
            <Text style={styles.tba} type='__plain__' size={12} bold>
              TBA
            </Text>
          </Touchable>
        </View>
      </View>
    )
  })
}

export default Award2024
