/*
 * @Author: czy0729
 * @Date: 2020-05-04 15:40:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:28:32
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { IconNavigate, ItemBlog, SectionTitle } from '@_'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Blog() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

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
        {blog.map((item, index) => (
          <ItemBlog
            key={item.id}
            index={index}
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

export default observer(Blog)
