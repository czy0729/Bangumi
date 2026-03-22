/*
 * @Author: czy0729
 * @Date: 2025-02-04 07:13:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:47:37
 */
import React from 'react'
import { observer } from 'mobx-react'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function MesumeChat() {
  const { $ } = useStore<Ctx>()

  return (
    <IconTouchable
      style={styles.mesume}
      name='md-chat-bubble-outline'
      size={19}
      color={_.__colorPlain__}
      shadow
      onPress={$.doChat}
    />
  )
}

export default observer(MesumeChat)
