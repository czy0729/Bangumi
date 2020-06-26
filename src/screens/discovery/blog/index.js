/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:02:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-26 17:04:47
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import Tabs from './tabs'
import List from './list'
import Store, { tabs } from './store'

const title = '日志'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['discovery/blog', 'DiscoveryBlog']
})
@observer
class DiscoveryBlog extends React.Component {
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
          t('全站日志.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open('https://bgm.tv/blog')
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
      <View style={_.container.bg}>
        {!!_loaded && (
          <Tabs tabs={tabs}>
            {tabs.map(item => (
              <List key={item.key} type={item.key} />
            ))}
          </Tabs>
        )}
      </View>
    )
  }
}
