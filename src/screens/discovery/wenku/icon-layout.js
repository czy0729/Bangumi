/*
 * @Author: czy0729
 * @Date: 2021-01-03 05:30:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-18 15:55:42
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconLayout as Icon } from '@screens/_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function IconLayout({ $ }) {
  return (
    <Icon style={_.mr._xs} list={$.isList} onPress={$.switchLayout}>
      <Heatmap right={30} id='文库.切换布局' />
    </Icon>
  )
}

export default ob(IconLayout)
