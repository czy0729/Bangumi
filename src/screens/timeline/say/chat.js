/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-21 03:47:36
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { ItemSay } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { API_AVATAR } from '@constants'

const event = {
  id: '吐槽.跳转'
}

function Chat(props, { $ }) {
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
            event={event}
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

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  }
}))
