/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 23:15:37
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { ItemSay } from '@_'
import { useStore } from '@stores'
import { PmDetailItem } from '@stores/user/types'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

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
          const prevItem = (index === 0 ? {} : list[index - 1]) as PmDetailItem
          const isMe = item.userId === $.myId
          return (
            <ItemSay
              event={EVENT}
              position={isMe ? 'right' : 'left'}
              avatar={item.avatar}
              showName={prevItem.name !== item.name}
              name={item.name}
              text={item.content}
              id={item.userId}
              time={item.time}
              format={false}
            />
          )
        })}
      </View>
    )
  })
}

export default Chat
