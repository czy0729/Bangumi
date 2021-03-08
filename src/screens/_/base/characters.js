/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 17:46:30
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { IMG_DEFAULT } from '@constants'

const containerWidth = _.window.width - 2 * _.wind
const imageWidth = containerWidth * 0.216
const marginRight = (containerWidth - 4 * imageWidth) / 3

export const Character = ob(({ style, data = [] }) => (
  <Flex style={style} wrap='wrap' align='start'>
    {data.map((item, index) => {
      const _style = [styles.item]
      if ((index + 1) % 4 !== 0) _style.push(styles.mr)
      return (
        <View style={_style} key={item.id}>
          <Image
            size={imageWidth}
            src={item.image || IMG_DEFAULT}
            radius
            border
            shadow
          />
          <Text style={_.mt.sm} numberOfLines={2}>
            {item.name}
          </Text>
          <Text type='sub' size={12} numberOfLines={1}>
            {item.desc}
          </Text>
        </View>
      )
    })}
  </Flex>
))

const styles = _.create({
  item: {
    width: imageWidth,
    marginBottom: 12
  },
  mr: {
    marginRight
  }
})
