/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:51:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-28 17:00:33
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { open } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { THUMB_HEIGHT, THUMB_WIDTH } from '../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function Video({ item, epsThumbsHeader, showTitle = true }: Props) {
  r(COMPONENT)

  return useObserver(() => {
    if (!systemStore.setting.showCharacter) return null

    return (
      <View style={styles.video}>
        <Touchable animate withoutFeedback onPress={() => open(item.src || item.href)}>
          <Image
            src={item.cover}
            size={THUMB_WIDTH}
            height={THUMB_HEIGHT}
            headers={epsThumbsHeader}
            skeleton={false}
            radius={_.radiusSm}
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
            <Text
              style={styles.title}
              size={11}
              lineHeight={14}
              bold
              numberOfLines={3}
              align='center'
            >
              {item.title}
            </Text>
          )}
        </Touchable>
      </View>
    )
  })
}

export default Video
