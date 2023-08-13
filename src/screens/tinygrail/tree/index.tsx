/*
 * @Author: czy0729
 * @Date: 2019-11-20 17:58:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-14 05:13:36
 */
import React from 'react'
import { Header, Page, Flex, Loading, Text } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { alert, info } from '@utils'
import { inject, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import i18n from '@constants/i18n'
import ToolBar from './tool-bar'
import Chart from './chart'
import Store from './store'
import { Ctx } from './types'

class TinygrailTree extends React.Component {
  state = {
    refreshing: false
  }

  componentDidMount() {
    const { $ } = this.context as Ctx
    $.init()
  }

  onAlert = () => {
    alert(
      // eslint-disable-next-line max-len
      `1. 单击方格展开功能菜单, 长按隐藏方格\n2. 本功能处于实验性阶段, 不保证能正常渲染, 不正常请尝试刷新或者在讨论组等${i18n.contact()}作者\n3. 计算的数据只供参考, 不排除会出现不准确丢失的情况\n4. 因角色数量可能导致流量变大, 页面当有缓存数据不会自动刷新, 请点击旁边的按钮刷新\n5. 部分数据可能毫无意义, 只是顺便调出来, 还请自己把握(bgm38)`,
      '小圣杯助手'
    )
  }

  onRefresh = async () => {
    const { $ } = this.context as Ctx
    this.setState({
      refreshing: true
    })

    await $.refresh()
    $.generateTreeMap()

    info('已刷新')
    this.setState({
      refreshing: false
    })
  }

  onShowMenu = ({ id, name, title }) => {
    if (!id) return

    t('资产分析.人物菜单', {
      key: title,
      id
    })

    const { $, navigation } = this.context as Ctx
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
    const { $ } = this.context as Ctx
    const { loading, caculateType, data } = $.state
    const { refreshing } = this.state
    return (
      <>
        <Header
          title={$.params?.name || '资产分析'}
          alias='资产分析'
          hm={['tinygrail/tree', 'TinygrailTree']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => (
            <Flex>
              {refreshing ? (
                <Text style={_.mr.sm} type='tinygrailPlain' size={12}>
                  请求中...
                </Text>
              ) : (
                <IconHeader
                  style={_.mr.sm}
                  name='md-refresh'
                  color={_.colorTinygrailPlain}
                  size={22}
                  onPress={() => {
                    t('资产分析.刷新')
                    this.onRefresh()
                  }}
                />
              )}
              <IconHeader
                name='md-info-outline'
                color={_.colorTinygrailPlain}
                onPress={() => {
                  t('资产分析.提醒')
                  this.onAlert()
                }}
              />
            </Flex>
          )}
        />
        <Page style={_.container.tinygrail}>
          <ToolBar style={_.mt._sm} />
          {loading ? (
            <Loading style={_.container.tinygrail} color={_.colorTinygrailText} />
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
        </Page>
      </>
    )
  }
}

export default inject(Store)(obc(TinygrailTree))
