/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:05:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-24 01:09:24
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, rakuenStore } from '@stores'
import Text from '../text'

export default
@observer
class QuoteText extends React.Component {
  state = {
    show: rakuenStore.setting.quote || false,
    toggle: false
  }

  show = () =>
    this.setState({
      show: true
    })

  toggle = () =>
    this.setState({
      toggle: true
    })

  render() {
    const { children } = this.props
    const { show, toggle } = this.state
    if (!show) {
      return (
        <Text
          style={this.styles.quoteTextPlaceholder}
          selectable
          onPress={this.show}
        >
          ...
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
          {children}
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
    paddingBottom: 10,
    marginTop: -6,
    color: _.colorSub,
    textAlign: 'center'
  },
  quote: {
    padding: 8,
    marginTop: 4,
    marginBottom: 8,
    backgroundColor: _.colorBg,
    borderLeftWidth: 4,
    borderLeftColor: _.colorIcon
  }
}))
