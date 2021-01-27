/*
 * @Author: czy0729
 * @Date: 2019-09-20 00:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:14:13
 */
import React from 'react'
import { RefreshControl } from 'react-native'
import { ScrollView } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { withHeaderParams } from '../styles'
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
  withHeaderParams
})
@obc
class TinygrailICODeal extends React.Component {
  static navigationOptions = {
    title
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
        style={this.styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
        scrollToTop
      >
        <StatusBarEvents />
        <Info />
        <Slider style={_.mt.sm} />
        <Initial style={_.mt.md} />
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))
