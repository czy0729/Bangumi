/*
 * @Author: czy0729
 * @Date: 2020-12-16 00:58:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 05:39:54
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { MesumeChat } from '@_'
import { useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Loaded } from '@types'
import type { Ctx } from '../../types'

function Extra() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { chatModalVisible, chatLoading, chat } = $.state
  const { index } = chat
  const chats = $.currentChatValues

  let value = ''
  let time: Loaded = false

  if (chats.length) {
    const isOutOfRange = index === -1 || index > chats.length - 1
    const target = chats[isOutOfRange ? 0 : index]
    value = target.text
    time = target._loaded
  }

  const handleRefresh = useCallback(() => $.doChat(true), [$])

  return (
    <>
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
      <Heatmap right={2} bottom={160} id='帖子.楼层跳转' transparent />
      <Heatmap right={76} bottom={84} id='帖子.删除回复' transparent />
      <Heatmap right={76} bottom={51} id='帖子.回复' transparent />
      <Heatmap right={119} bottom={51} id='帖子.回复失败' transparent />
      <Heatmap right={76} bottom={18} id='帖子.显示评论框' transparent />
      <Heatmap id='帖子' screen='Topic' />
    </>
  )
}

export default observer(Extra)
