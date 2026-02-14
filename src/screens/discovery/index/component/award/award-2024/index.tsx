/*
 * @Author: czy0729
 * @Date: 2025-01-27 15:33:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-08 22:02:11
 */
import React from 'react'
import { View } from 'react-native'
import { Image, Text, Touchable } from '@components'
import { useNavigation, useObserver } from '@utils/hooks'
import { ASSETS_AWARDS, TEXT_ONLY } from '@constants'
import { COMPONENT, URI } from './ds'
import { memoStyles } from './styles'

function Award2024() {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <View style={styles.container}>
        <Touchable
          animate
          onPress={() => {
            navigation.push('Award', {
              uri: URI
            })
          }}
        >
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
