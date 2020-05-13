/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-23 20:42:22
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { inject, observer } from '@utils/decorators'
import { StatusBarEvents, Loading, UM } from '@components'
import { _ } from '@stores'
import { hm } from '@utils/fetch'
import List from './list'
import Store from './store'

const title = '随便看看'

export default
@inject(Store)
@observer
class Random extends React.Component {
  static navigationOptions = {
    header: null
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm('discovery/random', 'Random')
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.random
    return (
      <View style={_.container.plain}>
        <UM screen={title} />
        <StatusBarEvents backgroundColor='transparent' />
        {_loaded ? <List /> : <Loading style={_.container.screen} />}
      </View>
    )
  }
}
