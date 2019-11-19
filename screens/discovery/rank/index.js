/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-19 17:24:03
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'

export default
@inject(Store)
@withHeader()
@observer
class Rank extends React.Component {
  static navigationOptions = {
    title: '排行榜'
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    const url = $.updateNavigationParams(navigation)
    hm(url, 'Rank')
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    if (!_loaded) {
      return null
    }
    return (
      <View style={_.container.screen}>
        <ToolBar />
        <List />
      </View>
    )
  }
}
