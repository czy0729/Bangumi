/*
 * @Author: czy0729
 * @Date: 2024-11-08 06:50:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 18:58:55
 */
import React from 'react'
import { View } from 'react-native'
import { IconTouchable } from '@_'
import { systemStore, useStore } from '@stores'
import { isChineseParagraph } from '@utils'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { styles } from './styles'

function Translate({ content = '' }) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
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
  })
}

export default Translate
