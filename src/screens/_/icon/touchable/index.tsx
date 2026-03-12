/*
 * @Author: czy0729
 * @Date: 2019-07-28 01:24:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 10:01:28
 */
import React from 'react'
import { Component, Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as IconTouchableProps } from './types'

export type { IconTouchableProps }

export const IconTouchable = ob(
  ({
    style,
    name,
    size,
    color,
    shadow,
    count = 0,
    withoutFeedback,
    hitSlop,
    children,
    onPress
  }: IconTouchableProps) => {
    if (count) {
      return (
        <Component id='icon-touchable' data-type='count'>
          <Touchable
            style={stl(styles.icon, style)}
            withoutFeedback={withoutFeedback}
            scale={0.8}
            hitSlop={hitSlop}
            onPress={onPress}
          >
            <Flex align='end'>
              <Iconfont name={name} size={size} color={color} shadow={shadow} />
              <Text style={_.ml.xs} type='sub' size={10}>
                {count}
              </Text>
            </Flex>
            {children}
          </Touchable>
        </Component>
      )
    }

    return (
      <Component id='icon-touchable'>
        <Touchable
          style={stl(styles.icon, style)}
          withoutFeedback={withoutFeedback}
          scale={0.8}
          hitSlop={hitSlop}
          onPress={onPress}
        >
          <Iconfont name={name} size={size} color={color} shadow={shadow} />
          {children}
        </Touchable>
      </Component>
    )
  },
  COMPONENT
)

export default IconTouchable
