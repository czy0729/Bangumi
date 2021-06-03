/*
 * @Author: czy0729
 * @Date: 2021-05-27 10:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-27 10:48:32
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconFolder() {
  return (
    <IconTouchable
      name='md-folder-open'
      size={20}
      color={_.colorIcon}
      onPress={() => {}}
    >
      <Heatmap id='条目.目录管理' />
    </IconTouchable>
  )
}

export default obc(IconFolder)
