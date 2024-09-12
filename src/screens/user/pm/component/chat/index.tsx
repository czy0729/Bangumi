/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 01:16:49
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { ItemSay } from '@_'
import { PmItem } from '@stores/user/types'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

function Chat(_props, { $ }: Ctx) {
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

export default obc(Chat, COMPONENT)
