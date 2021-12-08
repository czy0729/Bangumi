/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:29:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 12:41:32
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'

function IconTranslate(props, { $ }) {
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
