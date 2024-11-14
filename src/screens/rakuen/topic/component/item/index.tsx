/*
 * @Author: czy0729
 * @Date: 2023-12-21 15:17:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-14 10:21:03
 */
import React from 'react'
import { ItemPost } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, PRE_RENDER_INDEX } from './ds'

function Item({ item, index, onShowFixedTextarea }) {
  const { $ } = useStore<Ctx>()

  // 延迟渲染, 减少二次进入页面瞬间楼层过多导致动画掉帧, 进入页面瞬间最多只渲染 2 个楼层
  if (!$.postId && !$.state.rendered && index > PRE_RENDER_INDEX - 1) return null

  const EVENT = {
    id: '帖子.跳转',
    data: {
      topicId: $.topicId
    }
  } as const

  return (
    <ItemPost
      inViewY={_.window.height * 0.8}
      index={index}
      postId={$.postId}
      authorId={$.topic.userId}
      {...item}
      matchLink
      event={EVENT}
      showFixedTextare={onShowFixedTextarea}
    />
  )
}

export default ob(Item, COMPONENT)
