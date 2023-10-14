/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:51:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-14 13:25:39
 */
import React from 'react'
import { View } from 'react-native'
import { Image, Flex, Touchable, Text } from '@components'
import { _, systemStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { THUMB_WIDTH, THUMB_HEIGHT } from './ds'
import { styles } from './styles'

function Video({ item, epsThumbsHeader, showTitle }) {
  const { showCharacter } = systemStore.setting
  if (!showCharacter) return null

  return (
    <View key={item.cover} style={styles.video}>
      <Touchable animate onPress={() => open(item.src || item.href)}>
        <Image
          style={styles.image}
          src={item.cover}
          size={THUMB_WIDTH}
          height={THUMB_HEIGHT}
          radius={_.radiusXs}
          headers={epsThumbsHeader}
        />
        <View style={styles.play}>
          <View style={styles.touch}>
            <Flex style={styles.touch} justify='center'>
              <Text style={styles.icon} type='__plain__'>
                ▶
              </Text>
            </Flex>
          </View>
        </View>
        {showTitle && !!item.title && (
          <Text style={styles.title} size={11} bold numberOfLines={3} align='center'>
            {item.title}
          </Text>
        )}
      </Touchable>
    </View>
  )
}

export default ob(Video)
