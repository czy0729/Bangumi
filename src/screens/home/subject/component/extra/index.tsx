/*
 * @Author: czy0729
 * @Date: 2024-01-03 00:51:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-04 07:30:46
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
  const { chatModalVisible, chat } = $.state
  return (
    <>
      <Modal />
      <MesumeChat show={chatModalVisible} value={chat.value} onClose={$.hideChatModal} />
      <Heatmap id='条目' screen='Subject' />
    </>
  )
}

export default ob(Extra, COMPONENT)
