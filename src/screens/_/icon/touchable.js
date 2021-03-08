/*
 * @Author: czy0729
 * @Date: 2019-07-28 01:24:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 19:54:52
 */
import React from 'react'
import { Touchable, Flex, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

export const IconTouchable = ob(
  ({ style, name, size = 16, color, count = 0, children, onPress }) => {
    if (count) {
      return (
        <Touchable style={[styles.icon, style]} onPress={onPress}>
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
      <Touchable style={[styles.icon, style]} onPress={onPress}>
        <Iconfont name={name} size={size} color={color} />
        {children}
      </Touchable>
    )
  }
)

const styles = _.create({
  icon: {
    padding: _.sm
  }
})
