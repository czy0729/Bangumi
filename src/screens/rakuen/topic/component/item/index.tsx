/*
 * @Author: czy0729
 * @Date: 2023-12-21 15:17:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 07:34:50
 */
import React from 'react'
import { View } from 'react-native'
import { ItemPost } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, PRE_RENDER_INDEX } from './ds'
import { styles } from './styles'

function Item({ item, index, onShowFixedTextarea }) {
  const { $ } = useStore<Ctx>()

  if (!$.postId && !$.state.scrolled && index > PRE_RENDER_INDEX - 1) {
    return <View style={styles.item} />
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
      matchLink
      event={EVENT}
      showFixedTextare={onShowFixedTextarea}
    />
  )
}

export default ob(Item, COMPONENT)
