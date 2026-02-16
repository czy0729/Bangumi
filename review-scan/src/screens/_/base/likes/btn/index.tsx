/*
 * @Author: czy0729
 * @Date: 2023-04-01 05:34:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:50:46
 */
import React from 'react'
import { Bgm, BgmText, Flex, Text, Touchable } from '@components'
import { rakuenStore, timelineStore, uiStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import { HIT_SLOP } from '../ds'
import { memoStyles } from './styles'

function Btn({ topicId, id, formhash, onPress, onLongPress, ...item }) {
  const styles = memoStyles()
  const emoji = Number(item.emoji)
  const type = Number(item.type)

  return (
    <Touchable
      animate
      hitSlop={HIT_SLOP}
      onPress={() => {
        if (typeof onPress === 'function') {
          onPress(item.users || [], emoji)
          return
        }

        if (!formhash) return

        uiStore.preFlipLikes(topicId, id)
        setTimeout(() => {
          if (type === 40) {
            timelineStore.doLike(item as any, id, formhash, () => {
              t('时间胶囊.贴贴', {
                mainId: topicId,
                relatedId: id,
                value: item.value,
                from: 'grid'
              })

              setTimeout(() => {
                uiStore.afterFlip()
              }, 800)
            })
            return
          }

          rakuenStore.doLike(item as any, id, formhash, topicId, () => {
            t('帖子.贴贴', {
              id,
              topicId,
              value: item.value,
              from: 'likes'
            })

            setTimeout(() => {
              uiStore.afterFlip()
            }, 800)
          })
        }, 40)
      }}
      onLongPress={
        typeof onLongPress === 'function'
          ? () => {
              const users = item.users || []
              onLongPress(users, emoji)
            }
          : undefined
      }
    >
      <Flex style={stl(styles.item, item.selected && styles.itemActive)} justify='center'>
        {WEB || emoji > 100 ? (
          <Bgm style={styles.image} index={emoji} size={16} textOnly={false} />
        ) : (
          <BgmText style={styles.bgm} size={15} lineHeight={17} index={emoji} selectable={false} />
        )}
        <Text
          style={styles.text}
          size={12}
          type={item.selected ? 'main' : 'sub'}
          bold
          selectable={false}
        >
          {item.total}
        </Text>
      </Flex>
    </Touchable>
  )
}

export default ob(Btn)
