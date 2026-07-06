/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-06 02:07:38
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { ItemSay } from '@_'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Chat() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { list } = $.pmDetail

  return (
    <View style={styles.container}>
      <Text size={12} type='sub' align='center'>
        {!!list.length && list[0].date}
      </Text>

      {list.map((item, index) => {
        if (item.type === 'label') {
          return (
            <Text
              key={`label-${index}`}
              style={styles.section}
              type='sub'
              size={12}
              bold
              align='center'
            >
              {item.content}
            </Text>
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
}

export default observer(Chat)
