/*
 * @Author: czy0729
 * @Date: 2023-04-01 05:34:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-01 09:22:05
 */
import React from 'react'
import { Touchable, Flex, BgmText, Text } from '@components'
import { rakuenStore, uiStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HIT_SLOP } from '../ds'
import { memoStyles } from './styles'

function Btn({ topicId, id, formhash, ...item }) {
  const styles = memoStyles()
  return (
    <Touchable
      animate
      hitSlop={HIT_SLOP}
      onPress={() => {
        if (!formhash) return

        uiStore.preFlipLikes(topicId, id)
        setTimeout(() => {
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
    >
      <Flex
        style={stl(styles.item, item.selected && styles.itemActive)}
        justify='center'
      >
        <BgmText size={14} index={Number(item.emoji)} selectable={false} />
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
