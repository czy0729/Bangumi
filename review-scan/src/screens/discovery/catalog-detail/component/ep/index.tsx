/*
 * @Author: czy0729
 * @Date: 2025-01-08 05:50:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-08 07:46:10
 */
import React from 'react'
import { Cover, Flex, Text, Touchable } from '@components'
import { InView } from '@_'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Ep({ index, item }: Props) {
  const navigation = useNavigation()
  const styles = memoStyles()
  const { comment } = item
  return (
    <Flex style={styles.container} align='start'>
      <InView style={styles.inView} y={280 + 134 * (index + 1)}>
        <Cover
          src={item.image}
          size={styles.inView.minWidth}
          radius
          onPress={() => {
            appNavigate(item.subId, navigation)

            t('目录详情.跳转', {
              from: 'ep',
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
              from: 'ep',
              id: item.id
            })
          }}
        >
          <Text size={15} bold>
            {item.title}
          </Text>
        </Touchable>
        <Text style={_.mt.xs} type='sub' size={12} lineHeight={14}>
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

export default ob(Ep, COMPONENT)
