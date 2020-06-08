/*
 * @Author: czy0729
 * @Date: 2020-05-04 15:40:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 14:20:13
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, ItemBlog } from '@screens/_'
import { _ } from '@stores'

function Blog(props, { $ }) {
  const { blog } = $.channel
  return (
    <View style={_.mt.lg}>
      <SectionTitle style={_.container.wind}>最近日志</SectionTitle>
      <View style={_.mt.sm}>
        {blog.map((item, index) => (
          <ItemBlog
            key={item.id}
            {...item}
            index={index}
            event={{
              id: '频道.跳转',
              data: {
                from: 'blog',
                type: $.type
              }
            }}
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
