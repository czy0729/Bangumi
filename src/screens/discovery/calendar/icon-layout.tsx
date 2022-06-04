/*
 * @Author: czy0729
 * @Date: 2020-04-10 18:18:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 01:19:33
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconLayout as Icon } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function IconLayout({ isList = true, onPress = Function.prototype }) {
  return (
    <Icon style={_.ml.xxs} list={isList} size={20} onPress={onPress}>
      <Heatmap right={30} id='每日放送.切换布局' />
    </Icon>
  )
}

export default ob(IconLayout)
