/*
 * @Author: czy0729
 * @Date: 2024-03-24 08:40:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-24 08:47:59
 */
import React from 'react'
import { uiStore, userStore } from '@stores'
import { ob } from '@utils/decorators'
import { Likes as LikesComp } from '../../../base'

function Likes({ relatedId, subjectId }) {
  if (!relatedId) return null

  return (
    <LikesComp
      topicId={subjectId}
      id={relatedId}
      likeType='40'
      formhash={userStore.formhash}
      onLongPress={uiStore.showLikesUsers}
    />
  )
}

export default ob(Likes)
