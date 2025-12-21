/*
 * @Author: czy0729
 * @Date: 2020-10-22 19:41:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:16:46
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function RakuenItem({ topicId, userName, title, group, date, time, userId, children }) {
  const navigation = useNavigation()
  const styles = memoStyles()
  return (
    <Flex style={styles.container} align='start'>
      <Flex.Item>
        <Touchable
          style={styles.item}
          animate
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

export default ob(RakuenItem, COMPONENT)
