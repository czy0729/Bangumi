/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-04 03:21:24
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { WebBrowser } from 'expo'
import { Text, Touchable } from '@components'
import { ArticleItem } from '@screens/_'
import _ from '@styles'

const Topic = ({ style }, { $ }) => {
  const { topic } = $.subject
  if (!topic) {
    return null
  }
  return (
    <View style={style}>
      <View style={_.container.wind}>
        <Text size={20}>讨论版</Text>
      </View>
      <View style={_.mt.sm}>
        {topic.map(item => (
          <Touchable
            key={item.id}
            highlight
            onPress={() => WebBrowser.openBrowserAsync(item.url)}
          >
            <ArticleItem
              style={_.container.wind}
              title={item.title}
              summary={item.summary}
              nickname={item.user.nickname}
              timestamp={item.timestamp}
              replies={item.replies}
            />
          </Touchable>
        ))}
      </View>
    </View>
  )
}

Topic.contextTypes = {
  $: PropTypes.object
}

export default observer(Topic)
