/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-20 01:21:32
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Loading, Text } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import StatusBarEvents from '../_/status-bar-events'
import { withHeaderParams } from '../styles'
import ToolBar from './tool-bar'
import Chart from './chart'
import Store from './store'

const title = '前百首富'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/tree-rich', 'TinygrailTreeRich'],
  withHeaderParams
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
  }

  setParams = () => {
    const { navigation } = this.context
    const params = {
      title,
      extra: (
        <IconHeader
          name='refresh'
          color={_.colorTinygrailPlain}
          onPress={() => {
            t('前百首富.刷新')
            this.onRefresh()
          }}
        />
      )
    }
    navigation.setParams(params)
  }

  onRefresh = async () => {
    const { $, navigation } = this.context
    navigation.setParams({
      extra: (
        <Text style={_.mr.sm} type='tinygrailPlain' size={12}>
          请求中...
        </Text>
      )
    })

    await $.fetchRich()
    $.generateTreeMap()

    info('已刷新')
    this.setParams()
  }

  onShowMenu = ({ id, name, title }) => {
    if (!id) {
      return
    }

    t('前百首富.人物菜单', {
      key: title,
      id
    })

    const { $, navigation } = this.context
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
    const { $ } = this.context
    const { loading, caculateType, data } = $.state
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        <ToolBar />
        {loading ? (
          <Loading style={this.styles.container} />
        ) : (
          <Chart
            data={data}
            caculateType={caculateType}
            onPress={this.onShowMenu}
            onLongPress={item => {
              t('前百首富.长按隐藏', {
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
