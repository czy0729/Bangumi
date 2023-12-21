/*
 * @Author: czy0729
 * @Date: 2023-12-21 15:17:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-21 23:29:10
 */
import React from 'react'
import { Loading } from '@components'
import { ItemPost } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const PRE_RENDER_INDEX = 8

function Item({ item, index, rendered, onShowFixedTextarea }, { $ }: Ctx) {
  // 延迟渲染, 减少二次进入页面瞬间楼层过多导致动画掉帧, 进入页面瞬间最多只渲染2个楼层
  if (!$.postId) {
    if (!rendered) {
      // 渲染指示标记
      if (index === PRE_RENDER_INDEX) return <Loading style={_.mt.md} />
      if (index > PRE_RENDER_INDEX - 1) return null
    }
  }

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
      rendered={rendered}
      event={EVENT}
      showFixedTextare={onShowFixedTextarea}
    />
  )
}

export default obc(Item)
