/*
 * @Author: czy0729
 * @Date: 2025-02-04 07:13:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-10 00:00:26
 */
import React from 'react'
import { IconTouchable } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'

function MesumeChat({ color }) {
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

export default ob(MesumeChat)
