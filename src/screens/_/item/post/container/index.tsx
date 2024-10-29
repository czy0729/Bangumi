/*
 * @Author: czy0729
 * @Date: 2024-01-23 19:48:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-23 19:52:37
 */
import React from 'react'
import { Component } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Container({ id, subLength, isNew, children }) {
  const styles = memoStyles()
  return (
    <Component
      id='item-post'
      data-key={id}
      style={stl(styles.item, subLength && styles.itemWithSub, isNew && styles.new)}
    >
      {children}
    </Component>
  )
}

export default ob(Container)
