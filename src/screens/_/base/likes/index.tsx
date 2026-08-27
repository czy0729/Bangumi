/*
 * @Author: czy0729
 * @Date: 2023-03-31 05:22:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 20:47:57
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Component, Flex, Iconfont, ScrollView, Touchable } from '@components'
import { rakuenStore, timelineStore, uiStore } from '@stores'
import { feedback } from '@utils'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { IOS } from '@constants'
import Btn from './btn'
import Flip from './flip'
import { getVisibleLikes, isTimelineLike } from './utils'
import { COMPONENT, HIT_SLOP, LIMIT } from './ds'
import { memoStyles } from './styles'

import type { TouchableHandlePress } from '@components'
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
    leftMaskStyle,
    rightMaskStyle,
    onPress,
    onLongPress
  }: LikesProps) => {
    r(COMPONENT)

    const { state, setTrue } = useBoolean(show)

    /** 是否时间线类贴贴 */
    const isTimeline = isTimelineLike(likeType)

    /** 贴贴列表 */
    let likesList: LikesItem[] = []
    if (storybook?.likesList) {
      likesList = storybook.likesList
    } else if (isTimeline && id) {
      likesList = timelineStore.likesList(id) || []
    } else {
      likesList = rakuenStore.likesList(topicId, id) || []
    }

    /** 可见贴贴列表与是否有被隐藏的项 */
    const { visible: visibleLikesList, hasHidden: hasHiddenLikes } = getVisibleLikes(
      likesList,
      state,
      limit
    )

    /** 打开 / 关闭贴贴选择面板 */
    const handleOpenGrid: TouchableHandlePress = useCallback(
      ({ pageX = 0, pageY = 0 } = {}) => {
        if (uiStore.likesGrid.visible) {
          uiStore.closeLikesGrid()
          return
        }

        uiStore.setXY(pageX, pageY - (IOS ? 0 : 24))
        uiStore.showLikesGrid(topicId, id, formhash, likeType, offsets)
        feedback(true)
      },
      [topicId, id, formhash, likeType, offsets]
    )

    if (!rakuenStore.setting.likes) return null
    if (isTimeline && !id) return null

    const showCreateBtn = show || showCreate
    if (!showCreateBtn && !likesList.length) return null

    const styles = memoStyles()

    return (
      <Component id='base-likes'>
        <ScrollView
          style={style}
          contentContainerStyle={styles.container}
          horizontal
          leftMaskStyle={leftMaskStyle}
          rightMaskStyle={rightMaskStyle}
        >
          {showCreateBtn && (
            <Touchable animate hitSlop={HIT_SLOP} onPress={handleOpenGrid}>
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
              <Flip key={item.value} height={28} {...passProps}>
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
