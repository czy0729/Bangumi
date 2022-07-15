/*
 * @Author: czy0729
 * @Date: 2021-03-12 15:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-19 21:28:31
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Input, Iconfont } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { memoStyles } from './styles'
import { Ctx } from '../types'

type Props = {
  length: number
}

class Filter extends React.Component<Props> {
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
    if (!this.show) return null

    global.rerender('Home.Filter')

    const { $ }: Ctx = this.context
    const { filter } = $.state
    const { length } = this.props
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
          <Flex
            style={this.styles.icon}
            justify='center'
            // @ts-ignore
            pointerEvents='none'
          >
            <Iconfont name='md-search' size={18} />
            {!!length && (
              <Text style={_.ml.xs} type='icon' bold size={15}>
                {length}
              </Text>
            )}
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
