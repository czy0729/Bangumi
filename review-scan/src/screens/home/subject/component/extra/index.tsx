/*
 * @Author: czy0729
 * @Date: 2024-01-03 00:51:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-14 09:28:24
 */
import React from 'react'
import { Heatmap } from '@components'
import { MesumeChat } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Loaded } from '@types'
import { Ctx } from '../../types'
import Modal from '../modal'
import { COMPONENT } from './ds'

function Extra() {
  const { $ } = useStore<Ctx>()
  const { chatModalVisible, chatLoading, chat } = $.state
  const { index } = chat

  let value = ''
  let time: Loaded = false
  if ($.currentChatValues.length) {
    if (index === -1 || index > $.currentChatValues.length - 1) {
      value = $.currentChatValues[0].text
      time = $.currentChatValues[0]._loaded
    } else {
      value = $.currentChatValues[index].text
      time = $.currentChatValues[index]._loaded
    }
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
        onRefresh={() => $.doChat(true)}
      />
      <Heatmap id='条目' screen='Subject' />
    </>
  )
}

export default ob(Extra, COMPONENT)
