/*
 * @Author: czy0729
 * @Date: 2021-01-03 04:41:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-18 11:55:17
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function IconLayout({ $ }) {
  return (
    <IconTouchable
      style={_.mr._xs}
      name={$.isList ? 'md-grid-view' : 'md-menu'}
      color={_.colorTitle}
      onPress={$.switchLayout}
    >
      <Heatmap right={30} id='索引.切换布局' />
    </IconTouchable>
  )
}

export default ob(IconLayout)
