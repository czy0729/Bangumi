/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-26 15:37:50
 */
import React from 'react'
import PropTypes from 'prop-types'
import { UM } from '@components'
import {
  IconTabBar,
  SafeAreaView,
  StatusBarEvents,
  NavigationBarEvents
} from '@screens/_'
import { _ } from '@stores'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { IOS } from '@constants'
import Header from './header'
import Tab from './tab'
import Store from './store'

const title = '超展开'

export default
@inject(Store)
@observer
class Rakuen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <IconTabBar name='planet' color={tintColor} />
    ),
    tabBarLabel: title
  }

  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
    hm('rakuen', 'Rakuen')
  }

  get style() {
    return IOS ? _.container.plain : _.container._plain
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <SafeAreaView style={this.style}>
        <UM screen={title} />
        <StatusBarEvents backgroundColor='transparent' />
        <NavigationBarEvents />
        {_loaded && (
          <>
            <Header />
            <Tab />
          </>
        )}
      </SafeAreaView>
    )
  }
}
