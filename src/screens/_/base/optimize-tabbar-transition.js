/*
 * @Author: czy0729
 * @Date: 2020-05-12 20:40:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-17 20:50:47
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { _ } from '@stores'
import { IOS } from '@constants'

const PAGES_HAS_HEADER = {
  Discovery: false,
  Timeline: true,
  Home: true,
  Rakuen: true,
  User: false
}

class OptimizeTabbarTransition extends React.Component {
  static defaultProps = {
    header: false
  }

  state = {
    hide: false
  }

  onWillBlur = config => {
    const { header } = this.props
    const { action = {} } = config
    const { routeName } = action
    const isNextPageHasHeader = PAGES_HAS_HEADER[routeName]
    if (
      typeof isNextPageHasHeader === 'boolean' &&
      isNextPageHasHeader !== header
    ) {
      this.setState({
        hide: true
      })

      setTimeout(() => {
        this.setState({
          hide: false
        })
      }, 80)
    }
  }

  render() {
    const { children } = this.props
    const { hide } = this.state
    if (IOS) {
      return children
    }

    return (
      <>
        <NavigationEvents onWillBlur={this.onWillBlur} />
        <View style={[_.container.flex, hide && styles.hide]}>{children}</View>
      </>
    )
  }
}

export default OptimizeTabbarTransition

const styles = StyleSheet.create({
  hide: {
    opacity: 0
  }
})
