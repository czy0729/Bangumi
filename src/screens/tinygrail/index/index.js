/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:15:40
 */
import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import { UM, Flex, Text } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { appNavigate } from '@utils/app'
import {
  VERSION_TINYGRAIL_PLUGIN,
  TINYGRAIL_UPDATES_LOGS_URL
} from '@constants'
import StatusBarEvents from '../_/status-bar-events'
import Auth from './auth'
import Menus from './menus'
import BonusModal from './bonus-modal'
import Store from './store'

const title = '小圣杯'

export default
@inject(Store)
@obc
class Tinygrail extends React.Component {
  static navigationOptions = {
    header: null
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
      topicId: 'group/358232'
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

  toGroup = () => {
    t('小圣杯.跳转', {
      to: 'Group',
      title: '小组讨论 '
    })

    const { navigation } = this.context
    navigation.push('Group', {
      groupId: 'tinygrail'
    })
  }

  render() {
    const { $ } = this.context
    const { visible } = $.state
    const { refreshing } = this.state
    return (
      <>
        <ScrollView
          style={this.styles.container}
          contentContainerStyle={this.styles.contentContainerStyle}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <UM screen={title} />
          <StatusBarEvents backgroundColor='transparent' />
          <StatusBarPlaceholder />
          <Auth />
          <Menus />
          <Flex style={_.mt.sm} justify='center'>
            <Text type='tinygrailText' size={12} onPress={this.alertUpdates}>
              {VERSION_TINYGRAIL_PLUGIN} 更新内容
            </Text>
            <Text style={_.ml.sm} type='tinygrailText'>
              ·
            </Text>
            <Text
              style={_.ml.sm}
              type='tinygrailText'
              size={12}
              onPress={this.alertScience}
            >
              游戏wiki
            </Text>
            <Text style={_.ml.sm} type='tinygrailText'>
              ·
            </Text>
            <Text
              style={_.ml.sm}
              type='tinygrailText'
              size={12}
              onPress={this.toGroup}
            >
              小组讨论
            </Text>
            <Text style={_.ml.sm} type='tinygrailText'>
              ·
            </Text>
            <Text
              style={_.ml.sm}
              type='tinygrailText'
              size={12}
              onPress={$.doSend}
            >
              点我看看
            </Text>
          </Flex>
        </ScrollView>
        <BonusModal visible={visible} />
      </>
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
    paddingBottom: _.md
  }
}))
