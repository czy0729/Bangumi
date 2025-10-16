/*
 * @Author: czy0729
 * @Date: 2025-02-04 07:13:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 17:27:23
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function MesumeChat() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <IconTouchable
      style={styles.mesume}
      size={18}
      color={_.colorDesc}
      name='md-chat-bubble-outline'
      onPress={$.doChat}
    />
  ))
}

export default MesumeChat
