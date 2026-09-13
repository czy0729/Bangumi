/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 04:28:41
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Highlight, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { FROZEN_FN } from '@constants'
import { memoStyles } from './styles'

import type { IconfontNames } from '@types'
import type { ItemSettingBlockItemProps } from './types'

const ItemSettingBlockItem = observer(
  ({
    style,
    itemStyle,
    show = true,
    active = false,
    icon,
    iconStyle,
    iconColor,
    title,
    titleSize = 14,
    information,
    informationSize = 10,
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
                <View style={stl(_.mb.sm, iconStyle)}>
                  {typeof icon === 'string' ? (
                    <Iconfont name={icon as IconfontNames} color={iconColor || _.colorSub} size={20} />
                  ) : (
                    icon
                  )}
                </View>
              )}
              <Highlight size={titleSize} align='center' value={filter}>
                {title}
              </Highlight>
              {!!information && (
                <Highlight
                  style={_.mt.xs}
                  type={informationType}
                  size={informationSize}
                  lineHeight={informationSize + 1}
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
