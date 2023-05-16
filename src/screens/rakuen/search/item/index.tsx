/*
 * @Author: czy0729
 * @Date: 2020-10-23 11:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-16 07:43:04
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Highlight, Text, Touchable, Flex, Heatmap } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { getTimestamp, lastDate } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const LENGTH = 240

function Item(
  { index, id, title, message, avatar, userId, userName, time, group },
  { $, navigation }: Ctx
) {
  const styles = memoStyles()
  const { value } = $.state
  const offset = message.indexOf(value)
  const content =
    offset < LENGTH ? message.slice(0, LENGTH) : message.slice(48, LENGTH + offset - 48)
  return (
    <View style={styles.item}>
      {!!index && <Divider />}
      <Touchable
        style={styles.touch}
        onPress={() => {
          t('帖子搜索.跳转', {
            to: 'Topic',
            topicId: `group/${id}`
          })

          navigation.push('Topic', {
            topicId: `group/${id}`
          })
        }}
      >
        <Flex align='start'>
          <Avatar src={avatar} userId={userId} />
          <Flex.Item style={_.ml.sm}>
            <Highlight size={16} bold value={value}>
              {title}
            </Highlight>
            <Text style={_.mt.xs} type='sub' size={12}>
              {lastDate(getTimestamp(time))} / {userName} / {group}
            </Text>
          </Flex.Item>
        </Flex>
      </Touchable>
      <Highlight lineHeight={16} value={value}>
        {content}
      </Highlight>
      {!index && <Heatmap id='帖子搜索.跳转' />}
    </View>
  )
}

export default obc(Item)
