/*
 * @Author: czy0729
 * @Date: 2024-03-25 11:07:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-25 12:51:53
 */
import React from 'react'
import { Expand, Text } from '@components'
import { Likes } from '@_'
import { timelineStore, uiStore, userStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Comment(props, { $ }: Ctx) {
  const { comment } = $.collection
  if (!comment) return null

  const styles = memoStyles()
  const relatedId = timelineStore.relatedId(userStore.userInfo.username || $.userId, $.subjectId)
  const el = (
    <Text
      style={styles.comment}
      size={comment.length >= 80 ? 12 : comment.length >= 40 ? 13 : 14}
      lineHeight={15}
    >
      {comment}
    </Text>
  )

  return (
    <>
      {comment.length >= 80 ? <Expand ratio={0.72}>{el}</Expand> : el}
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
}

export default obc(Comment, COMPONENT)
