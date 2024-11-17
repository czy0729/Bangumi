/*
 * @Author: czy0729
 * @Date: 2021-12-31 02:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:36:40
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Input } from '@components'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

class Filter extends React.Component<Ctx> {
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
    r(COMPONENT)

    const { $ } = this.props
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

export default ob(Filter)
