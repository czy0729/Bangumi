/*
 * @Author: czy0729
 * @Date: 2019-11-20 17:58:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-26 21:04:35
 */
import React from 'react'
import { StyleSheet, Alert, View } from 'react-native'
import PropTypes from 'prop-types'
import { Modal } from '@ant-design/react-native'
import { Loading, Text } from '@components'
import { IconHeader } from '@screens/_'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { info } from '@utils/ui'
import _ from '@styles'
import StatusBarEvents from '../_/status-bar-events'
import { headerStyle, colorContainer, colorText } from '../styles'
import ToolBar from './tool-bar'
import Chart from './chart'
import Store from './store'

const title = '资产分析'

export default
@inject(Store)
@withHeader({
  screen: title,
  ...headerStyle
})
@observer
class TinygrailTree extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    this.setParams()
    hm('tinygrail/tree', 'TinygrailTree')
  }

  setParams = () => {
    const { navigation, $ } = this.context
    const { name } = $.params
    const params = {
      title: name || '资产分析',
      extra: (
        <>
          <IconHeader
            name='refresh'
            color={colorText}
            onPress={this.onRefresh}
          />
          <IconHeader
            name='information'
            color={colorText}
            onPress={this.onAlert}
          />
        </>
      )
    }
    navigation.setParams(params)
  }

  onAlert = () => {
    Alert.alert(
      '小圣杯助手',
      '1. 长按方格展开功能菜单\n2. 本功能处于实验性阶段, 不保证能正常渲染, 不正常请尝试刷新或者在讨论组等联系作者\n3. 计算的数据只供参考, 不排除会出现不准确丢失的情况\n4. 因角色数量可能导致流量变大, 页面当有缓存数据不会自动刷新, 请点击旁边的按钮刷新\n5. 部分数据可能毫无意义, 只是顺便调出来, 还请自己把握(bgm38)',
      [
        {
          text: '确定'
        }
      ]
    )
  }

  onRefresh = async () => {
    const { $, navigation } = this.context
    navigation.setParams({
      extra: (
        <>
          <Text
            style={[
              _.mr.sm,
              {
                color: colorText
              }
            ]}
            size={12}
          >
            请求中...
          </Text>
          <IconHeader
            name='information'
            color={colorText}
            onPress={this.onAlert}
          />
        </>
      )
    })

    await $.refresh()
    info('已刷新')
    this.setParams()
  }

  onLongPress = ({ id, name }) => {
    if (!id) {
      return
    }

    const { navigation } = this.context
    const data = [
      {
        text: <Text>{name}</Text>,
        onPress: () =>
          navigation.push('Mono', {
            monoId: `character/${id}`
          })
      },
      {
        text: <Text>K线</Text>,
        onPress: () =>
          navigation.push('TinygrailTrade', {
            monoId: `character/${id}`
          })
      },
      {
        text: <Text>买入</Text>,
        onPress: () =>
          navigation.push('TinygrailDeal', {
            monoId: `character/${id}`,
            type: 'bid'
          })
      },
      {
        text: <Text>卖出</Text>,
        onPress: () =>
          navigation.push('TinygrailDeal', {
            monoId: `character/${id}`,
            type: 'ask'
          })
      },
      {
        text: <Text>资产重组</Text>,
        onPress: () =>
          navigation.push('TinygrailSacrifice', {
            monoId: `character/${id}`
          })
      }
    ]
    Modal.operation(data)
  }

  render() {
    const { $ } = this.context
    const { loading, caculateType, data } = $.state
    return (
      <View style={styles.container}>
        <StatusBarEvents />
        <ToolBar />
        {loading ? (
          <Loading style={styles.container} />
        ) : (
          <Chart
            data={data}
            caculateType={caculateType}
            isTemple={$.isTemple}
            onPress={$.onToggleItem}
            onLongPress={this.onLongPress}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorContainer
  }
})
