/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:13:30
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Tabs from '../_/tabs-v2'
import List from './list'
import Store, { tabs } from './store'

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
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={this.styles.container}>
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

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))
