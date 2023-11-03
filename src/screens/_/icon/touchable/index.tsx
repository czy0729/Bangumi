/*
 * @Author: czy0729
 * @Date: 2019-07-28 01:24:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-28 10:58:54
 */
import React from 'react'
import { Touchable, Flex, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { styles } from './styles'
import { Props as IconTouchableProps } from './types'

export { IconTouchableProps }

export const IconTouchable = ob(
  ({
    style,
    name,
    size,
    color,
    count = 0,
    withoutFeedback,
    hitSlop,
    children,
    onPress
  }: IconTouchableProps) => {
    if (count) {
      return (
        <Touchable
          style={stl(styles.icon, style)}
          withoutFeedback={withoutFeedback}
          scale={0.8}
          hitSlop={hitSlop}
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
        style={stl(styles.icon, style)}
        withoutFeedback={withoutFeedback}
        scale={0.8}
        hitSlop={hitSlop}
        onPress={onPress}
      >
        <Iconfont name={name} size={size} color={color} />
        {children}
      </Touchable>
    )
  }
)
