/*
 * @Author: czy0729
 * @Date: 2019-11-20 17:58:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:28:03
 */
import React from 'react'
import { Alert, View } from 'react-native'
import { Loading, Text } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import StatusBarEvents from '../_/status-bar-events'
import { withHeaderParams } from '../styles'
import ToolBar from './tool-bar'
import Chart from './chart'
import Store from './store'

const title = '资产分析'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/tree', 'TinygrailTree'],
  withHeaderParams
})
@obc
class TinygrailTree extends React.Component {
  componentDidMount() {
    const { $ } = this.context
    $.init()
    this.setParams()
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
            color={_.colorTinygrailPlain}
            onPress={() => {
              t('资产分析.刷新')
              this.onRefresh()
            }}
          />
          <IconHeader
            name='information'
            color={_.colorTinygrailPlain}
            onPress={() => {
              t('资产分析.提醒')
              this.onAlert()
            }}
          />
        </>
      )
    }
    navigation.setParams(params)
  }

  onAlert = () => {
    Alert.alert(
      '小圣杯助手',
      '1. 单击方格展开功能菜单, 长按隐藏方格\n2. 本功能处于实验性阶段, 不保证能正常渲染, 不正常请尝试刷新或者在讨论组等联系作者\n3. 计算的数据只供参考, 不排除会出现不准确丢失的情况\n4. 因角色数量可能导致流量变大, 页面当有缓存数据不会自动刷新, 请点击旁边的按钮刷新\n5. 部分数据可能毫无意义, 只是顺便调出来, 还请自己把握(bgm38)',
      [
        {
          text: '知道了'
        }
      ]
    )
  }

  onRefresh = async () => {
    const { $, navigation } = this.context
    navigation.setParams({
      extra: (
        <>
          <Text style={_.mr.sm} type='tinygrailPlain' size={12}>
            请求中...
          </Text>
          <IconHeader
            name='information'
            color={_.colorTinygrailPlain}
            onPress={this.onAlert}
          />
        </>
      )
    })

    await $.refresh()
    $.generateTreeMap()

    info('已刷新')
    this.setParams()
  }

  onShowMenu = ({ id, name, title }) => {
    if (!id) {
      return
    }

    t('资产分析.人物菜单', {
      key: title,
      id
    })

    const { $, navigation } = this.context
    switch (title) {
      case 'K线':
        navigation.push('TinygrailTrade', {
          monoId: `character/${id}`
        })
        return
      case '买入':
        navigation.push('TinygrailDeal', {
          monoId: `character/${id}`,
          type: 'bid'
        })
        return
      case '卖出':
        navigation.push('TinygrailDeal', {
          monoId: `character/${id}`,
          type: 'ask'
        })
        return
      case '资产重组':
        navigation.push('TinygrailSacrifice', {
          monoId: `character/${id}`
        })
        return
      case '隐藏':
        $.onToggleItem({
          id,
          name
        })
        return
      default:
        navigation.push('Mono', {
          monoId: `character/${id}`,
          _name: name
        })
    }
  }

  render() {
    const { $ } = this.context
    const { loading, caculateType, data } = $.state
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        <ToolBar />
        {loading ? (
          <Loading style={this.styles.container} color={_.colorTinygrailText} />
        ) : (
          <Chart
            data={data}
            caculateType={caculateType}
            isTemple={$.isTemple}
            onPress={this.onShowMenu}
            onLongPress={item => {
              t('资产分析.长按隐藏', {
                id: item.id
              })

              $.onToggleItem(item)
            }}
          />
        )}
      </View>
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
