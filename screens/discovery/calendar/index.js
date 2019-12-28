/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-19 20:52:30
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { HTML_CALENDAR } from '@constants/html'
import List from './list'
import Store from './store'

const title = '每日放送'

export default
@inject(Store)
@withHeader({
  screen: title
})
@observer
class Calendar extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
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

    hm('calendar', 'Calendar')
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.calendar
    if (!_loaded) {
      return (
        <Loading style={_.select(_.container.content, _.container.screen)} />
      )
    }
    return <List />
  }
}
