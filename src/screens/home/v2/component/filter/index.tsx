/*
 * @Author: czy0729
 * @Date: 2021-03-12 15:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-07 09:25:07
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Input, Loading, Text } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

class Filter extends React.Component<Props> {
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

  get show() {
    const { setting } = systemStore
    return setting.homeFilter
  }

  get filter() {
    const { $ } = this.context as Ctx
    const { filterPage } = $.state
    if (filterPage >= 0 && filterPage <= $.tabs.length) {
      const { filter } = $.state
      const { title } = this.props
      if (title === $.tabs[filterPage].title) return filter
    }
    return ''
  }

  render() {
    r(COMPONENT)

    if (!this.show) return null

    const { $ } = this.context as Ctx
    return (
      <View style={this.styles.filter}>
        <Input
          style={this.styles.input}
          clearButtonMode='never'
          defaultValue={this.filter}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={$.onFilterChange}
        />
        {!this.state.focus && !this.filter && (
          <Flex style={this.styles.icon} justify='center' pointerEvents='none'>
            {$.state.progress.fetching && (
              <View style={this.styles.loading}>
                <Loading.Medium color={_.colorSub} size={16} />
              </View>
            )}
            {this.props.length ? (
              <Text type='icon' bold size={15}>
                {this.props.length}
              </Text>
            ) : (
              <Iconfont name='md-search' size={18} />
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
