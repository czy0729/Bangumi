/*
 * @Author: czy0729
 * @Date: 2020-12-16 00:58:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-07 07:22:15
 */
import React from 'react'
import { Heatmap } from '@components'
import { MesumeChat } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
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
      <MesumeChat
        show={chatModalVisible}
        value={value}
        loading={chatLoading}
        onClose={$.hideChatModal}
        onBefore={$.beforeChat}
        onNext={$.nextChat}
        onRefresh={() => $.doChat(true)}
      />
      <Heatmap right={2} bottom={160} id='帖子.楼层跳转' transparent />
      <Heatmap right={76} bottom={84} id='帖子.删除回复' transparent />
      <Heatmap right={76} bottom={51} id='帖子.回复' transparent />
      <Heatmap right={119} bottom={51} id='帖子.回复失败' transparent />
      <Heatmap right={76} bottom={18} id='帖子.显示评论框' transparent />
      <Heatmap id='帖子' screen='Topic' />
    </>
  )
}

export default ob(Extra, COMPONENT)
