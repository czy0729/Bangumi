/*
 * @Author: czy0729
 * @Date: 2021-01-24 19:41:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-24 20:08:43
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'mobx-react'

export default
@observer
class HorizontalList extends React.Component {
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

  get data() {
    const { data, initialRenderNums } = this.props
    const { scrolled } = this.state
    if (!initialRenderNums || scrolled) {
      return data
    }

    return data.filter((item, index) => index < initialRenderNums)
  }

  render() {
    const {
      style,
      contentContainerStyle,
      initialRenderNums,
      renderItem
    } = this.props
    const { scrolled } = this.state
    return (
      <ScrollView
        style={style}
        contentContainerStyle={contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={80}
        onScroll={!initialRenderNums || scrolled ? undefined : this.onScroll}
      >
        {this.data.map(renderItem)}
      </ScrollView>
    )
  }
}
