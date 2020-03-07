/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:05:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-07 15:02:43
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _, rakuenStore } from '@stores'
import Text from '../text'

export default
@observer
class QuoteText extends React.Component {
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
        <Text style={this.styles.quoteTextPlaceholder} onPress={this.show}>
          ...
        </Text>
      )
    }
    return <Text style={this.styles.quoteText}>“ {children} ”</Text>
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
  quoteText: {
    padding: 12,
    marginBottom: 6,
    backgroundColor: _.select('rgb(232, 232, 234)', _._colorDarkModeLevel2)
  }
}))
