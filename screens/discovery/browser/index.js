/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:01:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-01 20:50:51
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Tabs } from '@components'
import { _ } from '@stores'
import { inject, withHeader } from '@utils/decorators'
import List from './list'
import TabBarLeft from './tab-bar-left'
import Store from './store'

const title = '索引'

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
    const { $ } = this.context
    $.init()
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
            renderTabBarLeft={<TabBarLeft />}
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
