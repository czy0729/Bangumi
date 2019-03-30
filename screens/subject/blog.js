/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-29 07:12:40
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Text, Divider } from '@components'
import { ArticleItem } from '@screens/_'
import _, { wind } from '@styles'

const Blog = ({ style }, { $ }) => {
  const { blog = [] } = $.subject
  if (!blog) return null
  return (
    <View style={style}>
      <View style={_.container.wind}>
        <Text size={20}>评论</Text>
      </View>
      <View style={_.mt.md}>
        {blog.map((item, index) => (
          <View key={item.id}>
            {index !== 0 && <Divider />}
            <Touchable highlight onPress={() => {}}>
              <ArticleItem
                style={_.container.wind}
                title={item.title}
                summary={item.summary}
                nickname={item.user.nickname}
                timestamp={item.timestamp}
                replies={item.replies}
                onPress={() => {}}
              />
            </Touchable>
          </View>
        ))}
      </View>
    </View>
  )
}

Blog.contextTypes = {
  $: PropTypes.object
}

export default observer(Blog)
