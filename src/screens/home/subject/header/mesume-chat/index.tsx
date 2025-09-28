/*
 * @Author: czy0729
 * @Date: 2025-02-04 07:13:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-29 06:27:34
 */
import React from 'react'
import { IconTouchable } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { styles } from './styles'
import { Props } from './types'

function MesumeChat({ color }: Props) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <IconTouchable
      style={styles.mesume}
      size={18}
      color={color}
      name='md-chat-bubble-outline'
      onPress={$.doChat}
    />
  ))
}

export default MesumeChat
