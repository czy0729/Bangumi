/*
 * @Author: czy0729
 * @Date: 2025-02-04 07:13:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:30:47
 */
import React from 'react'
import { observer } from 'mobx-react'
import { IconTouchable } from '@_'
import { useStore } from '@stores'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function MesumeChat({ color }: Props) {
  const { $ } = useStore<Ctx>()

  return (
    <IconTouchable
      style={styles.mesume}
      size={18}
      color={color}
      name='md-chat-bubble-outline'
      onPress={$.doChat}
    />
  )
}

export default observer(MesumeChat)
