/*
 * @Author: czy0729
 * @Date: 2021-10-19 17:56:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-07 09:09:01
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont, Squircle, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT_MAIN } from './ds'
import { memoStyles } from './styles'

const BtnMain = ({ item, onPress }, { $ }: Ctx) => {
  const styles = memoStyles()
  const { key, name, text, icon, size } = item

  const isSm = systemStore.setting.discoveryMenuNum >= 5
  const wrapStyle = isSm ? styles.wrapSm : styles.wrap
  const itemStyle = isSm ? styles.itemSm : styles.item

  if (key === 'Split') {
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

  const iconWrapStyle = isSm ? styles.iconWrapSm : styles.iconWrap
  const iconStyle = isSm ? styles.iconSm : styles.icon
  const { width } = iconStyle
  const iconTextSize = (size || 16) - (isSm ? 2 : 0)
  const iconSize = (size || 24) - (isSm ? 2 : 0)
  const textSize = 12
  const content = (
    <Flex style={wrapStyle} justify='center'>
      <Flex style={itemStyle} direction='column' justify='center'>
        <Squircle style={iconWrapStyle} width={width} height={width} radius={width}>
          <Flex style={iconStyle} justify='center'>
            {text ? (
              <Text type='__plain__' size={iconTextSize} bold>
                {text}
              </Text>
            ) : (
              <Iconfont name={icon} size={iconSize} color={_.__colorPlain__} />
            )}
          </Flex>
        </Squircle>
        <Text style={_.mt.sm} size={textSize} align='center' bold numberOfLines={1}>
          {name}
        </Text>
      </Flex>
    </Flex>
  )

  if (onPress) {
    return (
      <Touchable style={_.container.touch} animate onPress={onPress}>
        {content}
        <Heatmap id='发现.跳转' to={key} alias={name} />
      </Touchable>
    )
  }

  return <View style={_.container.touch}>{content}</View>
}

export default obc(BtnMain, COMPONENT_MAIN)
