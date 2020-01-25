/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-24 21:14:47
 */
import React from 'react'
import { Alert, ScrollView, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { UM, Flex, Text } from '@components'
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

  alertUpdates = () => {
    Alert.alert(
      '小圣杯助手',
      '1. [高级分析] 全网卖一推荐\n2. [高级分析] 持仓买一推荐\n3. [高级分析] 竞拍推荐\n4. 列表项右侧的状态快捷预览点击切换时, 所有都会同时切换\n5. 列表二次排序增加股息比和等级\n6. 修复了拍卖点击人物进入错误页面的问题\n7. 自己圣殿的排最前',
      [
        {
          text: '知道了'
        }
      ]
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
        <Flex justify='center'>
          <Text
            style={{
              color: _.colorTinygrailText
            }}
            size={12}
            align='center'
            onPress={this.alertUpdates}
          >
            - 1.2.0 - [更新内容]
          </Text>
        </Flex>
      </ScrollView>
    )
  }
}
