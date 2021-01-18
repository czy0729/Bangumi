/*
 * @Author: czy0729
 * @Date: 2019-04-08 01:25:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-18 02:00:00
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { _ } from '@stores'
import { findSubjectCn } from '@utils/app'
import Cover from './cover'

export default
@observer
class HorizontalList extends React.Component {
  static defaultProps = {
    data: [],
    width: 52,
    height: 52,
    quality: false,
    findCn: false,
    ellipsizeMode: 'tail',
    initialRenderNums: 0,
    onPress: Function.prototype
  }

  state = {
    scrolled: false
  }

  onScroll = () => {
    const { scrolled } = this.state
    if (!scrolled) {
      this.setState({
        scrolled: true
      })
    }
  }

  get data() {
    const { data, initialRenderNums } = this.props
    const { scrolled } = this.state
    if (!initialRenderNums || scrolled) {
      // 没封面图的置后
      return data.sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0))
    }

    return data
      .sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0))
      .filter((item, index) => index < initialRenderNums)
  }

  render() {
    const {
      style,
      width,
      height,
      quality,
      findCn,
      ellipsizeMode,
      initialRenderNums,
      onPress
    } = this.props
    const { scrolled } = this.state
    return (
      <ScrollView
        style={style}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={80}
        onScroll={!initialRenderNums || scrolled ? undefined : this.onScroll}
      >
        {this.data.map((item, index) => {
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
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 4,
    paddingHorizontal: _.wind
  }
})
