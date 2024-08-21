/*
 * @Author: czy0729
 * @Date: 2020-05-04 15:40:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 05:22:51
 */
import React from 'react'
import { View } from 'react-native'
import { IconNavigate, ItemBlog, SectionTitle } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Blog(_props, { $, navigation }: Ctx) {
  const { blog = [] } = $.channel
  return (
    <View style={_.mt.lg}>
      <SectionTitle
        style={_.container.wind}
        right={
          <IconNavigate
            onPress={() => {
              navigation.push('DiscoveryBlog', {
                type: $.type
              })

              t('频道.跳转', {
                to: 'DiscoveryBlog',
                from: '最新日志',
                type: $.type
              })
            }}
          />
        }
      >
        最新日志
      </SectionTitle>
      <View style={_.mt.sm}>
        {blog.map(item => (
          <ItemBlog
            key={item.id}
            {...item}
            typeCn={$.typeCn}
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

export default obc(Blog, COMPONENT)
