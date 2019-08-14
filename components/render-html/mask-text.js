/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:03:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-14 10:35:13
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import _ from '@styles'
import Text from '../text'

export default class MaskText extends React.Component {
  state = {
    show: false
  }

  toggle = () => {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }

  render() {
    const { style, children } = this.props
    const { show } = this.state
    return (
      <Text
        style={[style, show ? styles.blockTextShow : styles.blockText]}
        onPress={this.toggle}
      >
        {children}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  blockText: {
    color: _.colorDesc,
    backgroundColor: _.colorDesc
  },
  blockTextShow: {
    color: _.colorPlain,
    backgroundColor: _.colorDesc
  }
})
