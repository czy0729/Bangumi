/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:01:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-11 19:22:37
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Tabs } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader } from '@utils/decorators'
import { t } from '@utils/fetch'
import List from './list'
import TabBarLeft from './tab-bar-left'
import Store from './store'

const title = '索引'
const renderTabBarLeft = <TabBarLeft />

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['browser', 'Browser']
})
@observer
class Browser extends React.Component {
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

  get tabs() {
    const { $ } = this.context
    const { tabs } = $.state
    return tabs.map(item => ({
      title: item,
      key: item
    }))
  }

  render() {
    const { $ } = this.context
    const { page, _loaded } = $.state
    return (
      <View style={_.container.screen}>
        {!!_loaded && (
          <Tabs
            tabs={this.tabs}
            initialPage={page}
            page={page}
            prerenderingSiblingsNumber={1}
            animated={false}
            renderTabBarLeft={renderTabBarLeft}
            onChange={$.onChange}
          >
            {this.tabs.map(item => (
              <List key={item.key} airtime={item.key} />
            ))}
          </Tabs>
        )}
      </View>
    )
  }
}
