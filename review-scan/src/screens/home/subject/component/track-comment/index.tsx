/*
 * @Author: czy0729
 * @Date: 2023-02-03 15:44:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:10:29
 */
import React from 'react'
import { Component, Divider } from '@components'
import { InView, ItemComment } from '@_'
import { _, collectionStore, systemStore, usersStore, useStore } from '@stores'
import { getTimestamp, lastDate, titleCase } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatusCn, UserId } from '@types'
import { Ctx } from '../../types'
import { COMPONENT, POPOVER_DATA } from './ds'

function TrackComment() {
  const { $, navigation } = useStore<Ctx>()
  if (!$.subjectTypeValue) return null

  const userIds = systemStore.setting[`comment${titleCase($.subjectTypeValue)}`] as UserId[]
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
    <Component id='screen-subject-track-comment' style={_.mt.sm}>
      <InView y={_.window.height * 1.5}>
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
              star={systemStore.setting.hideScore ? undefined : collection.rate}
              status={status}
              comment={String(collection.comment).replace(/[\r\n]/g, '')}
              popoverData={POPOVER_DATA[$.type]}
              like
              onSelect={$.onCancelTrackUsersCollection}
            />
          )
        })}
        <Divider />
      </InView>
    </Component>
  )
}

export default ob(TrackComment, COMPONENT)
