/*
 * @Author: czy0729
 * @Date: 2019-04-08 01:25:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-12 02:04:09
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { _ } from '@stores'
import { findBangumiCn } from '@utils/app'
import Cover from './cover'

function HorizontalList({
  style,
  data,
  width,
  height,
  quality,
  findCn,
  ellipsizeMode,
  onPress
}) {
  return (
    <ScrollView
      style={style}
      contentContainerStyle={styles.contentContainerStyle}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {data
        // 没封面图的置后
        .sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0))
        .map((item, index) => (
          <View
            key={item.id}
            style={[
              {
                width
              },
              index !== 0 && styles.item
            ]}
          >
            <Cover
              size={width}
              height={height}
              src={item.image}
              radius
              border
              shadow
              quality={quality}
              onPress={() => onPress(item)}
            />
            <Touchable withoutFeedback onPress={() => onPress(item)}>
              <Text
                style={_.mt.sm}
                size={13}
                numberOfLines={2}
                ellipsizeMode={ellipsizeMode}
                bold
              >
                {findCn ? findBangumiCn(item.name) : item.name}
              </Text>
              {!!item.desc && (
                <Text style={_.mt.xs} type='sub' size={13} numberOfLines={1}>
                  {item.desc}
                </Text>
              )}
            </Touchable>
          </View>
        ))}
    </ScrollView>
  )
}

HorizontalList.defaultProps = {
  data: [],
  width: 68,
  height: 68,
  quality: false,
  findCn: false,
  ellipsizeMode: 'tail',
  onPress: Function.prototype
}

export default observer(HorizontalList)

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 4,
    paddingHorizontal: _.wind
  },
  item: {
    marginLeft: 12
  }
})
