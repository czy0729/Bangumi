/*
 * @Author: czy0729
 * @Date: 2023-04-01 05:34:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-04 12:28:00
 */
import React from 'react'
import { Bgm, BgmText, Flex, Text, Touchable } from '@components'
import { rakuenStore, timelineStore, uiStore } from '@stores'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { HIT_SLOP } from '../ds'
import { getLikesGridEmoji } from '../../likes-grid/utils'
import { memoStyles } from './styles'

function Btn({ topicId, id, formhash, onPress, onLongPress, ...item }) {
  return useObserver(() => {
    const styles = memoStyles()
    const {
      // emoji: emojiRaw,
      type: typeRaw,
      users = [],
      value,
      selected,
      total
    } = item
    const emoji = getLikesGridEmoji(value)
    const type = Number(typeRaw)

    const handlePress = () => {
      if (typeof onPress === 'function') {
        onPress(users, emoji)
        return
      }
      if (!formhash) return

      uiStore.preFlipLikes(topicId, id)

      setTimeout(() => {
        const afterFlip = () => setTimeout(() => uiStore.afterFlip(), 800)

        if (type === 40) {
          timelineStore.doLike(item as any, id, formhash, () => {
            t('时间胶囊.贴贴', {
              mainId: topicId,
              relatedId: id,
              value,
              from: 'grid'
            })
            afterFlip()
          })
          return
        }

        rakuenStore.doLike(item as any, id, formhash, topicId, () => {
          t('帖子.贴贴', {
            id,
            topicId,
            value,
            from: 'likes'
          })
          afterFlip()
        })
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
            <BgmText
              style={styles.bgm}
              size={15}
              lineHeight={17}
              index={emoji}
              selectable={false}
            />
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
  })
}

export default Btn
