/*
 * @Author: czy0729
 * @Date: 2023-12-21 15:17:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 05:05:14
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { ItemPost } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT, PRE_RENDER_INDEX } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Item({ item, index, onShowFixedTextarea }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { topicId } = $
    const event = useMemo(
      () =>
        ({
          id: '帖子.跳转',
          data: { topicId }
        } as const),
      [topicId]
    )

    const shouldPlaceholder = !$.postId && !$.state.scrolled && index > PRE_RENDER_INDEX - 1
    if (shouldPlaceholder) return <View style={styles.item} />

    return (
      <ItemPost
        {...item}
        index={index}
        inViewY={_.window.height * 0.8}
        postId={$.postId}
        authorId={$.topic.userId}
        matchLink
        event={event}
        showFixedTextarea={onShowFixedTextarea}
      />
    )
  })
}

export default Item
