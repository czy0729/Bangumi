/*
 * @Author: czy0729
 * @Date: 2020-10-29 20:48:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-29 22:05:17
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

const title = '关联角色'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/relation', 'TinygrailRelation'],
  withHeaderParams
})
@observer
class TinygrailRelation extends React.Component {
  static navigationOptions = {
    title
  }

  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params
    return {
      title: name || title
    }
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
    const { level, sort, direction } = $.state
    return (
      <ToolBar
        data={sortDS}
        level={level}
        sort={sort}
        direction={direction}
        onLevelSelect={$.onLevelSelect}
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
