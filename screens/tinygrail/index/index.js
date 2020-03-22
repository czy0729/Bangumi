/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-19 20:58:01
 */
import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { UM, Flex, Text } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { _ } from '@stores'
import { inject, observer } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { appNavigate } from '@utils/app'
import {
  VERSION_TINYGRAIL_PLUGIN,
  TINYGRAIL_UPDATES_LOGS_URL
} from '@constants'
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
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  state = {
    refreshing: false
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm('tinygrail', 'Tinygrail')
  }

  onRefresh = () =>
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

  alertScience = () => {
    t('小圣杯.跳转', {
      to: 'Topic',
      title: '游戏指南'
    })

    const { navigation } = this.context
    navigation.push('Topic', {
      topicId: 'group/353195'
    })
  }

  alertUpdates = () => {
    t('小圣杯.跳转', {
      to: 'Topic',
      title: '更新内容'
    })

    const { navigation } = this.context
    appNavigate(TINYGRAIL_UPDATES_LOGS_URL, navigation)
  }

  render() {
    const { $ } = this.context
    const { refreshing } = this.state
    return (
      <ScrollView
        style={this.styles.container}
        contentContainerStyle={this.styles.contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      >
        <UM screen={title} />
        <StatusBarEvents />
        <StatusBarPlaceholder style={this.styles.statusBar} />
        <Auth />
        <Menus />
        <Flex justify='center'>
          <Text type='tinygrailText' size={12}>
            - {VERSION_TINYGRAIL_PLUGIN} -
          </Text>
        </Flex>
        <Flex style={_.mt.sm} justify='center'>
          <Text type='tinygrailText' size={12} onPress={this.alertScience}>
            游戏指南
          </Text>
          <Text style={_.ml.md} type='tinygrailText'>
            |
          </Text>
          <Text
            style={_.ml.md}
            type='tinygrailText'
            size={12}
            onPress={this.alertUpdates}
          >
            更新内容
          </Text>
          <Text style={_.ml.md} type='tinygrailText'>
            |
          </Text>
          <Text
            style={_.ml.md}
            type='tinygrailText'
            size={12}
            onPress={$.doSend}
          >
            点我看看
          </Text>
        </Flex>
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
  },
  contentContainerStyle: {
    paddingBottom: _.wind
  },
  statusBar: {
    backgroundColor: _.colorTinygrailContainer
  }
}))
