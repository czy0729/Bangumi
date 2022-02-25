/*
 * @Author: czy0729
 * @Date: 2021-12-31 02:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-31 03:16:47
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input, Iconfont } from '@components'
import { _ } from '@stores'
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

  render() {
    const { $ } = this.context
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

export default obc(Filter)

const memoStyles = _.memoStyles(() => ({
  filter: {
    height: H_FILTER,
    paddingVertical: _.md,
    paddingHorizontal: _.wind,
    marginBottom: _._wind,
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
