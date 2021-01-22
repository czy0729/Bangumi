/*
 * @Author: czy0729
 * @Date: 2019-05-13 20:33:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-22 11:28:03
 */
import React from 'react'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'

function IconReverse({ style, color, size, children, onPress }) {
  return (
    <Touchable style={[styles.container, style]} onPress={onPress}>
      <Iconfont name='sort' size={size} color={color} />
      {children}
    </Touchable>
  )
}

IconReverse.defaultProps = {
  size: 14
}

export default IconReverse

const styles = _.create({
  container: {
    padding: _.sm
  }
})
