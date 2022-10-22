/*
 * @Author: czy0729
 * @Date: 2020-10-22 19:41:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-22 10:31:51
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Item(
  { topicId, avatar, userName, title, group, date, time, userId, children },
  { navigation }: Ctx
) {
  const styles = memoStyles()
  return (
    <Flex style={styles.container} align='start'>
      <Flex.Item>
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
