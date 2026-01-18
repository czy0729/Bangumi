/*
 * @Author: czy0729
 * @Date: 2022-11-22 05:49:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 20:56:34
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { IconMenu } from '@_'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

import type { Props } from './types'

function Btn({ style, item, active = false, onPress }: Props) {
  return useObserver(() => {
    const styles = memoStyles()
    if (!item) return <View style={styles.btn} />

    return (
      <Touchable style={stl(styles.btn, active && styles.btnActive, style)} onPress={onPress}>
        <Flex style={styles.btn} direction='column' justify='center'>
          <View style={styles.icon}>
            <IconMenu
              id={item.key}
              icon={item.icon}
              text={item.text}
              size={item.size}
              wrap={false}
            />
          </View>
          <Text size={10} bold>
            {item.name}
          </Text>
        </Flex>
      </Touchable>
    )
  })
}

export default Btn
