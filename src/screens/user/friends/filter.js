/*
 * @Author: czy0729
 * @Date: 2021-03-12 15:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-09 14:02:50
 */
import React from 'react'
import { View } from 'react-native'
import { Input } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const H_FILTER = 36 + 2 * _.md

class Filter extends React.Component {
  render() {
    const { $ } = this.context
    const { filter } = $.state
    const { list } = $.friends
    return (
      <View style={this.styles.filter}>
        <Input
          style={this.styles.input}
          clearButtonMode='never'
          value={filter}
          placeholder={`${list.length}个好友`}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={$.onFilterChange}
        />
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
