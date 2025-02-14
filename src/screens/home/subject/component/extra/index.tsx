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
  const { values, index } = chat

  let value = ''
  let time: Loaded = false
  if (values.length) {
    if (index === -1 || index > values.length - 1) {
      value = values[0].text
      time = values[0]._loaded
    } else {
      value = values[index].text
      time = values[index]._loaded
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
