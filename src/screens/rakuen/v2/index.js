/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:03:05
 */
import React from 'react'
import { UM } from '@components'
import {
  SafeAreaView,
  StatusBarEvents,
  NavigationBarEvents,
  IconTabBar,
  IconPortal
} from '@screens/_'
import { _ } from '@stores'
import { runAfter } from '@utils'
import { inject, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { IOS } from '@constants'
import Header from './header'
import Tab from './tab'
import Heatmaps from './heapmaps'
import Store from './store'

const title = '超展开'

export default
@inject(Store)
@obc
class Rakuen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <IconTabBar name='planet' color={tintColor} />
    ),
    tabBarLabel: title
  }

  componentDidMount() {
    const { $ } = this.context
    runAfter(() => {
      $.init()
      hm('rakuen', 'Rakuen')
    })
  }

  componentWillReceiveProps({ isFocused }) {
    const { $ } = this.context
    $.setState({
      isFocused
    })
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    const { isFocused } = this.props
    return (
      <SafeAreaView style={IOS ? _.container.plain : _.container._plain}>
        <StatusBarEvents backgroundColor='transparent' />
        <NavigationBarEvents />
        {_loaded && (
          <>
            <UM screen={title} />
            <Header />
            <Tab />
            {isFocused && (
              <IconPortal index={3} onPress={$.onRefreshThenScrollTop} />
            )}
            <Heatmaps />
          </>
        )}
      </SafeAreaView>
    )
  }
}
