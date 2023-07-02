/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 10:58:05
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { ItemSay } from '@_'
import { PmItem } from '@stores/user/types'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: '短信.跳转'
} as const

function Chat(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { list } = $.pmDetail
  return (
    <View style={styles.container}>
      <Text size={12} type='sub' align='center'>
        {!!list.length && list[0].date}
      </Text>
      {list.map((item, index) => {
        const prevItem = (index === 0 ? {} : list[index - 1]) as PmItem
        const isMe = item.userId === $.myId
        return (
          <ItemSay
            event={EVENT}
            index={index}
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
}

export default obc(Chat)
