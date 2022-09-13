/*
 * @Author: czy0729
 * @Date: 2021-01-24 19:41:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 15:46:31
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

    onScroll = () => {
      const { scrolled } = this.state
      if (!scrolled) {
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
      if (this.show) return data

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
          {this.data.map(renderItem)}
          {typeof renderNums === 'function' && renderNums()}
        </ScrollView>
      )
    }
  }
)
