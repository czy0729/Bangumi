/*
 * @Author: czy0729
 * @Date: 2019-05-13 20:33:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-09 13:03:06
 */
import React from 'react'
import { Flex, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

export const IconReverse = ob(
  ({ style, iconStyle, color, size, children, onPress }) => (
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
