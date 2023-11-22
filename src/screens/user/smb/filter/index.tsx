/*
 * @Author: czy0729
 * @Date: 2023-11-22 05:37:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-22 06:16:22
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input, Iconfont } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

class Filter extends React.Component {
  state = {
    focus: false
  }

  onFocus = () => {
    this.setState({
      focus: true
    })
  }

  onBlur = () => {
    this.setState({
      focus: false
    })
  }

  render() {
    const { $ } = this.context as Ctx
    const { _filter } = $.state
    const { focus } = this.state
    return (
      <View style={this.styles.filter}>
        <Input
          style={this.styles.input}
          clearButtonMode='never'
          value={_filter}
          returnKeyType='search'
          returnKeyLabel='搜索'
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={$.onFilterInputChange}
          onSubmitEditing={$.onFilterInputSubmit}
        />
        {!focus && !_filter && (
          <Flex style={this.styles.icon} justify='center' pointerEvents='none'>
            <Iconfont name='md-search' size={16} />
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
