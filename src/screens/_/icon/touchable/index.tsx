/*
 * @Author: czy0729
 * @Date: 2019-07-28 01:24:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 13:39:38
 */
import React from 'react'
import { Touchable, Flex, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { ColorValue, IconfontNames, ViewStyle } from '@types'

type Props = {
  style?: ViewStyle
  name: IconfontNames
  size?: number
  color?: ColorValue
  count?: number | string
  withoutFeedback?: boolean
  children?: any
  onPress?: (event?: any) => any
}

export const IconTouchable = ob(
  ({
    style,
    name,
    size,
    color,
    count = 0,
    withoutFeedback,
    children,
    onPress
  }: Props) => {
    if (count) {
      return (
        <Touchable
          style={[styles.icon, style]}
          withoutFeedback={withoutFeedback}
          onPress={onPress}
        >
          <Flex align='end'>
            <Iconfont name={name} size={size} color={color} />
            <Text style={_.ml.xs} type='sub' size={10}>
              {count}
            </Text>
          </Flex>
          {children}
        </Touchable>
      )
    }

    return (
      <Touchable
        style={[styles.icon, style]}
        withoutFeedback={withoutFeedback}
        onPress={onPress}
      >
        <Iconfont name={name} size={size} color={color} />
        {children}
      </Touchable>
    )
  }
)

const styles = _.create({
  icon: {
    padding: _.sm,
    borderRadius: 20,
    overflow: 'hidden'
  }
})
