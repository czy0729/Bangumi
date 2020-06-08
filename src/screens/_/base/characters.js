/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 02:12:42
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { _ } from '@stores'
import { IMG_DEFAULT } from '@constants'

const containerWidth = _.window.width - 2 * _.wind
const imageWidth = containerWidth * 0.216
const marginRight = (containerWidth - 4 * imageWidth) / 3

function Character({ style, data }) {
  return (
    <Flex style={style} wrap='wrap' align='start'>
      {data.map((item, index) => {
        const _style = [styles.item]
        if ((index + 1) % 4 !== 0) {
          _style.push(styles.mr)
        }
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
  )
}

Character.defaultProps = {
  data: [],
  onSelect: Function.prototype
}

export default observer(Character)

const styles = StyleSheet.create({
  item: {
    width: imageWidth,
    marginBottom: 12
  },
  mr: {
    marginRight
  }
})
