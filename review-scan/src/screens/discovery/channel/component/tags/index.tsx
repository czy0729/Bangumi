/*
 * @Author: czy0729
 * @Date: 2020-05-04 17:27:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:30:12
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { IconNavigate, SectionTitle } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Tags() {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { tags = [] } = $.channel
  return (
    <View style={_.mt.lg}>
      <SectionTitle
        style={_.container.wind}
        right={
          <IconNavigate
            onPress={() => {
              navigation.push('Tags', {
                type: $.type
              })

              t('频道.跳转', {
                to: 'DiscoveryBlog',
                from: '标签',
                type: $.type
              })
            }}
          />
        }
      >
        标签
      </SectionTitle>
      <Flex style={styles.container} wrap='wrap'>
        {tags
          .filter((_item, index) => index < 24)
          .map(item => (
            <Touchable
              key={item}
              style={styles.tag}
              animate
              scale={0.85}
              onPress={() => {
                t('频道.跳转', {
                  to: 'Tag',
                  from: 'tags',
                  type: $.type,
                  tag: item
                })

                navigation.push('Tag', {
                  type: $.type,
                  tag: item
                })
              }}
            >
              <Text type='desc' size={12}>
                {item}
              </Text>
            </Touchable>
          ))}
      </Flex>
    </View>
  )
}

export default ob(Tags, COMPONENT)
