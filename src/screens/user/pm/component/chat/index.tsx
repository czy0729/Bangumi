/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-05 06:06:21
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { ItemSay } from '@_'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Chat() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { list } = $.pmDetail

    return (
      <View style={styles.container}>
        <Text size={12} type='sub' align='center'>
          {!!list.length && list[0].date}
        </Text>

        {list.map((item, index) => {
          // 1. 如果是新版合并后的“主题标签”，渲染居中的分割线
          if (item.type === 'label') {
            return (
              <View key={`label-${index}`} style={{ marginVertical: 12, alignItems: 'center' }}>
                <Text
                  size={12}
                  type='sub'
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 4
                  }}
                >
                  {item.content}
                </Text>
              </View>
            )
          }

          // 2. 如果是消息主体，计算上一个真正的“消息”是谁发的，用于控制是否隐藏名字
          let prevMessageItem: any = {}
          for (let i = index - 1; i >= 0; i--) {
            if (list[i].type !== 'label') {
              prevMessageItem = list[i]
              break
            }
          }

          const isMe = item.userId === $.myId

          return (
            <ItemSay
              key={index}
              event={EVENT}
              position={isMe ? 'right' : 'left'}
              avatar={item.avatar}
              showName={prevMessageItem.name !== item.name}
              name={item.name}
              text={item.content}
              id={item.userId}
              time={item.time}
            />
          )
        })}
      </View>
    )
  })
}

export default Chat
