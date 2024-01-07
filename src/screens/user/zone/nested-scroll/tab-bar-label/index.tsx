/*
 * @Author: czy0729
 * @Date: 2024-01-01 20:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 22:49:17
 */
import React from 'react'
import { Text } from '@components'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function TabBarLabel({ style, title }) {
  return (
    <Text style={style} type='title' size={13} noWrap>
      {title}
    </Text>
  )
}

export default ob(TabBarLabel, COMPONENT)
