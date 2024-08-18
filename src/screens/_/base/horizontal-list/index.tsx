/*
 * @Author: czy0729
 * @Date: 2019-04-08 01:25:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 08:25:00
 */
import React from 'react'
import { Component } from '@components'
import { desc } from '@utils'
import { ob } from '@utils/decorators'
import { PreventTouchPlaceholder } from '../prevent-touch-placeholder'
import Item from './item'
import ScrollViewHorizontal from './scroll-view-horizontal'
import { COMPONENT } from './ds'
import { Props as HorizontalListProps } from './types'

export { HorizontalListProps }

/** 水平列表 */
export const HorizontalList = ob(
  class HorizontalListComponent extends React.Component<HorizontalListProps> {
    static defaultProps = {
      data: [],
      counts: {},
      width: 60,
      height: 60,
      quality: false,
      findCn: false,
      typeCn: '',
      relationTypeCn: '',
      ellipsizeMode: 'tail',
      initialRenderNums: 0,
      scrolled: false,
      onPress: () => {},
      onSubPress: undefined
    }

    state = {
      scrolled: this.props.scrolled
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
      if (!initialRenderNums || scrolled) {
        return data.slice().sort((a, b) => desc(a, b, item => (item.image ? 1 : 0)))
      }

      return data
        .slice()
        .sort((a, b) => desc(a, b, item => (item.image ? 1 : 0)))
        .filter((_item, index) => index < initialRenderNums)
    }

    render() {
      const {
        style,
        counts,
        width,
        height,
        findCn,
        typeCn,
        relationTypeCn,
        ellipsizeMode,
        initialRenderNums,
        onPress,
        onSubPress
      } = this.props
      const { scrolled } = this.state
      return (
        <Component id='base-horizontal-list'>
          <ScrollViewHorizontal
            style={style}
            onScroll={!initialRenderNums || scrolled ? undefined : this.onScroll}
          >
            {this.data.map((item, index) => (
              <Item
                key={item.id || index}
                item={item}
                count={counts[item.id] || 0}
                width={width}
                height={height}
                findCn={findCn}
                ellipsizeMode={ellipsizeMode}
                isFirst={index === 0}
                typeCn={typeCn}
                relationTypeCn={relationTypeCn}
                onPress={onPress}
                onSubPress={onSubPress}
              />
            ))}
          </ScrollViewHorizontal>
          <PreventTouchPlaceholder />
        </Component>
      )
    }
  },
  COMPONENT
)

export default HorizontalList
