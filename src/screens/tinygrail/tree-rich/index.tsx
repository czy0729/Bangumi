/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:28:52
 */
import React from 'react'
import { Header, Loading, Page, Text } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { info } from '@utils'
import { inject, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import Chart from './chart'
import Store from './store'
import ToolBar from './tool-bar'
import { Ctx } from './types'

/** 前百首富 */
class TinygrailTree extends React.Component {
  state = {
    refreshing: false
  }

  componentDidMount() {
    const { $ } = this.context as Ctx
    $.init()
  }

  onRefresh = async () => {
    const { $ } = this.context as Ctx
    this.setState({
      refreshing: true
    })

    await $.fetchRich()
    $.generateTreeMap()

    info('已刷新')
    this.setState({
      refreshing: false
    })
  }

  onShowMenu = ({ id, name, title }) => {
    if (!id) return

    t('前百首富.人物菜单', {
      key: title,
      id
    })

    const { $, navigation } = this.context as Ctx
    switch (title) {
      case '资产分析':
        navigation.push('TinygrailTree', {
          userName: id,
          name
        })
        return

      case '隐藏':
        $.onToggleItem({
          id,
          name
        })
        return

      default:
        navigation.push('Zone', {
          userId: id
        })
    }
  }

  render() {
    const { $ } = this.context as Ctx
    const { refreshing } = this.state
    const { loading, data } = $.state
    return (
      <>
        <Header
          title='前百首富'
          hm={['tinygrail/tree-rich', 'TinygrailTreeRich']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() =>
            refreshing ? (
              <Text style={_.mr.xs} type='tinygrailPlain' size={12}>
                请求中...
              </Text>
            ) : (
              <IconHeader
                style={_.mr.xs}
                name='md-refresh'
                size={22}
                color={_.colorTinygrailPlain}
                onPress={() => {
                  t('前百首富.刷新')
                  this.onRefresh()
                }}
              />
            )
          }
        />
        <Page style={_.container.tinygrail}>
          <ToolBar />
          {loading ? (
            <Loading style={_.container.tinygrail} color={_.colorTinygrailText} />
          ) : (
            <Chart
              data={data}
              onPress={this.onShowMenu}
              onLongPress={item => {
                t('前百首富.长按隐藏', {
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
