/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:29:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:12:24
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { systemStore, useStore } from '@stores'
import { isChineseParagraph } from '@utils'
import { COMPONENT_TRANSLATE } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function IconTranslate({ content = '' }) {
  const { $ } = useStore<Ctx>(COMPONENT_TRANSLATE)

  if (
    !systemStore.setting.showSummary ||
    $.state.translateResult.length ||
    (content && isChineseParagraph(content))
  ) {
    return null
  }

  return (
    <IconTouchable style={styles.translate} name='md-g-translate' size={18} onPress={$.doTranslate}>
      <Heatmap id='条目.翻译简介' />
    </IconTouchable>
  )
}

export default observer(IconTranslate)
