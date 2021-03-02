/*
 * @Author: czy0729
 * @Date: 2021-02-28 14:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-02 19:36:25
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
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
      <View style={this.styles.container}>
        <StatusBarEvents />
        <ToolBar />
        <List />
        <Logs />
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
