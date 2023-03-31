/*
 * @Author: czy0729
 * @Date: 2023-03-31 05:22:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-31 08:13:06
 */
import React from 'react'
import { ScrollView, Touchable, Flex, BgmText, Text, Iconfont } from '@components'
import { useObserver, useBoolean } from '@utils/hooks'
import { _, rakuenStore } from '@stores'
import { memoStyles } from './styles'

const LIMIT = 3

const HIT_SLOP = {
  top: 8,
  right: 8,
  bottom: 8,
  left: 8
}

function Likes({ topicId, id, formhash }) {
  const { state, setTrue } = useBoolean(false)

  return useObserver(() => {
    if (!topicId || !id) return null

    const likesList = rakuenStore.likesList(topicId, id)
    if (!likesList) return null

    const styles = memoStyles()
    return (
      <ScrollView style={styles.container} horizontal>
        {likesList
          .filter((item, index) => (state ? true : index < LIMIT))
          .map(item => (
            <Touchable
              key={item.emoji}
              animate
              hitSlop={HIT_SLOP}
              onPress={() => {
                if (!formhash) return
                rakuenStore.doLike(item, id, formhash, topicId)
              }}
            >
              <Flex style={styles.item} justify='center'>
                <BgmText size={12} index={Number(item.emoji)} />
                <Text style={_.ml.sm} size={12} type='sub' bold>
                  {item.total}
                </Text>
              </Flex>
            </Touchable>
          ))}
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

export default Likes
