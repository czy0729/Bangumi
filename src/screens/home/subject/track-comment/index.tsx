/*
 * @Author: czy0729
 * @Date: 2023-02-03 15:44:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-03 19:28:04
 */
import React from 'react'
import { View } from 'react-native'
import { Divider } from '@components'
import { ItemComment } from '@_'
import { _, systemStore, collectionStore, usersStore } from '@stores'
import { getTimestamp, lastDate, titleCase } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatusCn, UserId } from '@types'
import { Ctx } from '../types'

const POPOVER_DATA = {
  动画: ['取消动画特别关注'],
  书籍: ['取消书籍特别关注'],
  游戏: ['取消游戏特别关注'],
  音乐: ['取消音乐特别关注'],
  三次元: ['取消三次元评别关注']
} as const

function TrackComment(props, { $, navigation }: Ctx) {
  // global.rerender('Subject.TrackComment')

  if (!$.subjectTypeValue) return null

  const userIds = systemStore.setting[
    `comment${titleCase($.subjectTypeValue)}`
  ] as UserId[]
  if (!userIds?.length) return null

  const items = userIds.filter(item => {
    const collection = collectionStore.usersSubjectCollection(item, $.subjectId)
    return !!(collection._loaded && collection.update_at && collection.type)
  })
  if (!items.length) return null

  const event = {
    id: '条目.跳转',
    data: {
      from: '特别关注',
      subjectId: $.subjectId
    }
  } as const
  return (
    <View style={_.mt.sm}>
      {items.map(item => {
        const collection = collectionStore.usersSubjectCollection(item, $.subjectId)
        const userInfo = usersStore.usersInfo(item)
        const status = String(
          MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(collection.type) || ''
        ).replace('看', $.action) as CollectionStatusCn
        return (
          <ItemComment
            key={item}
            navigation={navigation}
            event={event}
            time={lastDate(getTimestamp(collection.update_at))}
            avatar={userInfo.avatar}
            userId={item}
            userName={userInfo.userName}
            star={$.hideScore ? undefined : collection.rate}
            status={status}
            comment={String(collection.comment).replace(/[\r\n]/g, '')}
            popoverData={POPOVER_DATA[$.type]}
            onSelect={$.onCancelTrackUsersCollection}
          />
        )
      })}
      <Divider />
    </View>
  )
}

export default obc(TrackComment)
