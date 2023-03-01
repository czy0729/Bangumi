/*
 * @Author: czy0729
 * @Date: 2020-05-04 17:27:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-02 14:39:24
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Tags(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { tags = [] } = $.channel
  return (
    <View style={_.mt.lg}>
      <SectionTitle style={_.container.wind}>标签</SectionTitle>
      <Flex style={styles.container} wrap='wrap'>
        {tags.map(item => (
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
            <Text type='desc' size={13}>
              {item}
            </Text>
          </Touchable>
        ))}
      </Flex>
    </View>
  )
}

export default obc(Tags)
