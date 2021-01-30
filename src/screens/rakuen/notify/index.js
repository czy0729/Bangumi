/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:14:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 04:05:37
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTML_NOTIFY } from '@constants/html'
import Tabs from './tabs'
import Heatmaps from './heatmaps'
import Store from './store'

const title = '电波提醒'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['notify/all', 'Notify']
})
@obc
class Notify extends React.Component {
  static navigationOptions = {
    title
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    navigation.setParams({
      heatmap: '电波提醒.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('电波提醒.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open(HTML_NOTIFY())
              break

            default:
              break
          }
        }
      }
    })

    await $.init()
    $.doClearNotify()
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.plain}>
        {_loaded && <Tabs />}
        <Heatmaps />
      </View>
    )
  }
}
