/*
 * @Author: czy0729
 * @Date: 2020-10-22 19:41:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:01:36
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function Item(
  {
    index,
    topicId,
    avatar,
    userName,
    title,
    group,
    date,
    time,
    userId,
    children
  },
  { navigation }
) {
  const styles = memoStyles()
  return (
    <Flex style={styles.container} align='start'>
      <Flex.Item style={index !== 0 && !_.flat && styles.border}>
        <Touchable
          style={styles.item}
          onPress={() => {
            t('空间.跳转', {
              to: 'Topic',
              from: '超展开',
              topicId
            })

            navigation.push('Topic', {
              topicId,
              _title: title,
              _group: group,
              _time: `${date} ${time}`,
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
                {time} / {group}
              </Text>
            </Flex.Item>
          </Flex>
        </Touchable>
      </Flex.Item>
      {children}
    </Flex>
  )
}

export default obc(Item)

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
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
