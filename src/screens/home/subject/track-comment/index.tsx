/*
 * @Author: czy0729
 * @Date: 2023-02-03 15:44:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-03 17:04:16
 */
import React from 'react'
import { Divider } from '@components'
import { ItemComment } from '@_'
import { systemStore, collectionStore, usersStore } from '@stores'
import { getTimestamp, lastDate, titleCase } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatusCn } from '@types'

const POPOVER_DATA = {
  动画: ['取消动画特别关注'],
  书籍: ['取消书籍特别关注'],
  游戏: ['取消游戏特别关注'],
  音乐: ['取消音乐特别关注'],
  三次元: ['取消三次元评别关注']
} as const

function TrackComment(props, { $, navigation }: Ctx) {
  global.rerender('Subject.TrackComment')

  if (!$.subjectTypeValue) return null

  const userIds = systemStore.setting[`comment${titleCase($.subjectTypeValue)}`]
  if (!userIds?.length) return null

  const collection = collectionStore.usersSubjectCollection(userIds[0], $.subjectId)
  if (!collection._loaded || !collection.update_at || !collection.type) return null

  const userInfo = usersStore.usersInfo(userIds[0])
  const event = {
    id: '条目.跳转',
    data: {
      from: '特别关注',
      subjectId: $.subjectId
    }
  } as const

  return (
    <>
      <ItemComment
        navigation={navigation}
        event={event}
        time={lastDate(getTimestamp(collection.update_at))}
        avatar={userInfo.avatar}
        userId={userIds[0]}
        userName={userInfo.userName}
        star={$.hideScore ? undefined : collection.rate}
        status={MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(collection.type)}
        comment={collection.comment}
        popoverData={POPOVER_DATA[$.type]}
        onSelect={$.onCancelTrackUsersCollection}
      />
      <Divider />
    </>
  )
}

export default obc(TrackComment)
