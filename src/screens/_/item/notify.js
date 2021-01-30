/*
 * @Author: czy0729
 * @Date: 2019-08-08 09:59:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 14:37:25
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'
import { EVENT } from '@constants'
import Avatar from '../base/avatar'
import Name from '../base/name'

function ItemNotify({
  navigation,
  index,
  avatar,
  userId,
  userName,
  title,
  message,
  message2,
  href,
  event,
  children
}) {
  const styles = memoStyles()
  return (
    <Flex style={styles.container} align='start'>
      <Avatar
        style={styles.image}
        navigation={navigation}
        userId={userId}
        name={userName}
        src={avatar}
        event={event}
      />
      <Flex.Item
        style={[styles.item, !!index && !_.flat && styles.border, _.ml.sm]}
      >
        <Name userId={userId} showFriend size={13} type='title' bold>
          {userName}
        </Name>
        <Text style={_.mt.xs} lineHeight={1.8}>
          {message}
          <Text
            lineHeight={1.8}
            type='main'
            bold
            onPress={() =>
              appNavigate(
                href,
                navigation,
                {
                  _title: title
                },
                event
              )
            }
          >
            {title}
          </Text>
          {message2}
        </Text>
      </Flex.Item>
      {children}
    </Flex>
  )
}

ItemNotify.defaultProps = {
  event: EVENT
}

export default observer(ItemNotify)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  image: {
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
