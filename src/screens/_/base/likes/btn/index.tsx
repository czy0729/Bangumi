/*
 * @Author: czy0729
 * @Date: 2023-04-01 05:34:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 05:23:44
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Bgm, BgmText, Flex, Text, Touchable } from '@components'
import { rakuenStore, timelineStore, uiStore, userStore } from '@stores'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import { HIT_SLOP } from '../ds'
import { getLikesGridEmoji } from '../../likes-grid/utils'
import { isTimelineLike } from '../utils'
import { memoStyles } from './styles'

import type { LikesPassProps } from '../types'

/** 贴贴按钮 */
function Btn({ topicId, id, formhash, onPress, onLongPress, ...item }: LikesPassProps) {
  const styles = memoStyles()

  const { type: typeRaw, users = [], value, selected, total } = item
  const emoji = getLikesGridEmoji(value)
  const type = Number(typeRaw)

  const handlePress = () => {
    if (typeof onPress === 'function') {
      onPress(users, emoji)
      return
    }
    if (!formhash) return

    const params = {
      main_id: Number(item.main_id),
      type,
      value
    }

    uiStore.preFlipLikes(topicId, id)

    setTimeout(() => {
      const afterFlip = () => setTimeout(() => uiStore.afterFlip(), 800)

      if (isTimelineLike(type)) {
        timelineStore.doLike(
          params,
          id,
          formhash,
          () => {
            t('时间胶囊.贴贴', {
              mainId: topicId,
              relatedId: id,
              value,
              from: 'grid'
            })
            afterFlip()
          },
          userStore.userInfo
        )
        return
      }

      rakuenStore.doLike(
        params,
        id,
        formhash,
        topicId,
        () => {
          t('帖子.贴贴', {
            id,
            topicId,
            value,
            from: 'likes'
          })
          afterFlip()
        },
        userStore.userInfo
      )
    }, 40)
  }

  const handleLongPress =
    typeof onLongPress === 'function' ? () => onLongPress(users, emoji) : undefined

  return (
    <Touchable animate hitSlop={HIT_SLOP} onPress={handlePress} onLongPress={handleLongPress}>
      <Flex style={stl(styles.item, selected && styles.itemActive)} justify='center'>
        {WEB ? (
          <Bgm style={styles.image} index={emoji} size={16} textOnly={false} />
        ) : (
          <BgmText style={styles.bgm} size={15} lineHeight={17} index={emoji} selectable={false} />
        )}
        <Text
          style={styles.text}
          size={12}
          type={selected ? 'main' : 'sub'}
          bold
          selectable={false}
        >
          {total}
        </Text>
      </Flex>
    </Touchable>
  )
}

export default observer(Btn)
