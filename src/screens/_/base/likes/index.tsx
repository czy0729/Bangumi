/*
 * @Author: czy0729
 * @Date: 2023-03-31 05:22:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-30 21:41:43
 */
import React from 'react'
import { toJS } from 'mobx'
import { ScrollView, Touchable, Flex, Iconfont } from '@components'
import { rakuenStore, timelineStore, uiStore } from '@stores'
import { useObserver, useBoolean } from '@utils/hooks'
import { LIKE_TYPE_TIMELINE } from '@constants'
import Flip from './flip'
import Btn from './btn'
import { LIMIT, HIT_SLOP } from './ds'
import { memoStyles } from './styles'
import { Props as LikesProps } from './types'

export { LikesProps }

export const Likes = ({
  style,
  show = false,
  topicId,
  id,
  formhash,
  likeType,
  offsets,
  storybook,
  onLongPress
}: LikesProps) => {
  const { state, setTrue } = useBoolean(show)

  return useObserver(() => {
    const isTimeline = likeType == LIKE_TYPE_TIMELINE
    if (!topicId || !id || (!isTimeline && !rakuenStore.setting.likes)) return null

    const likesList: any[] =
      storybook?.likesList ||
      (isTimeline ? timelineStore.likesList(id) : rakuenStore.likesList(topicId, id)) ||
      []

    // 避免不可预料的结构错误
    if (!Array.isArray(toJS(likesList))) return null

    const showCreateBtn = !!formhash && show
    if (!showCreateBtn && !likesList.length) return null

    const styles = memoStyles()
    return (
      <ScrollView style={style} contentContainerStyle={styles.container} horizontal>
        {showCreateBtn && (
          <Touchable
            animate
            hitSlop={HIT_SLOP}
            onPress={() => {
              if (uiStore.likesGrid.visible) {
                uiStore.closeLikesGrid()
                return
              }

              uiStore.showLikesGrid(topicId, id, formhash, likeType, offsets)
            }}
          >
            <Flex style={styles.item} justify='center'>
              <Iconfont name='md-favorite-outline' size={18} />
            </Flex>
          </Touchable>
        )}
        {likesList
          .filter((item, index) =>
            item.selected ? true : state ? true : index < LIMIT
          )
          .map(item => {
            const passProps = {
              topicId,
              id,
              formhash,
              selected: false,
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
    )
  })
}
