/*
 * @Author: czy0729
 * @Date: 2024-01-03 00:51:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:14:03
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { MesumeChat } from '@_'
import { useStore } from '@stores'
import Modal from '../modal'
import { COMPONENT } from './ds'

import type { Loaded } from '@types'
import type { Ctx } from '../../types'

function Extra() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleRefresh = useCallback(() => {
    $.doChat(true)
  }, [$])

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
}

export default observer(Extra)
