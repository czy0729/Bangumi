/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-25 01:51:08
 */
import React from 'react'
import { Loading } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTML_CALENDAR } from '@constants/html'
import IconLayout from './icon-layout'
import List from './list'
import Store from './store'

const title = '每日放送'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['calendar', 'Calendar']
})
@obc
class Calendar extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: <IconLayout $={$} />,
      heatmap: '每日放送.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('每日放送.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open(HTML_CALENDAR())
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
    const { _loaded } = $.calendar
    if (!_loaded) {
      return <Loading style={_.container.plain} />
    }
    return <List />
  }
}
