/*
 * @Author: czy0729
 * @Date: 2024-01-03 00:51:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-14 09:28:24
 */
import React, { useCallback } from 'react'
import { Heatmap } from '@components'
import { MesumeChat } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Modal from '../modal'
import { COMPONENT } from './ds'

import type { Loaded } from '@types'
import type { Ctx } from '../../types'

function Extra() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleRefresh = useCallback(() => {
    $.doChat(true)
  }, [$])

  return useObserver(() => {
    const { chatModalVisible, chatLoading, chat } = $.state
    const { index } = chat

    let value = ''
    let time: Loaded = false
    if ($.currentChatValues.length) {
      const safeIndex = index === -1 || index > $.currentChatValues.length - 1 ? 0 : index
      const current = $.currentChatValues[safeIndex]
      value = current.text
      time = current._loaded
    }

    return (
      <>
        <Modal />
        <MesumeChat
          show={chatModalVisible}
          value={value}
          time={time}
          loading={chatLoading}
          onClose={$.hideChatModal}
          onBefore={$.beforeChat}
          onNext={$.nextChat}
          onRefresh={handleRefresh}
        />
        <Heatmap id='条目' screen='Subject' />
      </>
    )
  })
}

export default Extra
