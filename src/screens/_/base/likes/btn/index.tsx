/*
 * @Author: czy0729
 * @Date: 2023-04-01 05:34:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-30 05:17:03
 */
import React from 'react'
import { Touchable, Flex, BgmText, Text, Bgm } from '@components'
import { rakuenStore, timelineStore, uiStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS, STORYBOOK } from '@constants'
import { HIT_SLOP } from '../ds'
import { memoStyles } from './styles'

function Btn({ topicId, id, formhash, onLongPress, ...item }) {
  const styles = memoStyles()
  const emoji = Number(item.emoji)
  const type = Number(item.type)
  return (
    <Touchable
      animate
      hitSlop={HIT_SLOP}
      onPress={() => {
        if (!formhash) return

        uiStore.preFlipLikes(topicId, id)
        setTimeout(() => {
          if (type === 40) {
            timelineStore.doLike(item as any, id, formhash, () => {
              // t('时间胶囊.贴贴', {
              //   mainId: topicId,
              //   relatedId: floorId,
              //   value,
              //   from: 'grid'
              // })

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
      <Flex
        style={stl(styles.item, item.selected && styles.itemActive)}
        justify='center'
      >
        {STORYBOOK || emoji > 100 ? (
          <Bgm
            style={styles.image}
            index={emoji}
            size={IOS ? 18 : 16}
            textOnly={false}
          />
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
