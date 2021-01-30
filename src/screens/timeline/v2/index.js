/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 14:03:18
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
import Heatmaps from './heatmaps'
import Store from './store'

const title = '时间胶囊'

export default
@inject(Store)
@obc
class Timeline extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => <IconTabBar color={tintColor} name='time' />,
    tabBarLabel: title
  }

  componentDidMount() {
    runAfter(() => {
      const { $ } = this.context
      $.init()
      hm('timeline', 'Timeline')
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
      <SafeAreaView style={IOS ? _.container.bg : _.container._plain}>
        <StatusBarEvents backgroundColor='transparent' />
        <NavigationBarEvents />
        {_loaded && (
          <>
            <UM screen={title} />
            <Header />
            <Tab />
            {isFocused && (
              <IconPortal index={1} onPress={$.onRefreshThenScrollTop} />
            )}
            <Heatmaps />
          </>
        )}
      </SafeAreaView>
    )
  }
}
