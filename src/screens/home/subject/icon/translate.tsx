/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:29:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-20 21:13:03
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _, systemStore } from '@stores'
import { isChineseParagraph } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function IconTranslate({ content = '' }, { $ }: Ctx) {
  const { showSummary } = systemStore.setting
  const { translateResult } = $.state
  if (
    !showSummary ||
    translateResult.length ||
    (content && isChineseParagraph(content))
  ) {
    return null
  }

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
