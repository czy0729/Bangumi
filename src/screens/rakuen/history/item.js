/*
 * @Author: czy0729
 * @Date: 2019-11-28 17:16:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-26 17:34:14
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'

function Item(
  { index, topicId, avatar, userName, title, group, time = '', userId },
  { $, navigation }
) {
  const styles = memoStyles()
  return (
    <Flex style={styles.container} align='start'>
      <Avatar
        style={styles.image}
        navigation={navigation}
        src={avatar}
        userId={userId}
        name={userName}
      />
      <Flex.Item style={index !== 0 && !_.flat && styles.border}>
        <Touchable
          style={styles.item}
          onPress={() => {
            t('本地帖子.跳转', {
              to: 'Topic',
              topicId
            })

            navigation.push('Topic', {
              topicId,
              _noFetch: true,
              _title: title,
              _group: group,
              _time: time,
              _avatar: avatar,
              _userName: userName,
              _userId: userId
            })
          }}
        >
          <Flex align='start'>
            <Flex.Item>
              <Text size={16}>{title}</Text>
              <Text style={_.mt.sm} type='sub' size={12}>
                {time.split(' ')[1]} /
                <Text size={12} type='title' bold>
                  {' '}
                  {userName}{' '}
                </Text>
                / {group}
              </Text>
            </Flex.Item>
            {$.isFavor(topicId) && (
              <Iconfont
                style={[
                  styles.favor,
                  {
                    marginTop: 2
                  }
                ]}
                size={16}
                name='star-full'
                color={_.colorYellow}
              />
            )}
          </Flex>
        </Touchable>
      </Flex.Item>
    </Flex>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  image: {
    marginRight: _.xs,
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingLeft: _.sm,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
