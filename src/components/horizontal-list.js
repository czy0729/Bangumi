/*
 * @Author: czy0729
 * @Date: 2021-01-24 19:41:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-08 13:26:24
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
