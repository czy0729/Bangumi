/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:58:58
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Highlight, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
import { memoStyles } from './styles'
import { ItemSettingBlockItemProps } from './types'

const ItemSettingBlockItem = ob(
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
    filter,
    children,
    onPress = FROZEN_FN
  }: ItemSettingBlockItemProps) => {
    if (!show) return null

    const styles = memoStyles()
    return (
      <Flex.Item style={style}>
        <Touchable animate onPress={onPress}>
          <View style={stl(styles.touch, active && styles.active)}>
            <Flex
              style={stl(styles.body, itemStyle)}
              direction='column'
              justify='center'
              align='center'
            >
              {!!icon && (
                <Iconfont
                  style={stl(_.mb.sm, iconStyle)}
                  name={icon}
                  color={iconColor || _.colorSub}
                  size={20}
                />
              )}
              <Highlight size={15} align='center' value={filter}>
                {title}
              </Highlight>
              {!!information && (
                <Highlight
                  style={_.mt.xs}
                  type={informationType}
                  size={10}
                  lineHeight={11}
                  align='center'
                  value={filter}
                >
                  {information}
                </Highlight>
              )}
              {children}
            </Flex>
          </View>
        </Touchable>
      </Flex.Item>
    )
  }
)

export default ItemSettingBlockItem
