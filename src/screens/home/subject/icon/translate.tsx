/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:29:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 03:10:34
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function IconTranslate(props, { $ }: Ctx) {
  const { showSummary } = systemStore.setting
  const { translateResult } = $.state
  if (!showSummary || translateResult.length) return null

  return (
    <IconTouchable
      style={_.mr._sm}
      name='md-g-translate'
      size={18}
      onPress={$.doTranslate}
    >
      <Heatmap id='条目.翻译简介' />
    </IconTouchable>
  )
}

export default obc(IconTranslate)
