/*
 * @Author: czy0729
 * @Date: 2020-05-04 20:01:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:28:45
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Katakana, Text, Touchable } from '@components'
import { SectionTitle } from '@_'
import { _, useStore } from '@stores'
import { findSubjectCn } from '@utils'
import { t } from '@utils/fetch'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Discuss() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { discuss = [] } = $.channel

  return (
    <View style={_.mt.lg}>
      <SectionTitle style={_.container.wind}>最新帖子</SectionTitle>

      <View style={_.mt.md}>
        {discuss.map(item => {
          return (
            <Touchable
              key={item.id}
              style={styles.item}
              animate
              onPress={() => {
                navigation.push('Topic', {
                  topicId: item.id,
                  _title: item.title,
                  _replies: item.replies,
                  _userName: item.userName,
                  _userId: item.userId,
                  _time: item.time
                })

                t('频道.跳转', {
                  to: 'Topic',
                  from: 'discuss',
                  type: $.type,
                  topicId: item.id
                })
              }}
            >
              <View style={styles.wrap}>
                <Flex style={styles.content} align='start'>
                  <Flex.Item>
                    <Text bold>
                      {item.title}{' '}
                      {item.replies !== '+0' && (
                        <Text type='main' size={12} lineHeight={14} bold>
                          {item.replies}
                        </Text>
                      )}
                    </Text>

                    <Katakana.Provider style={_.mt.sm} itemStyle={styles.katakanas} size={12}>
                      <Katakana type='sub' size={12}>
                        {findSubjectCn(item.subjectName)}
                      </Katakana>
                    </Katakana.Provider>
                  </Flex.Item>

                  <View style={styles.side}>
                    <Text size={12} lineHeight={14} align='right' bold>
                      {item.userName}
                    </Text>
                    <Text style={_.mt.sm} type='sub' size={12} align='right'>
                      {item.time}
                    </Text>
                  </View>
                </Flex>
              </View>
            </Touchable>
          )
        })}
      </View>
    </View>
  )
}

export default observer(Discuss)
