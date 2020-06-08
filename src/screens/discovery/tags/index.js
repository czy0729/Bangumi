/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:44:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 20:09:45
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

const title = '标签'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['discovery/tags', 'Tags']
})
@observer
class Tags extends React.Component {
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
      <View style={_.container.bg}>
        {!!_loaded && (
          <Tabs tabs={tabs}>
            {tabs.map((item, index) => (
              <List key={item.key} index={index} />
            ))}
          </Tabs>
        )}
      </View>
    )
  }
}
