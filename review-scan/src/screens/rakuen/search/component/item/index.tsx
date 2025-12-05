/*
 * @Author: czy0729
 * @Date: 2020-10-23 11:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-14 13:21:11
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Flex, Heatmap, Highlight, Text, Touchable } from '@components'
import { Avatar, InView } from '@_'
import { _, useStore } from '@stores'
import { getTimestamp, lastDate, removeHTMLTag } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { COMPONENT, LENGTH } from './ds'
import { memoStyles } from './styles'

function Item({ index, id, title, message, avatar, userId, userName, time, group }) {
  const { $, navigation } = useStore<Ctx>()
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
          navigation.push('Topic', {
            topicId: `group/${id}`
          })

          t('帖子搜索.跳转', {
            to: 'Topic',
            topicId: `group/${id}`
          })
        }}
      >
        <Flex align='start'>
          <InView style={styles.inView} y={120 * (index + 1)}>
            <Avatar src={avatar} userId={userId} />
          </InView>
          <Flex.Item>
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
        {removeHTMLTag(content)}
      </Highlight>
      {!index && <Heatmap id='帖子搜索.跳转' />}
    </View>
  )
}

export default ob(Item, COMPONENT)
