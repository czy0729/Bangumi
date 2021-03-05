/*
 * @Author: czy0729
 * @Date: 2021-02-28 14:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-05 15:49:27
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { withHeaderParams } from '@tinygrail/styles'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import ToolBar from './tool-bar'
import List from './list'
import Logs from './logs'
import Store from './store'

const title = '通天塔(α)'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/star', 'Star'],
  withHeaderParams
})
@obc
class TinygrailStar extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    return (
      <View style={_.container.tinygrail}>
        <StatusBarEvents />
        <ToolBar />
        <List />
        <Logs />
      </View>
    )
  }
}
