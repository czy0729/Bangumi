/*
 * @Author: czy0729
 * @Date: 2019-05-13 20:33:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 13:51:53
 */
import React from 'react'
import { Flex, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { ColorValue, TextStyle, ViewStyle } from '@types'

type Props = {
  style?: ViewStyle
  iconStyle?: TextStyle
  color?: ColorValue
  size?: number
  children?: any
  onPress?: (event?: any) => any
}

export const IconReverse = ob(
  ({ style, iconStyle, color, size, children, onPress }: Props) => (
    <Touchable style={[styles.touch, style]} onPress={onPress}>
      <Flex style={styles.btn} justify='center'>
        <Iconfont style={iconStyle} name='md-sort' size={size} color={color} />
      </Flex>
      {children}
    </Touchable>
  )
)

const styles = _.create({
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    width: 38,
    height: 38
  }
})
