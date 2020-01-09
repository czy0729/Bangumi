/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-09 20:58:08
 */
import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { UM, Text } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { _ } from '@stores'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import StatusBarEvents from '../_/status-bar-events'
import Auth from './auth'
import Menus from './menus'
import Store from './store'

const title = '小圣杯'

export default
@inject(Store)
@observer
class Tinygrail extends React.Component {
  static navigationOptions = {
    header: null
  }

  static contextTypes = {
    $: PropTypes.object
  }

  state = {
    refreshing: false
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm('tinygrail', 'Tinygrail')
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
        <UM screen={title} />
        <StatusBarEvents />
        <StatusBarPlaceholder
          style={{
            backgroundColor: _.colorTinygrailContainer
          }}
        />
        <Auth />
        <Menus />
        <Text
          style={{
            color: _.colorTinygrailText
          }}
          size={10}
          align='center'
        >
          - 1.1 -
        </Text>
      </ScrollView>
    )
  }
}
