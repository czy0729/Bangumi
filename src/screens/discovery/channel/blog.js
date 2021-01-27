/*
 * @Author: czy0729
 * @Date: 2020-05-04 15:40:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:38:57
 */
import React from 'react'
import { View } from 'react-native'
import { SectionTitle, ItemBlog } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

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

export default obc(Blog)
