/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:05:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-16 13:44:32
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { rakuenStore } from '@stores'
import { IOS } from '@constants'
import { ReactNode } from '@types'
import { Flex } from '../../flex'
import { Text } from '../../text'
import { memoStyles } from './styles'

class QuoteText extends React.Component<{
  children?: ReactNode | ReactNode[] | string | string[]
}> {
  state = {
    show: rakuenStore.setting.quote || false,
    toggle: false
  }

  componentDidCatch() {
    console.info('@/components/render-html', 'componentDidCatch')
  }

  show = () =>
    this.setState({
      show: true
    })

  toggle = () =>
    this.setState({
      toggle: true
    })

  get children() {
    const { children } = this.props

    // 过滤掉 q 里面的div
    if (!IOS && Array.isArray(children) && children.length > 1) {
      return children.filter(item => !(item?.[0]?.key && item[0].key.indexOf('View-') === 0))
    }

    return children
  }

  render() {
    const { show, toggle } = this.state
    if (!show) {
      return (
        <Text style={this.styles.quoteTextPlaceholder} onPress={this.show}>
          「...」
        </Text>
      )
    }

    return (
      <Flex>
        <View style={this.styles.quote}>
          <Text size={12} numberOfLines={toggle ? 10 : 3} onPress={this.toggle}>
            {this.children}
          </Text>
        </View>
      </Flex>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default observer(QuoteText)
