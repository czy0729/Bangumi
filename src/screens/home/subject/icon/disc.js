/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:05:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-18 19:17:59
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { IconTouchable } from '@_'
import { obc } from '@utils/decorators'

function IconDisc(props, { $ }) {
  return (
    <IconTouchable
      style={_.mr._sm}
      name='md-g-translate'
      size={18}
      onPress={$.doDiscTranslate}
    >
      <Heatmap id='条目.翻译曲目' />
    </IconTouchable>
  )
}

export default obc(IconDisc)
