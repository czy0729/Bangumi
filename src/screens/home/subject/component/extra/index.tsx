/*
 * @Author: czy0729
 * @Date: 2024-01-03 00:51:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-06 07:32:09
 */
import React from 'react'
import { Heatmap } from '@components'
import { MesumeChat } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Modal from '../modal'
import { COMPONENT } from './ds'

function Extra() {
  const { $ } = useStore<Ctx>()
  const { chatModalVisible, chatLoading, chat } = $.state
  const { values, index } = chat

  let value = ''
  if (values.length) {
    if (index === -1 || index > values.length - 1) {
      value = values[0].text
    } else {
      value = values[index].text
    }
  }

  return (
    <>
      <Modal />
      <MesumeChat
        show={chatModalVisible}
        value={value}
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
