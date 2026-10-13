/*
 * @Author: czy0729
 * @Date: 2020-05-04 20:01:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 最新帖子: 一条帖子一个卡片
 */
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

      {discuss.map(item => (
        <Touchable
          key={item.id}
          style={styles.card}
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
          <Flex align='start'>
            <Flex.Item>
              <Text bold>
                {item.title}{' '}
                {item.replies !== '+0' && (
                  <Text type='main' size={12} lineHeight={14} bold>
                    {item.replies}
                  </Text>
                )}
              </Text>

              <View style={_.mt.sm}>
                <Katakana.Provider firstLineStyle={_.mt.xs} type='sub' size={12}>
                  <Katakana type='sub' size={12}>
                    {findSubjectCn(item.subjectName)}
                  </Katakana>
                </Katakana.Provider>
              </View>
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
        </Touchable>
      ))}
    </View>
  )
}

export default observer(Discuss)
