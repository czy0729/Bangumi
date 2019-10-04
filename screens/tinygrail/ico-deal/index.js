/*
 * @Author: czy0729
 * @Date: 2019-09-20 00:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-22 17:44:13
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
import Initial from './initial'
import Store from './store'

export default
@inject(Store)
@withHeader(headerStyle)
@observer
class TinygrailICODeal extends React.Component {
  static navigationOptions = {
    title: 'ICO'
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

    hm(`tinygrail/ico/deal/${$.monoId}`)
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
        <Initial style={_.mt.md} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor: colorContainer
  }
})
