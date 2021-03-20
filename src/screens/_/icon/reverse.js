/*
 * @Author: czy0729
 * @Date: 2019-05-13 20:33:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-18 17:38:00
 */
import React from 'react'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

export const IconReverse = ob(({ style, color, size, children, onPress }) => (
  <Touchable style={[styles.container, style]} onPress={onPress}>
    <Iconfont name='md-sort' size={size} color={color} />
    {children}
  </Touchable>
))

const styles = _.create({
  container: {
    padding: _.sm
  }
})
