/*
 * @Author: czy0729
 * @Date: 2020-04-10 18:18:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 15:11:42
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconLayout as Icon } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function IconLayout({ isList = true, onPress = () => {} }) {
  return (
    <Icon style={_.ml.sm} list={isList} size={20} onPress={onPress}>
      <Heatmap right={30} id='每日放送.切换布局' />
    </Icon>
  )
}

export default ob(IconLayout, COMPONENT)
