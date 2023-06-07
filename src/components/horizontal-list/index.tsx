/*
 * 通用水平移动列表
 * @Author: czy0729
 * @Date: 2021-01-24 19:41:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 03:17:23
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Props as HorizontalListProps } from './types'

export { HorizontalListProps }

export const HorizontalList = observer(
  class HorizontalListComponent extends React.Component<HorizontalListProps> {
    static defaultProps = {
      data: [],
      initialRenderNums: 3
    }

    state = {
      scrolled: false
    }

    onScroll = evt => {
      const { x } = evt.nativeEvent.contentOffset
      if (x >= 20) {
        this.setState({
          scrolled: true
        })
      }
    }

    get initialRenderNums() {
      const { initialRenderNums } = this.props
      return initialRenderNums * (_.isLandscape ? 2 : 1)
    }

    get show() {
      const { scrolled } = this.state
      return !this.initialRenderNums || scrolled
    }

    get data() {
      const { data } = this.props
      if (this.show) return data.slice()

      return data.filter((item, index) => index < this.initialRenderNums)
    }

    render() {
      const { style, contentContainerStyle, renderItem, renderNums } = this.props
      return (
        <ScrollView
          style={style}
          contentContainerStyle={contentContainerStyle}
          horizontal
          scrollEventThrottle={80}
          {...SCROLL_VIEW_RESET_PROPS}
          onScroll={this.show ? undefined : this.onScroll}
        >
          {this.data.map((item, index) => {
            const element = renderItem(item, index)
            if (element) {
              return React.cloneElement(element, {
                key: `horizontal-list-item-${index}`
              })
            }
            return null
          })}
          {typeof renderNums === 'function' && renderNums()}
        </ScrollView>
      )
    }
  }
)
