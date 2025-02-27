/*
 * @Author: czy0729
 * @Date: 2023-03-31 05:22:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 18:18:49
 */
import React from 'react'
import { toJS } from 'mobx'
import { Component, Flex, Iconfont, ScrollView, Touchable } from '@components'
import { rakuenStore, timelineStore, uiStore } from '@stores'
import { feedback } from '@utils'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { IOS, LIKE_TYPE_TIMELINE } from '@constants'
import Btn from './btn'
import Flip from './flip'
import { COMPONENT, HIT_SLOP, LIMIT } from './ds'
import { memoStyles } from './styles'
import { Props as LikesProps } from './types'

export { LikesProps }

/** 贴贴显示列表 */
export const Likes = ({
  style,
  show = false,
  topicId,
  id,
  formhash,
  likeType,
  offsets,
  storybook,
  onPress,
  onLongPress
}: LikesProps) => {
  r(COMPONENT)

  const { state, setTrue } = useBoolean(show)

  return useObserver(() => {
    if (!rakuenStore.setting.likes) return null

    const isTimeline = likeType == LIKE_TYPE_TIMELINE
    if (isTimeline && !id) return null

    const likesList: any[] =
      storybook?.likesList ||
      (isTimeline ? timelineStore.likesList(id) : rakuenStore.likesList(topicId, id)) ||
      []

    // 避免不可预料的结构错误
    if (!Array.isArray(toJS(likesList))) return null

    const showCreateBtn = show // !!formhash && show
    if (!showCreateBtn && !likesList.length) return null

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
          {likesList
            .filter((item, index) => (item.selected ? true : state ? true : index < LIMIT))
            .map(item => {
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
          {likesList.length >= LIMIT + 1 && !state && (
            <Touchable animate hitSlop={HIT_SLOP} onPress={setTrue}>
              <Flex style={styles.item} justify='center'>
                <Iconfont name='md-navigate-next' size={18} />
              </Flex>
            </Touchable>
          )}
        </ScrollView>
      </Component>
    )
  })
}

export default Likes
