/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:42:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-07 17:20:30
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { date } from '@utils'
import _, { md } from '@styles'

const ArticleItem = ({
  style,
  title,
  summary,
  nickname,
  timestamp,
  replies
}) => (
  <View style={[{ paddingVertical: md }, style]}>
    <Text size={16}>{title}</Text>
    <Flex style={_.mt.xs}>
      <Text type='sub' size={12}>
        by
      </Text>
      <Text style={_.ml.xs} size={12}>
        {nickname}
      </Text>
      <Text type='sub' style={_.ml.xs} size={12}>
        {date('Y-m-d', timestamp)} / {replies} replies
      </Text>
    </Flex>
    {!!summary && (
      <Text style={_.mt.md} lineHeight={18} numberOfLines={3}>
        {summary}
      </Text>
    )}
  </View>
)

export default ArticleItem
