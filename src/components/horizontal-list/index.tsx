/*
 * @Author: czy0729
 * @Date: 2021-01-24 19:41:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-08 12:25:26
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { scrollViewResetProps } from '@constants'
import { ViewStyle } from '@types'

type Props = {
  style: ViewStyle
  contentContainerStyle: ViewStyle
  data: any[]

  /** 未滑动的情况下，最多显示多少项 */
  initialRenderNums?: number
  renderItem?: (arg0: any) => any
}

export const HorizontalList = observer(
  class HorizontalListComponent extends React.Component<Props> {
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
          scrollEventThrottle={80}
          {...scrollViewResetProps}
          onScroll={this.show ? undefined : this.onScroll}
        >
          {this.data.map(renderItem)}
        </ScrollView>
      )
    }
  }
)
