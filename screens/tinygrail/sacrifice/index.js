/*
 * @Author: czy0729
 * @Date: 2019-11-17 04:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-17 14:26:22
 */
import React from 'react'
import { StyleSheet, ScrollView, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import { headerStyle, colorContainer } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Info from './info'
import Slider from './slider'
import Temples from './temples'
import Store from './store'

export default
@inject(Store)
@withHeader(headerStyle)
@observer
class TinygrailSacrifice extends React.Component {
  static navigationOptions = {
    title: '资产重组'
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  state = {
    refreshing: false
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm(`tinygrail/sacrifice/${$.monoId}`)
  }

  onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      async () => {
        const { $ } = this.context
        await $.refresh()
        setTimeout(() => {
          this.setState({
            refreshing: false
          })
        }, 1200)
      }
    )
  }

  render() {
    const { refreshing } = this.state
    return (
      <ScrollView
        style={[_.container.flex, styles.dark]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      >
        <StatusBarEvents />
        <Info />
        <Slider style={_.mt.sm} />
        <Temples style={_.mt.sm} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor: colorContainer
  }
})
