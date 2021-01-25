/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:01:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-25 02:26:53
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import IconLayout from './icon-layout'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'

const title = '索引'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['browser', 'Browser']
})
@obc
class Browser extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      heatmap: '索引.右上角菜单',
      extra: <IconLayout $={$} />,
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('索引.右上角菜单', {
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
        <ToolBar />
        {_loaded && <List />}
      </View>
    )
  }
}
