/*
 * @Author: czy0729
 * @Date: 2019-04-08 01:25:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-06 05:17:50
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { _ } from '@stores'
import { findSubjectCn } from '@utils/app'
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
        .map((item, index) => {
          const desc = String(item.desc)
          let typeCn = ''
          if (
            desc.includes('曲') ||
            desc.includes('歌') ||
            desc.includes('声') ||
            desc.includes('广播')
          ) {
            typeCn = '音乐'
          } else if (desc.includes('书籍')) {
            typeCn = '书籍'
          } else if (desc.includes('游戏')) {
            typeCn = '游戏'
          }
          return (
            <View
              key={item.id}
              style={[
                {
                  width
                },
                index !== 0 && {
                  marginLeft: typeCn === '音乐' ? 16 : 12
                }
              ]}
            >
              <Cover
                size={width}
                height={height}
                src={item.image}
                radius
                shadow
                quality={quality}
                type={typeCn}
                onPress={() => onPress(item)}
              />
              <Touchable withoutFeedback onPress={() => onPress(item)}>
                <Text
                  style={_.mt.sm}
                  size={10}
                  numberOfLines={3}
                  ellipsizeMode={ellipsizeMode}
                  bold
                >
                  {findCn ? findSubjectCn(item.name, item.id) : item.name}
                </Text>
                {!!item.desc && (
                  <Text style={_.mt.xs} type='sub' size={10} numberOfLines={2}>
                    {item.desc}
                  </Text>
                )}
              </Touchable>
            </View>
          )
        })}
    </ScrollView>
  )
}

HorizontalList.defaultProps = {
  data: [],
  width: 52,
  height: 52,
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
  }
})
