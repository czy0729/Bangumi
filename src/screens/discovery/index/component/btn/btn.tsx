/*
 * @Author: czy0729
 * @Date: 2021-10-19 17:56:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 16:58:49
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { IconMenu } from '@_'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { COMPONENT_MAIN } from './ds'
import { memoStyles } from './styles'

import type { MainProps } from './types'

const BtnMain = ({ item, userId, showIcon = true, onPress }: MainProps) => {
  r(COMPONENT_MAIN)

  return useObserver(() => {
    const styles = memoStyles()

    const isSm = systemStore.setting.discoveryMenuNum >= 5
    const wrapStyle = isSm ? styles.wrapSm : styles.wrap
    const itemStyle = isSm ? styles.itemSm : styles.item
    if (item.key === 'Split') {
      return (
        <View style={_.container.touch}>
          <View style={wrapStyle}>
            <Flex style={itemStyle} justify='center'>
              <View style={styles.split} />
            </Flex>
          </View>
        </View>
      )
    }

    const elContent = (
      <Flex style={wrapStyle} justify='center'>
        <Flex style={itemStyle} direction='column' justify='center'>
          {showIcon && (
            <IconMenu id={item.key} icon={item.icon} text={item.text} size={item.size} />
          )}
          <Text style={_.mt.sm} size={12} align='center' bold numberOfLines={1}>
            {item.name}
          </Text>
        </Flex>
      </Flex>
    )

    if (onPress) {
      return (
        <Touchable
          style={stl(_.container.touch, WEB && item.login && !userId && styles.disabled)}
          animate
          onPress={onPress}
        >
          {elContent}
          <Heatmap id='发现.跳转' to={item.key} alias={item.name} />
        </Touchable>
      )
    }

    return <View style={_.container.touch}>{elContent}</View>
  })
}

export default BtnMain
