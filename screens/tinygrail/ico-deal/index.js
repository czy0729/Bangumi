/*
 * @Author: czy0729
 * @Date: 2019-09-20 00:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 17:52:14
 */
import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { headerStyle } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Info from './info'
import Slider from './slider'
import Initial from './initial'
import Store from './store'

const title = 'ICO'

export default
@inject(Store)
@withHeader({
  screen: title,
  ...headerStyle
})
@observer
class TinygrailICODeal extends React.Component {
  static navigationOptions = {
    title
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

    hm(`tinygrail/ico/deal/${$.monoId}`, 'TinygrailICODeal')
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
        style={[
          _.container.flex,
          {
            backgroundColor: _.colorTinygrailContainer
          }
        ]}
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
