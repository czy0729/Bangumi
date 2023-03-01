/*
 * @Author: czy0729
 * @Date: 2021-10-19 17:56:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 07:24:02
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const BtnMain = ({ item, onPress }, { $ }: Ctx) => {
  const styles = memoStyles()
  const { key, name, text, icon, size } = item

  const isSm = $.discoveryMenuNum === 5
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
  const iconTextSize = (size || 16) - (isSm ? 2 : 0)
  const iconSize = (size || 24) - (isSm ? 2 : 0)
  const textSize = 13 - (isSm ? 1 : 0)
  const content = (
    <Flex style={wrapStyle} justify='center'>
      <Flex style={itemStyle} direction='column' justify='center'>
        <View style={iconWrapStyle}>
          <Flex style={iconStyle} justify='center'>
            {text ? (
              <Text type='__plain__' size={iconTextSize} bold>
                {text}
              </Text>
            ) : (
              <Iconfont name={icon} size={iconSize} color={_.__colorPlain__} />
            )}
          </Flex>
        </View>
        <Text style={_.mt.sm} size={textSize} align='center' bold>
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

export default obc(BtnMain)
