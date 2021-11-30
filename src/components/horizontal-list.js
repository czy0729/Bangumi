/*
 * @Author: czy0729
 * @Date: 2021-01-24 19:41:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-30 18:09:55
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

export const HorizontalList = observer(
  class extends React.Component {
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

    get show() {
      const { initialRenderNums } = this.props
      const { scrolled } = this.state
      return _.isLandscape || !initialRenderNums || scrolled
    }

    get data() {
      const { data } = this.props
      if (this.show) return data

      const { initialRenderNums } = this.props
      return data.filter((item, index) => index < initialRenderNums)
    }

    render() {
      const { style, contentContainerStyle, renderItem } = this.props
      return (
        <ScrollView
          style={style}
          contentContainerStyle={contentContainerStyle}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={80}
          onScroll={this.show ? undefined : this.onScroll}
        >
          {this.data.map(renderItem)}
        </ScrollView>
      )
    }
  }
)
