/*
 * @Author: czy0729
 * @Date: 2020-05-04 20:01:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:39:18
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Katakana, Text } from '@components'
import { SectionTitle } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { findSubjectCn } from '@utils/app'

function Discuss(props, { $, navigation }) {
  const styles = memoStyles()
  const { discuss } = $.channel
  return (
    <View style={_.mt.lg}>
      <SectionTitle style={_.container.wind}>最新讨论</SectionTitle>
      <View style={_.mt.sm}>
        {discuss.map((item, index) => (
          <Touchable
            key={item.id}
            style={styles.item}
            onPress={() => {
              t('频道.跳转', {
                to: 'Topic',
                from: 'discuss',
                type: $.type,
                topicId: item.id
              })

              navigation.push('Topic', {
                topicId: item.id,
                _title: item.title,
                _replies: item.replies,
                _userName: item.userName,
                _userId: item.userId,
                _time: item.time
              })
            }}
          >
            <View
              style={[styles.wrap, index !== 0 && !_.flat && styles.border]}
            >
              <Flex style={styles.content}>
                <Flex.Item>
                  <Text size={15} bold>
                    {item.title}{' '}
                    <Text type='main' size={12} lineHeight={14}>
                      {item.replies}
                    </Text>
                  </Text>
                  <Katakana.Provider
                    style={_.mt.sm}
                    itemStyle={styles.katakanas}
                    size={12}
                  >
                    <Katakana type='sub' size={12}>
                      {findSubjectCn(item.subjectName)}
                    </Katakana>
                  </Katakana.Provider>
                </Flex.Item>
                <View style={_.ml.md}>
                  <Text size={12} align='right' bold>
                    {item.userName}
                  </Text>
                  <Text style={_.mt.xs} type='sub' size={12} align='right'>
                    {item.time}
                  </Text>
                </View>
              </Flex>
            </View>
          </Touchable>
        ))}
      </View>
    </View>
  )
}

export default obc(Discuss)

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingRight: _.wind - _._wind
  },
  content: {
    paddingVertical: _.md,
    paddingRight: _._wind
  },
  border: {
    borderTopWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  },
  katakanas: {
    marginTop: -4
  }
}))
