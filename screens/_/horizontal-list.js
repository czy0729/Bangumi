/*
 * @Author: czy0729
 * @Date: 2019-04-08 01:25:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-21 17:28:33
 */
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { Image, Text, Touchable } from '@components'
import { IMG_DEFAULT } from '@constants'
import _ from '@styles'

const HorizontalList = ({ style, data, width, height, quality, onPress }) => (
  <ScrollView
    style={style}
    contentContainerStyle={styles.contentContainerStyle}
    horizontal
  >
    {data.map((item, index) => (
      <Touchable
        key={item.id}
        style={[
          {
            width
          },
          index !== 0 && _.ml.md
        ]}
        onPress={() => onPress(item.id)}
      >
        <Image
          size={width}
          height={height}
          src={item.image || IMG_DEFAULT}
          radius
          border
          shadow
          quality={quality}
        />
        <Text style={_.mt.sm} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={_.mt.xs} type='sub' size={12} numberOfLines={1}>
          {item.desc}
        </Text>
      </Touchable>
    ))}
  </ScrollView>
)

HorizontalList.defaultProps = {
  data: [],
  width: 72,
  height: 72,
  onPress: Function.prototype
}

export default observer(HorizontalList)

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 4,
    paddingHorizontal: _.wind
  }
})
