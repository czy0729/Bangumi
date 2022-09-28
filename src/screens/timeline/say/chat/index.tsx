/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 06:29:05
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { ItemSay } from '@_'
import { obc } from '@utils/decorators'
import { API_AVATAR } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: '吐槽.跳转'
} as const

function Chat(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { list } = $.say
  return (
    <View style={styles.container}>
      <Text size={12} type='sub' align='center'>
        {!!list.length && list[0].date}
      </Text>
      {list.map((item, index) => {
        const prevItem = index === 0 ? {} : list[index - 1]
        const isMe = item.id === $.myId
        return (
          <ItemSay
            {...item}
            event={EVENT}
            position={isMe ? 'right' : 'left'}
            avatar={API_AVATAR(item.id)}
            showName={prevItem.name !== item.name}
            onLongPress={() => $.at(item.id)}
          />
        )
      })}
    </View>
  )
}

export default obc(Chat)
