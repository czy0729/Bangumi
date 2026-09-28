/*
 * @Author: czy0729
 * @Date: 2023-02-03 15:44:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 *
 * 追踪用户的吐槽列表
 */
import { Fragment } from 'react'
import { observer } from 'mobx-react'
import { Component, Divider } from '@components'
import { ClientTrack, InView, ItemComment } from '@_'
import { _, collectionStore, systemStore, timelineStore, usersStore, useStore } from '@stores'
import { confirm, getTimestamp, lastDate, titleCase } from '@utils'
import {
  MODEL_COLLECTION_STATUS,
  TEXT_MENU_CANCEL_TRACK_COLLECTIONS_TIMELINE,
  TEXT_MENU_MANAGE_TRACK,
  TEXT_MENU_TRACK_COLLECTIONS_TIMELINE
} from '@constants'
import { COMPONENT, POPOVER_DATA } from './ds'
import { styles } from './styles'

import type { CollectionStatusCn, UserId } from '@types'
import type { Ctx } from '../../types'

function TrackComment() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  if (!$.subjectTypeValue) return null

  // --- Data Logic ---
  const key = `comment${titleCase($.subjectTypeValue)}` as const
  const userIds = systemStore.setting[key] as UserId[]
  if (!userIds?.length) return null

  const items = userIds.filter(id => {
    const collection = collectionStore.usersSubjectCollection(id, $.subjectId)
    return !!(collection._loaded && collection.update_at && collection.type)
  })
  if (!items.length) return null

  const { collectionTimelines } = systemStore.setting
  const event = {
    id: '条目.跳转',
    data: {
      from: '追踪',
      subjectId: $.subjectId
    }
  } as const

  // --- Render ---
  return (
    <Component id='screen-subject-track-comment' style={_.mt.sm}>
      <InView y={Math.floor(_.window.height * 1.5)}>
        {items.map(userId => {
          const collection = collectionStore.usersSubjectCollection(userId, $.subjectId)
          const userInfo = usersStore.usersInfo(userId)

          const status = String(
            MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(collection.type) || ''
          ).replace('看', $.action) as CollectionStatusCn

          const popoverData: string[] = [...POPOVER_DATA[$.type]]
          if ($.subjectTypeValue === 'anime') {
            popoverData.push(
              collectionTimelines.includes(userId)
                ? TEXT_MENU_CANCEL_TRACK_COLLECTIONS_TIMELINE
                : TEXT_MENU_TRACK_COLLECTIONS_TIMELINE
            )
          }
          popoverData.push(TEXT_MENU_MANAGE_TRACK)

          return (
            <Fragment key={`${userId}|${userInfo.avatar}|${userInfo.userName}`}>
              <ItemComment
                style={styles.item}
                event={event}
                time={lastDate(getTimestamp(collection.update_at))}
                avatar={userInfo.avatar}
                userId={userId}
                userName={userInfo.userName}
                star={systemStore.setting.hideScore ? undefined : collection.rate}
                status={status}
                comment={String(collection.comment).replace(/[\r\n]/g, '')}
                popoverData={popoverData}
                like
                onSelect={(title, userData) => {
                  // 追踪TA的动画观看进度
                  if (title === TEXT_MENU_TRACK_COLLECTIONS_TIMELINE) {
                    systemStore.trackCollectionTimelines(userId)
                    timelineStore.fetchCollectionTimelines(userId, true)
                    return
                  }

                  // 取消追踪TA的动画观看进度
                  if (title === TEXT_MENU_CANCEL_TRACK_COLLECTIONS_TIMELINE) {
                    confirm('确定取消?', () => {
                      systemStore.cancelTrackCollectionTimelines(userId)
                    })
                    return
                  }

                  // 追踪管理
                  if (title === TEXT_MENU_MANAGE_TRACK) {
                    navigation.push('Setting', {
                      open: 'Track'
                    })
                    return
                  }

                  // 取消追踪特定用户条目类型吐槽
                  confirm('确定取消?', () => {
                    $.onCancelTrackUsersCollection(userData)
                  })
                }}
              />
              <ClientTrack
                id='trackComment'
                userId={userId}
                subjectId={$.subjectId}
                type={$.subjectTypeValue}
              />
            </Fragment>
          )
        })}
        <Divider />
      </InView>
    </Component>
  )
}

export default observer(TrackComment)
