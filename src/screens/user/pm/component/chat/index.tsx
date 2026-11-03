/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 06:39:21
 *
 * 聊天列表: 线程标签与消息项
 */
import { View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { ItemSay } from '@_'
import { useStore } from '@stores'
import ThreadLabel from '../thread-label'
import { getPrevMessage } from './utils'
import { COMPONENT, ENTERING_EXITING_ANIMATIONS_NUM, EVENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Chat() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const { list = [] } = $.pmList || {}
  const { thread, highlightedThreadId, highlightTick } = $.state

  /** 阈值索引，仅对列表末尾 N 条消息播放入场动画 */
  const animateNum = list.length - ENTERING_EXITING_ANIMATIONS_NUM

  return (
    <View style={styles.container}>
      <Text size={12} type='sub' align='center'>
        {!!list.length && list[0]?.date}
      </Text>

      {list.map((item, index) => {
        if (item.type === 'label') {
          const threadId = item.threadId
          const canJump = !!threadId && threadId !== thread

          return (
            <ThreadLabel
              key={index}
              item={item}
              isHighlighted={highlightedThreadId === threadId}
              highlightTick={highlightTick}
              onPress={canJump ? () => $.onThreadChange(threadId) : undefined}
              onLayout={
                canJump ? e => $.onLabelLayout(threadId, e.nativeEvent.layout.y) : undefined
              }
            />
          )
        }

        const element = (
          <ItemSay
            event={EVENT}
            position={item.userId === $.myId ? 'right' : 'left'}
            avatar={item.avatar}
            showName={!!index || getPrevMessage(list, index)?.name !== item.name}
            name={item.name === '我' ? '' : item.name}
            text={item.content}
            id={item.userId}
            time={item.time.slice(2)}
          />
        )

        return index >= animateNum ? (
          <Animated.View key={index} entering={FadeInDown.duration(560)}>
            {element}
          </Animated.View>
        ) : (
          <View key={index}>{element}</View>
        )
      })}
    </View>
  )
}

export default observer(Chat)
