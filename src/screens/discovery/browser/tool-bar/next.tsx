/*
 * @Author: czy0729
 * @Date: 2022-06-04 07:24:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-04 07:24:57
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function Next(props, { $ }) {
  return (
    <ToolBar.Icon
      icon='md-arrow-forward'
      iconColor={_.colorDesc}
      onSelect={$.onAirdateNext}
    />
  )
}

export default obc(Next)
