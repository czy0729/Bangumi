/*
 * @Author: czy0729
 * @Date: 2024-03-25 11:07:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 20:46:59
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Comments, Likes } from '@_'
import { timelineStore, uiStore, userStore, useStore } from '@stores'
import { LIKE_TYPE_TIMELINE } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function Comment() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { comment } = $.collection
  if (!comment) return null

  const styles = memoStyles()
  const relatedId = timelineStore.relatedId(userStore.userInfo.username || $.userId, $.subjectId)

  return (
    <>
      <Comments style={styles.comments} value={comment} numberOfLines={4} />
      {!!relatedId && (
        <Likes
          topicId={$.subjectId}
          id={relatedId}
          likeType={LIKE_TYPE_TIMELINE}
          formhash={userStore.formhash}
          onLongPress={uiStore.showLikesUsers}
        />
      )}
    </>
  )
}

export default observer(Comment)
