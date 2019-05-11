/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-11 02:59:25
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, ArticleItem } from '@screens/_'
import _ from '@styles'

const Blog = ({ style }, { $, navigation }) => {
  const { blog = [] } = $.subject
  if (!blog) {
    return null
  }

  return (
    <View style={style}>
      <SectionTitle style={{ paddingLeft: _.wind }}>评论</SectionTitle>
      <View style={_.mt.sm}>
        {blog.map((item, index) => (
          <ArticleItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            style={{ paddingLeft: _.wind }}
            navigation={navigation}
            index={index}
            avatar={item.user.avatar.small}
            title={item.title}
            summary={item.summary}
            nickname={item.user.nickname}
            timestamp={item.timestamp}
            replies={item.replies}
            url={item.url}
          />
        ))}
      </View>
    </View>
  )
}

Blog.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Blog)
