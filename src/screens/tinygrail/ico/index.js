/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-12 17:37:53
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { withHeaderParams } from '@tinygrail/styles'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import Tabs from '@tinygrail/_/tabs-v2'
import List from './list'
import Store from './store'
import { tabs } from './ds'

const title = 'ICO榜单'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/ico', 'TinygrailICO'],
  withHeaderParams
})
@obc
class TinygrailICO extends React.Component {
  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.tinygrail}>
        <StatusBarEvents />
        {!!_loaded && (
          <Tabs
            routes={tabs}
            renderItem={item => <List key={item.key} id={item.key} />}
          />
        )}
      </View>
    )
  }
}
