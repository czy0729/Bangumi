/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:05:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 03:05:07
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { IconTouchable } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function IconDisc(props, { $ }: Ctx) {
  return (
    <IconTouchable
      style={[_.ml.sm, _.mr._sm]}
      name='md-g-translate'
      size={18}
      onPress={$.doDiscTranslate}
    >
      <Heatmap id='条目.翻译曲目' />
    </IconTouchable>
  )
}

export default obc(IconDisc)
