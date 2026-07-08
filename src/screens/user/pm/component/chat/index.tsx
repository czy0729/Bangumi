/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-07 18:58:55
 */
import React from 'react'
import { View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { ItemSay } from '@_'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import ThreadLabel from '../thread-label'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

const ENTERING_EXITING_ANIMATIONS_NUM = 8

function Chat() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const { list = [] } = $.pmList || {}
  const { thread, highlightedThreadId, highlightTick } = $.state
  const styles = memoStyles()

  /** 阈值索引，仅对列表末尾 N 条消息播放入场动画 */
  const animateNum = list.length - ENTERING_EXITING_ANIMATIONS_NUM
  const wrap = (el: React.ReactElement, key: string, animate: boolean) =>
    animate ? (
      <Animated.View key={key} entering={FadeInDown.duration(560)}>
        {el}
      </Animated.View>
    ) : (
      <View key={key}>{el}</View>
    )

  return (
    <View style={styles.container}>
      <Text size={12} type='sub' align='center'>
        {!!list.length && list[0]?.date}
      </Text>

      {list.map((item, index) => {
        if (item.type === 'label') {
          const isHighlighted = highlightedThreadId === item.threadId

          if (item.threadId && item.threadId !== thread) {
            return (
              <ThreadLabel
                key={index}
                item={item}
                isHighlighted={isHighlighted}
                highlightTick={highlightTick}
                onPress={() => $.onThreadChange(item.threadId!)}
                onLayout={(e: any) => $.onLabelLayout(item.threadId!, e.nativeEvent.layout.y)}
              />
            )
          }

          return (
            <ThreadLabel
              key={index}
              item={item}
              isHighlighted={isHighlighted}
              highlightTick={highlightTick}
            />
          )
        }

        let prevMessageItem: any = {}
        for (let i = index - 1; i >= 0; i--) {
          if (list[i].type !== 'label') {
            prevMessageItem = list[i]
            break
          }
        }

        const isMe = item.userId === $.myId

        return wrap(
          <ItemSay
            event={EVENT}
            position={isMe ? 'right' : 'left'}
            avatar={item.avatar}
            showName={!!index || prevMessageItem.name !== item.name}
            name={item.name === '我' ? '' : item.name}
            text={item.content}
            id={item.userId}
            time={item.time.slice(2)}
          />,
          String(index),
          index >= animateNum
        )
      })}
    </View>
  )
}

export default observer(Chat)
