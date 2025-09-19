/*
 * @Author: czy0729
 * @Date: 2024-03-25 11:07:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-20 04:33:22
 */
import React, { useState } from 'react'
import { Expand, Text } from '@components'
import { Likes } from '@_'
import { timelineStore, uiStore, userStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Comment() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const [lines, setLines] = useState(3)

  return useObserver(() => {
    const { comment } = $.collection
    if (!comment) return null

    const styles = memoStyles()
    const relatedId = timelineStore.relatedId(userStore.userInfo.username || $.userId, $.subjectId)

    const elContent = (
      <Text
        style={styles.comment}
        size={14}
        lineHeight={16}
        numberOfLines={lines}
        selectable
        onPress={() => setLines(undefined)}
      >
        {comment}
      </Text>
    )

    return (
      <>
        {comment.length >= 80 ? <Expand ratio={0.72}>{elContent}</Expand> : elContent}
        {!!relatedId && (
          <Likes
            topicId={$.subjectId}
            id={relatedId}
            likeType='40'
            formhash={userStore.formhash}
            onLongPress={uiStore.showLikesUsers}
          />
        )}
      </>
    )
  })
}

export default Comment
