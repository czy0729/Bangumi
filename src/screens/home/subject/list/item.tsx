/*
 * @Author: czy0729
 * @Date: 2022-07-08 07:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-08 07:41:44
 */
import React from 'react'
import { ItemComment } from '@_'
import { obc } from '@utils/decorators'

function Item({ time, avatar, userId, userName, star, comment }, { $, navigation }) {
  const { rendered } = $.state
  if (!rendered) return null

  return (
    <ItemComment
      navigation={navigation}
      event={{
        id: '条目.跳转',
        data: {
          from: '吐槽',
          subjectId: $.subjectId
        }
      }}
      time={time}
      avatar={avatar}
      userId={userId}
      userName={userName}
      star={$.hideScore ? undefined : star}
      comment={comment}
    />
  )
}

export default obc(Item)
