/*
 * @Author: czy0729
 * @Date: 2021-12-31 02:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:28:05
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
    const { ipt } = $.state
    const { focus } = this.state
    return (
      <View style={this.styles.filter}>
        <Input
          style={this.styles.input}
          clearButtonMode='never'
          value={ipt}
          returnKeyType='search'
          returnKeyLabel='搜索'
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={$.onFilterChange}
          onSubmitEditing={$.onSubmitEditing}
        />
        {!focus && !ipt && (
          <Flex
            style={this.styles.icon}
            justify='center'
            // @ts-expect-error
            pointerEvents='none'
          >
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
