/*
 * @Author: czy0729
 * @Date: 2021-03-12 15:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-28 08:52:36
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input, Iconfont } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { H_FILTER } from './store'

class Filter extends React.Component {
  state = {
    focus: false
  }

  onFocus = () =>
    this.setState({
      focus: true
    })

  onBlur = () =>
    this.setState({
      focus: false
    })

  get show() {
    const { setting } = systemStore
    return setting.homeFilter
  }

  render() {
    if (!this.show) {
      return null
    }

    rerender('Home.Filter')

    const { $ } = this.context
    const { filter } = $.state
    const { focus } = this.state
    return (
      <View style={this.styles.filter}>
        <Input
          style={this.styles.input}
          clearButtonMode='never'
          value={filter}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={$.onFilterChange}
        />
        {!focus && !filter && (
          <Flex style={this.styles.icon} justify='center' pointerEvents='none'>
            <Iconfont name='md-search' size={18} />
          </Flex>
        )}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Filter)

const memoStyles = _.memoStyles(_ => ({
  filter: {
    height: H_FILTER,
    paddingVertical: _.md,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorBg
  },
  input: {
    ..._.fontSize(16),
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: _.select(_.colorBorder, _.colorPlain),
    borderRadius: 40
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}))
