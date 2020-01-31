/* eslint-disable no-trailing-spaces */
/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-31 20:27:25
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

  alertScience = () => {
    const { navigation } = this.context
    navigation.push('Topic', {
      topicId: 'group/353195'
    })
  }

  alertUpdates = () =>
    Alert.alert(
      '小圣杯助手v1.2.0',
      // '1. [高级分析] 全网卖一推荐\n2. [高级分析] 持仓买一推荐\n3. [高级分析] 竞拍推荐\n4. 列表项右侧的状态快捷预览点击切换时, 所有都会同时切换\n5. 列表二次排序增加股息比和等级\n6. 修复了拍卖点击人物进入错误页面的问题\n7. 自己圣殿的排最前',
      '1. [交易] 删除出价100的限制\n2. [资产重组] 圣殿折叠\n3. [资产重组] 可以看见当前竞拍状态\n4. [资金分析] 更新股息算法\n5. [高级分析] 计算优化, 整合圣殿股息\n6. [高级分析] 新增献祭推荐\n7. [最新圣殿] 可以加载更多\n8. 列表添加圣殿股息排序\n9. 角色页面可以复制bgm链接',
      [
        {
          text: '知道了'
        }
      ]
    )

  render() {
    const { $ } = this.context
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
          >
            - 1.2.0 -
          </Text>
        </Flex>
        <Flex style={_.mt.sm} justify='center'>
          <Text
            style={{
              color: _.colorTinygrailText
            }}
            size={12}
            onPress={this.alertScience}
          >
            游戏指南
          </Text>
          <Text
            style={[
              _.ml.md,
              {
                color: _.colorTinygrailText
              }
            ]}
          >
            |
          </Text>
          <Text
            style={[
              _.ml.md,
              {
                color: _.colorTinygrailText
              }
            ]}
            size={12}
            onPress={this.alertUpdates}
          >
            更新内容
          </Text>
          <Text
            style={[
              _.ml.md,
              {
                color: _.colorTinygrailText
              }
            ]}
          >
            |
          </Text>
          <Text
            style={[
              _.ml.md,
              {
                color: _.colorTinygrailText
              }
            ]}
            size={12}
            onPress={$.doSend}
          >
            新年快乐
          </Text>
        </Flex>
      </ScrollView>
    )
  }
}
