/*
 * @Author: czy0729
 * @Date: 2023-03-31 05:22:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 08:59:45
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Flex, Iconfont, ScrollView, Touchable } from '@components'
import { rakuenStore, timelineStore, uiStore } from '@stores'
import { feedback } from '@utils'
import { logger, r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { IOS, LIKE_TYPE_SAY, LIKE_TYPE_TIMELINE } from '@constants'
import Btn from './btn'
import Flip from './flip'
import { COMPONENT, HIT_SLOP, LIMIT } from './ds'
import { memoStyles } from './styles'

import type { Props as LikesProps, LikesItem } from './types'
export type { LikesProps }

/** 贴贴显示列表 */
export const Likes = observer(
  ({
    style,
    show = false,
    showCreate = false,
    topicId,
    id,
    formhash,
    likeType,
    offsets,
    limit = LIMIT,
    storybook,
    onPress,
    onLongPress
  }: LikesProps) => {
    r(COMPONENT)

    const { state, setTrue } = useBoolean(show)

    if (!rakuenStore.setting.likes) return null

    const isTimeline = likeType == LIKE_TYPE_TIMELINE || likeType == LIKE_TYPE_SAY
    if (isTimeline && !id) return null

    const likesList: LikesItem[] =
      storybook?.likesList ||
      (isTimeline ? timelineStore.likesList(id) : rakuenStore.likesList(topicId, id)) ||
      []

    const showCreateBtn = show || showCreate
    if (!showCreateBtn && !likesList.length) return null

    let visibleLikesList: LikesItem[] = []
    let hasHiddenLikes = false
    try {
      visibleLikesList = likesList.filter((item, index) => item.selected || state || index < limit)
      hasHiddenLikes = !state && likesList.some((item, index) => !item.selected && index >= limit)
    } catch (e) {
      logger.warn(COMPONENT, 'filter likesList error:', e)
      return null
    }

    const styles = memoStyles()

    return (
      <Component id='base-likes'>
        <ScrollView style={style} contentContainerStyle={styles.container} horizontal>
          {showCreateBtn && (
            <Touchable
              animate
              hitSlop={HIT_SLOP}
              onPress={({ pageX, pageY }) => {
                if (uiStore.likesGrid.visible) {
                  uiStore.closeLikesGrid()
                  return
                }

                uiStore.setXY(pageX, pageY - (IOS ? 0 : 24))
                uiStore.showLikesGrid(topicId, id, formhash, likeType, offsets)
                feedback(true)
              }}
            >
              <Flex style={styles.item} justify='center'>
                <Iconfont name='md-favorite-outline' size={18} />
              </Flex>
            </Touchable>
          )}
          {visibleLikesList.map(item => {
            const passProps = {
              topicId,
              id,
              formhash,
              selected: false,
              onPress,
              onLongPress,
              ...item
            }
            return (
              <Flip key={item.emoji} height={28} {...passProps}>
                <Btn {...passProps} />
              </Flip>
            )
          })}
          {hasHiddenLikes && (
            <Touchable animate hitSlop={HIT_SLOP} onPress={setTrue}>
              <Flex style={styles.item} justify='center'>
                <Iconfont name='md-navigate-next' size={18} />
              </Flex>
            </Touchable>
          )}
        </ScrollView>
      </Component>
    )
  }
)

export default Likes
