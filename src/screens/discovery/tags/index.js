/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:44:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 00:23:04
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import Tabs from './tabs'
import Store from './store'

const title = '标签'

export default
@inject(Store)
@withHeader({
  screen: title,
  alias: '标签索引',
  hm: ['discovery/tags', 'Tags']
})
@obc
class Tags extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      heatmap: '标签索引.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('标签索引.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open($.url)
              break
            default:
              break
          }
        }
      }
    })
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.plain}>
        {!!_loaded && <Tabs />}
        <Heatmap
          right={_.wind}
          bottom={_.window.height - _.tabsHeaderHeight - 12}
          id='标签索引.标签页切换'
          transparent
        />
      </View>
    )
  }
}
