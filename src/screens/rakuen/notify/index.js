/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:14:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-19 17:21:42
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
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
@observer
class Notify extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
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
      <View style={_.container.screen}>
        {_loaded && <Tabs />}
        <Heatmaps />
      </View>
    )
  }
}
