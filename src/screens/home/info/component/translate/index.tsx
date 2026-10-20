/*
 * @Author: czy0729
 * @Date: 2024-11-08 06:50:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-05 22:00:09
 *
 * 简介翻译入口: 非中文且未翻译时显示
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { IconTouchable } from '@_'
import { systemStore, useStore } from '@stores'
import { isChineseParagraph } from '@utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Translate({ content = '' }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

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
