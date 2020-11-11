/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-11 14:11:40
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Text } from '@components'
import { ItemSay } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

const event = {
  id: '吐槽.跳转'
}

function Chat(props, { $ }) {
  const { list } = $.say
  return (
    <View style={styles.container}>
      <Text size={12} type='sub' align='center'>
        {!!list.length && list[0].date}
      </Text>
      {list.map((item, index) => {
        const prevItem = index === 0 ? {} : list[index - 1]
        const isMe = item.id === $.myId
        const avatar = isMe ? $.userInfo.avatar : $.usersInfo(item.id).avatar
        return (
          <ItemSay
            {...item}
            event={event}
            position={isMe ? 'right' : 'left'}
            avatar={item.avatar || avatar?.medium}
            showName={prevItem.name !== item.name}
            onLongPress={() => $.at(item.id)}
          />
        )
      })}
    </View>
  )
}

Chat.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Chat)

const styles = StyleSheet.create({
  container: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  }
})
