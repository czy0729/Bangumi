/*
 * @Author: czy0729
 * @Date: 2020-10-22 19:41:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:16:46
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Touchable } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { UserTopicsFromCDNItem } from '@stores/rakuen/types'
function Item({ topicId, userName, title, group, date, time, userId }: UserTopicsFromCDNItem) {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <View style={styles.container}>
        <Touchable
          style={styles.item}
          animate
          onPress={() => {
            navigation.push('Topic', {
              topicId,
              _title: title,
              _group: group,
              _time: `${date} ${time}`,
              _userName: userName,
              _userId: userId
            })

            t('空间.跳转', {
              to: 'Topic',
              from: '超展开',
              topicId
            })
          }}
        >
          <Text size={15} bold>
            {title}
          </Text>
          <Text style={_.mt.sm} type='sub' size={12}>
            {time} / {group}
          </Text>
        </Touchable>
      </View>
    )
  })
}

export default Item
