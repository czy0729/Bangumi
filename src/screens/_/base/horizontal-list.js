/*
 * @Author: czy0729
 * @Date: 2019-04-08 01:25:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-23 04:30:17
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text, Touchable } from '@components'
import { _ } from '@stores'
import { desc } from '@utils'
import { findSubjectCn } from '@utils/app'
import { ob } from '@utils/decorators'
import { Cover } from './cover'

const hitSlop = {
  top: _.device(3, 4),
  right: _.device(4, 4),
  bottom: _.device(4, 4),
  left: _.device(4, 4)
}

export const HorizontalList = ob(
  class extends React.Component {
    static defaultProps = {
      data: [],
      width: 60,
      height: 60,
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

      // 没封面图的置后
      if (!initialRenderNums || scrolled)
        return data.sort((a, b) => desc(a, b, item => (item.image ? 1 : 0)))

      return data
        .sort((a, b) => desc(a, b, item => (item.image ? 1 : 0)))
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
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={80}
          onScroll={!initialRenderNums || scrolled ? undefined : this.onScroll}
        >
          {this.data.map((item, index) => {
            const desc = String(item.desc)
            let typeCn = ''
            if (
              (!desc.includes('演出') && desc.includes('曲')) ||
              (!desc.includes('演出') && desc.includes('歌')) ||
              desc.includes('声') ||
              desc.includes('广播')
            ) {
              typeCn = '音乐'
            } else if (desc.includes('书籍')) {
              typeCn = '书籍'
            } else if (desc.includes('游戏')) {
              typeCn = '游戏'
            }

            const size = (typeCn === '音乐' ? width * 1.1 : width) * _.ratio
            return (
              <View
                key={item.id}
                style={[
                  {
                    width: size
                  },
                  index !== 0 && {
                    marginLeft: (typeCn === '音乐' ? 16 : 12) * _.ratio
                  }
                ]}
              >
                <Cover
                  style={styles.cover}
                  size={size}
                  height={height * _.ratio}
                  src={item.image}
                  radius
                  shadow
                  quality={quality}
                  type={typeCn}
                  onPress={() => onPress(item, typeCn)}
                />
                <Touchable
                  withoutFeedback
                  hitSlop={hitSlop}
                  onPress={() => onPress(item, typeCn)}
                >
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
)

const styles = _.create({
  contentContainerStyle: {
    paddingVertical: 4,
    paddingHorizontal: _.wind
  },
  cover: {
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
})
