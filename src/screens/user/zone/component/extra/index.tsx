/*
 * @Author: czy0729
 * @Date: 2024-01-16 18:30:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:38:29
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Track } from '@components'
import { MesumeChat } from '@_'
import { useStore } from '@stores'
import Heatmaps from '../heatmaps'
import RemarkModal from '../remark-modal'
import UsedModal from '../used-modal'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Extra() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleRefresh = useCallback(() => {
    $.doChat(true)
  }, [$])

  const { chatModalVisible, chatLoading, chat } = $.state
  const { index } = chat

  let value = ''
  if ($.currentChatValues.length) {
    if (index === -1 || index > $.currentChatValues.length - 1) {
      value = $.currentChatValues[0].text
    } else {
      value = $.currentChatValues[index].text
    }
  }

  return (
    <>
      <UsedModal $={$} visible={$.state.visible} defaultAvatar={$.src} />
      <RemarkModal />
      <MesumeChat
        show={chatModalVisible}
        value={value}
        loading={chatLoading}
        onClose={$.hideChatModal}
        onBefore={$.beforeChat}
        onNext={$.nextChat}
        onRefresh={handleRefresh}
      />
      <Track title='空间' domTitle={$.nickname ? `${$.nickname}的空间` : ''} hm={$.hm} />
      <Heatmaps />
    </>
  )
}

export default observer(Extra)
