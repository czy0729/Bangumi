/*
 * @Author: czy0729
 * @Date: 2024-03-24 08:40:54
 * @Last Modified by: imagebuilder1837
 * @Last Modified time: 2026-05-22 11:18:30
 */
import React from 'react'
import { observer } from 'mobx-react'
import { uiStore, userStore } from '@stores'
import { LIKE_TYPE_TIMELINE } from '@constants'
import { Likes as LikesComp } from '../../../base'

function Likes({ relatedId, subjectId, showCreate }) {
  if (!relatedId) return null

  return (
    <LikesComp
      topicId={subjectId}
      id={relatedId}
      likeType={LIKE_TYPE_TIMELINE}
      showCreate={showCreate}
      formhash={userStore.formhash}
      onLongPress={uiStore.showLikesUsers}
    />
  )
}

export default observer(Likes)
