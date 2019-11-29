/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:55:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-29 21:58:40
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { inject, withHeader } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import { headerStyle, colorContainer } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import ToolBar from '../_/tool-bar'
import List from './list'
import Store, { sortDS } from './store'

const title = '英灵殿'

export default
@inject(Store)
@withHeader({
  screen: title,
  ...headerStyle
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
    const { $ } = this.context
    $.init()

    hm('tinygrail/valhall', 'TinygrailValhall')
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
      <View
        style={[
          _.container.flex,
          {
            backgroundColor: colorContainer
          }
        ]}
      >
        <StatusBarEvents />
        {this.renderContentHeaderComponent()}
        <List />
      </View>
    )
  }
}
