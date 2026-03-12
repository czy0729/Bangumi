/*
 * @Author: czy0729
 * @Date: 2025-02-04 07:13:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 10:01:45
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function MesumeChat() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <IconTouchable
      style={styles.mesume}
      name='md-chat-bubble-outline'
      size={19}
      color={_.__colorPlain__}
      shadow
      onPress={$.doChat}
    />
  ))
}

export default MesumeChat
