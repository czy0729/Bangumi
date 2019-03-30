/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-29 07:13:27
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text, Divider } from '@components'
import { ArticleItem } from '@screens/_'
import _ from '@styles'

const Topic = ({ style }, { $ }) => {
  const { topic } = $.subject
  if (!topic) return null
  return (
    <View style={style}>
      <View style={_.container.wind}>
        <Text size={20}>讨论版</Text>
      </View>
      <View style={_.mt.md}>
        {topic.map((item, index) => (
          <View key={item.id}>
            {index !== 0 && <Divider />}
            <ArticleItem
              style={_.container.wind}
              title={item.title}
              summary={item.summary}
              nickname={item.user.nickname}
              timestamp={item.timestamp}
              replies={item.replies}
              onPress={() => {}}
            />
          </View>
        ))}
      </View>
    </View>
  )
}

Topic.contextTypes = {
  $: PropTypes.object
}

export default observer(Topic)
