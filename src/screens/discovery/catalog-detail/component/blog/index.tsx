/*
 * @Author: czy0729
 * @Date: 2025-01-08 05:50:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 06:41:20
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { Avatar, InView } from '@_'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Blog({ index, item }: Props) {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()
  const { comment } = item

  return (
    <Flex style={styles.container} align='start'>
      <InView style={styles.inView} y={280 + 40 * (index + 1)}>
        <Avatar
          src={item.image}
          size={styles.inView.minWidth}
          radius={_.radiusXs}
          onPress={() => {
            appNavigate(item.subId, navigation)

            t('目录详情.跳转', {
              from: 'blog',
              id: item.subId
            })
          }}
        />
      </InView>
      <Flex.Item style={styles.content}>
        <Touchable
          onPress={() => {
            appNavigate(item.id, navigation)

            t('目录详情.跳转', {
              from: 'blog',
              id: item.id
            })
          }}
        >
          <Text size={13} bold>
            {item.title}
          </Text>
        </Touchable>
        <Text style={_.mt.xs} type='sub' size={11} lineHeight={13}>
          {item.info}
        </Text>
        {!!comment && (
          <Text
            style={styles.comments}
            size={comment.length >= 80 ? 12 : comment.length >= 40 ? 13 : 14}
            lineHeight={16}
          >
            {comment}
          </Text>
        )}
      </Flex.Item>
    </Flex>
  )
}

export default observer(Blog)
