/*
 * @Author: czy0729
 * @Date: 2024-11-08 06:50:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-05 22:00:09
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { IconTouchable } from '@_'
import { systemStore, useStore } from '@stores'
import { isChineseParagraph } from '@utils'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Translate({ content = '' }) {
  const { $ } = useStore<Ctx>()

  if (
    !systemStore.setting.showSummary ||
    $.state.translateResult.length ||
    (content && isChineseParagraph(content))
  ) {
    return null
  }

  return (
    <View style={styles.icon}>
      <IconTouchable name='md-g-translate' size={18} onPress={$.doTranslate} />
    </View>
  )
}

export default observer(Translate)
