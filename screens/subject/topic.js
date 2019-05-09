/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-09 19:53:14
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, ArticleItem } from '@screens/_'
import { appNavigate } from '@utils/app'
import _ from '@styles'

const Topic = ({ style }, { $, navigation }) => {
  const { topic } = $.subject
  if (!topic) {
    return null
  }

  return (
    <View style={style}>
      <SectionTitle style={{ paddingLeft: _.wind }}>讨论版</SectionTitle>
      <View style={_.mt.sm}>
        {topic.map((item, index) => (
          <ArticleItem
            key={item.id}
            style={{ paddingLeft: _.wind }}
            isFirst={index === 0}
            avatar={item.user.avatar.small}
            title={item.title}
            summary={item.summary}
            nickname={item.user.nickname}
            timestamp={item.timestamp}
            replies={item.replies}
            onPress={() => appNavigate(item.url, navigation)}
          />
        ))}
      </View>
    </View>
  )
}

Topic.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Topic)
