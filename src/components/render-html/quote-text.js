/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:05:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-12 16:41:07
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, rakuenStore } from '@stores'
import { IOS } from '@constants'
import { Text } from '../text'

export default
@observer
class QuoteText extends React.Component {
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

    // 过滤掉<q>里面的div
    if (!IOS && children?.length > 1) {
      return children.filter(
        item => !(item?.[0]?.key && item[0].key.indexOf('View-') === 0)
      )
    }

    return children
  }

  render() {
    const { show, toggle } = this.state
    if (!show) {
      return (
        <Text style={this.styles.quoteTextPlaceholder} selectable onPress={this.show}>
          「...」
        </Text>
      )
    }

    return (
      <View style={this.styles.quote}>
        <Text
          size={12}
          selectable
          numberOfLines={toggle ? 10 : 3}
          onPress={this.toggle}
        >
          {this.children}
        </Text>
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  quoteTextPlaceholder: {
    paddingBottom: 2,
    color: _.colorSub,
    textAlign: 'center'
  },
  quote: {
    padding: 8,
    paddingLeft: 10,
    marginTop: 4,
    marginRight: 4,
    marginBottom: 8,
    backgroundColor: _.colorBg,
    borderLeftWidth: 4,
    borderLeftColor: _.colorIcon,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
