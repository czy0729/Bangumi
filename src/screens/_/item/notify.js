/*
 * @Author: czy0729
 * @Date: 2019-08-08 09:59:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-12 02:13:08
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'
import { EVENT } from '@constants'
import Avatar from '../base/avatar'

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
  event
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
      <Flex.Item style={[styles.item, !!index && styles.border, _.ml.sm]}>
        <Text size={13} type='sub'>
          {userName}
        </Text>
        <Text style={_.mt.xs} lineHeight={1.8} type='title'>
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
