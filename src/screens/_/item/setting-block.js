/*
 * @Author: czy0729
 * @Date: 2022-01-19 06:36:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-12 11:33:39
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const ItemSettingBlock = ob(
  ({ style, title, information, informationType = 'sub', size = 16, children }) => {
    const styles = memoStyles()
    return (
      <View style={[styles.container, style]}>
        {!!title && (
          <Text type='title' size={size} bold>
            {title}
          </Text>
        )}
        {!!information && (
          <Text style={_.mt.xs} type={informationType} size={12} lineHeight={14}>
            {information}
          </Text>
        )}
        <Flex style={_.mt.md}>{children}</Flex>
      </View>
    )
  }
)

ItemSettingBlock.Item = ob(
  ({
    style,
    itemStyle,
    show = true,
    active = false,
    icon,
    iconStyle,
    iconColor,
    title,
    information,
    informationType = 'sub',
    children,
    onPress = Function.prototype
  }) => {
    if (!show) return null

    const styles = memoStyles()
    return (
      <Flex.Item style={style}>
        <Touchable style={[styles.touch, active && styles.active]} onPress={onPress}>
          <Flex
            style={[styles.body, itemStyle]}
            direction='column'
            justify='center'
            align='center'
          >
            {!!icon && (
              <Iconfont
                style={[_.mb.sm, iconStyle]}
                name={icon}
                color={iconColor || _.colorSub}
                size={20}
              />
            )}
            <Text size={15} align='center'>
              {title}
            </Text>
            {!!information && (
              <Text
                style={_.mt.xs}
                type={informationType}
                size={10}
                lineHeight={11}
                align='center'
              >
                {information}
              </Text>
            )}
            {children}
          </Flex>
        </Touchable>
      </Flex.Item>
    )
  }
)

export { ItemSettingBlock }

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _._wind,
    paddingBottom: _.md
  },
  touch: {
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  active: {
    borderColor: _.colorSuccess
  },
  body: {
    height: 88,
    paddingHorizontal: _.xs
  }
}))
