/*
 * @Author: czy0729
 * @Date: 2023-07-06 13:17:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 03:01:35
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, rakuenStore } from '@stores'
import { stl } from '@utils'
import { Avatar } from '../../../avatar'
import { flexItemStyle, flexStyle } from '../../../flex'
import { Text } from '../../../text'
import { Touchable } from '../../../touchable'
import { memoStyles } from './styles'

import type { Props } from './types'

function Topic({ topicId, text, onLinkPress }: Props) {
  const styles = memoStyles()
  const { group, avatar, time } = rakuenStore.topic(topicId) || {}

  // comments 可能未读回, list 兜底避免整块崩溃
  const list = rakuenStore.comments(topicId)?.list
  let reply = 0
  if (Array.isArray(list)) {
    list.forEach(item => {
      reply += 1
      if (item?.sub?.length) reply += item.sub.length
    })
  }

  return (
    <View style={styles.wrap}>
      <Touchable animate style={stl(flexStyle(), styles.body)} onPress={onLinkPress}>
        <Avatar src={avatar} size={48} radius={_.radiusSm} />
        <View style={stl(flexItemStyle(), _.ml.sm)}>
          <Text style={styles.top} size={11} bold numberOfLines={2}>
            {text}{' '}
            {!!time && (
              <Text size={9} lineHeight={11} type='sub' bold>
                {String(time).split(' ')?.[0]}
              </Text>
            )}
          </Text>
          <View style={_.mt.xs}>
            <Text
              style={styles.bottom}
              type='sub'
              size={9}
              lineHeight={10}
              bold
              numberOfLines={2}
            >
              {group}
              {reply ? ` · ${reply} 回复` : ''}
            </Text>
          </View>
        </View>
      </Touchable>
    </View>
  )
}

export default observer(Topic)
