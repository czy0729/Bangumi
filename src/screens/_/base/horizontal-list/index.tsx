/*
 * @Author: czy0729
 * @Date: 2019-04-08 01:25:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-30 10:58:31
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { desc, findSubjectCn } from '@utils'
import { ob } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { SubjectTypeCn } from '@types'
import { Cover } from '../cover'
import { PreventTouchPlaceholder } from '../prevent-touch-placeholder'
import { memoStyles } from './styles'
import { HIT_SLOP } from './ds'
import { Props as HorizontalListProps } from './types'

export { HorizontalListProps }

export const HorizontalList = ob(
  class HorizontalListComponent extends React.Component<HorizontalListProps> {
    static defaultProps = {
      data: [],
      counts: {},
      width: 60,
      height: 60,
      quality: false,
      findCn: false,
      ellipsizeMode: 'tail',
      initialRenderNums: 0,
      onPress: Function.prototype,
      onSubPress: undefined
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
        counts,
        width,
        height,
        quality,
        findCn,
        ellipsizeMode,
        initialRenderNums,
        onPress,
        onSubPress
      } = this.props
      const { scrolled } = this.state
      return (
        <View>
          <ScrollView
            style={style}
            contentContainerStyle={this.styles.contentContainerStyle}
            horizontal
            {...SCROLL_VIEW_RESET_PROPS}
            scrollEventThrottle={80}
            onScroll={!initialRenderNums || scrolled ? undefined : this.onScroll}
          >
            {this.data.map((item, index) => {
              const count = counts[item.id] || 0
              const desc = String(item.desc || '')
              let typeCn: SubjectTypeCn | '' = ''
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

              const isMusic = typeCn === '音乐'
              const w = _.r(isMusic ? width * 1.16 : width)

              const title = findCn ? findSubjectCn(item.name, item.id) : item.name
              const { length } = title
              const size = length >= 12 ? 9 : length >= 5 ? 10 : 11

              const descSize = desc.length >= 6 ? 9 : 10
              return (
                <View
                  key={item.id}
                  style={[
                    {
                      width: w
                    },
                    index !== 0 && {
                      marginLeft: _.r(isMusic ? 16 : 12)
                    }
                  ]}
                >
                  <Cover
                    size={w}
                    height={_.r(height)}
                    src={item.image}
                    radius={isMusic ? _.radiusSm : true}
                    shadow
                    quality={quality}
                    type={typeCn}
                    onPress={() => onPress(item, typeCn)}
                  />
                  <Touchable
                    withoutFeedback
                    hitSlop={HIT_SLOP}
                    onPress={() => onPress(item, typeCn)}
                  >
                    <Text
                      style={_.mt.sm}
                      size={size}
                      numberOfLines={3}
                      ellipsizeMode={ellipsizeMode}
                      bold
                    >
                      {title}
                    </Text>
                  </Touchable>
                  {!!desc && (
                    <Touchable
                      style={_.mt.xs}
                      onPress={() => (onSubPress || onPress)(item, typeCn)}
                    >
                      <Flex>
                        {!!item.actorCover && (
                          <Cover
                            style={this.styles.actor}
                            src={item.actorCover}
                            size={16}
                            radius
                          />
                        )}
                        <Flex.Item>
                          <Text type='sub' size={descSize} numberOfLines={2} bold>
                            {desc}
                          </Text>
                        </Flex.Item>
                      </Flex>
                    </Touchable>
                  )}
                  {!!count && (
                    <Text style={_.mt.xs} type='main' size={10} bold>
                      +{count}
                    </Text>
                  )}
                </View>
              )
            })}
          </ScrollView>
          <PreventTouchPlaceholder />
        </View>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)
