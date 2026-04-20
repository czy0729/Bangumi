/*
 * @Author: czy0729
 * @Date: 2024-08-21 18:35:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 18:40:28
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Highlight, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Tag } from '../../../base'

function Title({ title, typeCn, desc, collect, filter }) {
  return (
    <View style={_.container.block}>
      <Highlight bold numberOfLines={3} value={filter} t2s={false}>
        {title}
      </Highlight>
      {!!desc && desc !== title && (
        <Text
          style={_.mt.sm}
          size={10}
          numberOfLines={(collect ? 2 : 3) - (title.length >= 40 ? 1 : 0)}
        >
          {desc}
        </Text>
      )}
      <Flex style={_.mt.sm}>
        {!!typeCn && <Tag style={_.mr.sm} value={typeCn} />}
        {!!collect && (
          <Flex.Item>
            <Text size={10} type='sub' bold>
              {collect} 人收藏
            </Text>
          </Flex.Item>
        )}
      </Flex>
    </View>
  )
}

export default ob(Title)
