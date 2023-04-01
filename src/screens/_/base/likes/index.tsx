/*
 * @Author: czy0729
 * @Date: 2023-03-31 05:22:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-01 09:34:37
 */
import React from 'react'
import { toJS } from 'mobx'
import { ScrollView, Touchable, Flex, Iconfont } from '@components'
import { useObserver, useBoolean } from '@utils/hooks'
import { rakuenStore, uiStore } from '@stores'
import Flip from './flip'
import Btn from './btn'
import { LIMIT, HIT_SLOP } from './ds'
import { memoStyles } from './styles'

export const Likes = ({ show = false, topicId, id, formhash }) => {
  const { state, setTrue } = useBoolean(show)

  return useObserver(() => {
    if (!topicId || !id) return null

    const showCreateBtn = !!formhash && show
    const likesList = rakuenStore.likesList(topicId, id) || []

    // 避免不可预料的结构错误
    if (!Array.isArray(toJS(likesList))) return null

    if (!showCreateBtn && !likesList.length) return null

    const styles = memoStyles()
    return (
      <ScrollView contentContainerStyle={styles.container} horizontal>
        {showCreateBtn && (
          <Touchable
            animate
            hitSlop={HIT_SLOP}
            onPress={() => {
              if (uiStore.likesGrid.visible) {
                uiStore.closeLikesGrid()
                return
              }

              uiStore.showLikesGrid(topicId, id, formhash)
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
