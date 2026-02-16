/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:29:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:01:23
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _, systemStore, useStore } from '@stores'
import { isChineseParagraph } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'

function IconTranslate({ content = '' }) {
  const { $ } = useStore<Ctx>()
  if (
    !systemStore.setting.showSummary ||
    $.state.translateResult.length ||
    (content && isChineseParagraph(content))
  ) {
    return null
  }

  return (
    <IconTouchable style={_.mr._sm} name='md-g-translate' size={18} onPress={$.doTranslate}>
      <Heatmap id='条目.翻译简介' />
    </IconTouchable>
  )
}

export default ob(IconTranslate)
