/*
 * @Author: czy0729
 * @Date: 2024-11-08 06:50:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 06:57:49
 */
import React from 'react'
import { View } from 'react-native'
import { IconTouchable } from '@_'
import { systemStore } from '@stores'
import { isChineseParagraph } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'

function Translate({ content = '' }, { $ }: Ctx) {
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

export default obc(Translate)
