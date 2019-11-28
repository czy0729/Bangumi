/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:46:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-28 15:58:29
 */
import React from 'react'
import { StyleSheet, ScrollView, View, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, UM } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import { colorContainer } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Header from './header'
import Form from './form'
import Depth from './depth'
import Logs from './logs'
import Records from './records'
import Store from './store'

const title = '交易'

export default
@inject(Store)
@observer
class TinygrailDeal extends React.Component {
  static navigationOptions = {
    header: null
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  state = {
    refreshing: false
  }

  async componentDidMount() {
    const { $ } = this.context
    await $.init()

    hm(`tinygrail/deal/${$.monoId}`, 'TinygrailDeal')
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
      <View style={[_.container.flex, styles.dark]}>
        <UM screen={title} />
        <StatusBarEvents />
        <StatusBarPlaceholder style={styles.dark} />
        <Header />
        <ScrollView
          style={[_.container.flex, styles.dark]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <Flex align='start'>
            <Flex.Item>
              <Form />
            </Flex.Item>
            <View
              style={[
                _.ml.wind,
                {
                  width: 160
                }
              ]}
            >
              <Depth />
            </View>
          </Flex>
          <Logs />
          <Records />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor: colorContainer
  }
})
