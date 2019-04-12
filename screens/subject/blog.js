/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-10 22:27:10
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, ArticleItem } from '@screens/_'
import _, { wind } from '@styles'

const Blog = ({ style }, { $ }) => {
  const { blog = [] } = $.subject
  if (!blog) {
    return null
  }

  return (
    <View style={style}>
      <SectionTitle style={{ paddingLeft: wind }}>评论</SectionTitle>
      <View style={_.mt.sm}>
        {blog.map((item, index) => (
          <ArticleItem
            key={item.title}
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

Blog.contextTypes = {
  $: PropTypes.object
}

export default observer(Blog)
