/*
 * @Author: czy0729
 * @Date: 2022-06-04 07:01:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-04 07:02:37
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function Back(props, { $ }) {
  return (
    <ToolBar.Icon
      icon='md-arrow-back'
      iconColor={_.colorDesc}
      onSelect={$.onAirdatePrev}
    />
  )
}

export default obc(Back)
