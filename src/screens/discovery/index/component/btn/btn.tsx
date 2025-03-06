/*
 * @Author: czy0729
 * @Date: 2021-10-19 17:56:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 10:31:35
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont, Image, Squircle, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { GROUP_THUMB_MAP } from '@assets/images'
import { COMPONENT_MAIN } from './ds'
import { memoStyles } from './styles'

const BtnMain = ({ item, userId, showIcon = true, onPress }) => {
  const styles = memoStyles()
  const { key, name, text, icon, size, login } = item
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
  const elContent = (
    <Flex style={wrapStyle} justify='center'>
      <Flex style={itemStyle} direction='column' justify='center'>
        {showIcon && (
          <Squircle style={iconWrapStyle} width={width} height={width} radius={width}>
            <Flex style={iconStyle} justify='center'>
              {key === 'WordCloud' ? (
                <Image
                  src={GROUP_THUMB_MAP.wordcloud}
                  size={19}
                  resizeMode='contain'
                  placeholder={false}
                  skeleton={false}
                />
              ) : text ? (
                <Text type='__plain__' size={iconTextSize} bold>
                  {text}
                </Text>
              ) : (
                <Iconfont name={icon} size={iconSize} color={_.__colorPlain__} />
              )}
            </Flex>
          </Squircle>
        )}
        <Text style={_.mt.sm} size={textSize} align='center' bold numberOfLines={1}>
          {name}
        </Text>
      </Flex>
    </Flex>
  )

  if (onPress) {
    return (
      <Touchable
        style={stl(_.container.touch, WEB && login && !userId && styles.disabled)}
        animate
        onPress={onPress}
      >
        {elContent}
        <Heatmap id='发现.跳转' to={key} alias={name} />
      </Touchable>
    )
  }

  return <View style={_.container.touch}>{elContent}</View>
}

export default ob(BtnMain, COMPONENT_MAIN)
