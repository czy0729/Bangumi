/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:55:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-14 06:40:06
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { inject, withHeader } from '@utils/decorators'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import ToolBar from '../_/tool-bar'
import IconGo from '../_/icon-go'
import List from './list'
import Store, { sortDS } from './store'

const title = '英灵殿'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/valhall', 'TinygrailValhall'],
  withHeaderParams
})
@observer
class TinygrailValhall extends React.Component {
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
      extra: <IconGo $={$} />
    })
  }

  renderContentHeaderComponent() {
    const { $ } = this.context
    const { sort, direction } = $.state
    return (
      <ToolBar
        data={sortDS}
        sort={sort}
        direction={direction}
        onSortPress={$.onSortPress}
      />
    )
  }

  render() {
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        {this.renderContentHeaderComponent()}
        <List />
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
