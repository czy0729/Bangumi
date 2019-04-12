/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-10 22:26:44
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, ArticleItem } from '@screens/_'
import _, { wind } from '@styles'

const Topic = ({ style }, { $ }) => {
  const { topic } = $.subject
  if (!topic) {
    return null
  }

  return (
    <View style={style}>
      <SectionTitle style={{ paddingLeft: wind }}>讨论版</SectionTitle>
      <View style={_.mt.sm}>
        {topic.map((item, index) => (
          <ArticleItem
            key={item.id}
            style={{ paddingLeft: wind }}
            isFirst={index === 0}
            avatar={item.user.avatar.small}
            title={item.title}
            summary={item.summary}
            nickname={item.user.nickname}
            timestamp={item.timestamp}
            replies={item.replies}
            onPress={() => {}}
          />
        ))}
      </View>
    </View>
  )
}

Topic.contextTypes = {
  $: PropTypes.object
}

export default observer(Topic)
