/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-09 14:01:57
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { ItemSay } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const event = {
  id: '短信.跳转'
}

function Chat(props, { $ }) {
  const styles = memoStyles()
  const { list } = $.pmDetail
  return (
    <View style={styles.container}>
      <Text size={12} type='sub' align='center'>
        {!!list.length && list[0].date}
      </Text>
      {list.map((item, index) => {
        const prevItem = index === 0 ? {} : list[index - 1]
        const isMe = item.userId === $.myId
        return (
          <ItemSay
            event={event}
            index={index}
            position={isMe ? 'right' : 'left'}
            avatar={item.avatar}
            showName={prevItem.name !== item.name}
            name={item.name}
            text={item.content}
            id={item.userId}
            format={false}
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
