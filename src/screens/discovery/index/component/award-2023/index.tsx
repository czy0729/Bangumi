/*
 * @Author: czy0729
 * @Date: 2024-02-11 03:50:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 03:59:14
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useNavigation } from '@utils/hooks'
import { HOST } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Award2023({ width, height }: { width?: number; height?: number }) {
  r(COMPONENT)

  const navigation = useNavigation()

  return useObserver(() => {
    const styles = memoStyles()
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
          animate
          onPress={() => {
            navigation.push('Award', {
              uri: `${HOST}/award/2023`
            })
          }}
        >
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
            <View style={styles.header}>
              {!_.isDark && <View style={styles.line} />}
              <View style={styles.line} />
              <View style={styles.line} />
              <View style={styles.line} />
              <View style={styles.line} />
              <View style={styles.close}>
                <View style={styles.closeMain} />
              </View>
              <Flex style={styles.title} justify='center'>
                <Text type='title' size={12} bold>
                  BGM.TV
                </Text>
              </Flex>
            </View>
            <Flex style={styles.content} direction='column' justify='center'>
              <Text type='title' size={21} bold>
                bOS 23
              </Text>
              <Text style={_.mt.xs} size={13} type='title' bold>
                YEAR IN REVIEW 2023
              </Text>
            </Flex>
          </View>
        </Touchable>
      </View>
    )
  })
}

export default Award2023
