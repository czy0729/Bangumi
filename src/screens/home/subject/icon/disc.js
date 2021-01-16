/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:05:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-16 20:08:06
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@screens/_'
import { obc } from '@utils/decorators'

function IconDisc(props, { $ }) {
  return (
    <IconTouchable name='translate' size={16} onPress={$.doDiscTranslate}>
      <Heatmap id='条目.翻译曲目' />
    </IconTouchable>
  )
}

export default obc(IconDisc)
