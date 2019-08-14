/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:05:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-14 10:35:16
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { rakuenStore } from '@stores'
import _ from '@styles'
import Text from '../text'

export default class QuoteText extends React.Component {
  state = {
    show: rakuenStore.setting.quote || false
  }

  show = () =>
    this.setState({
      show: true
    })

  render() {
    const { children } = this.props
    const { show } = this.state
    if (!show) {
      return (
        <Text style={styles.quoteTextPlaceholder} onPress={this.show}>
          ...
        </Text>
      )
    }
    return <Text style={styles.quoteText}>{children}</Text>
  }
}

const styles = StyleSheet.create({
  quoteTextPlaceholder: {
    paddingBottom: 10,
    marginTop: -6,
    color: _.colorSub,
    textAlign: 'center'
  },
  quoteText: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 4,
    backgroundColor: _.colorPrimaryLight,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: _.colorBorder,
    transform: [{ scale: 0.96 }]
  }
})
