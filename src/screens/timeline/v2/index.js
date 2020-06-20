/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-17 23:33:39
 */
import React from 'react'
import PropTypes from 'prop-types'
import { UM, Text } from '@components'
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

const title = '时间胶囊'

export default
@inject(Store)
@observer
class Timeline extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => <IconTabBar name='time' color={tintColor} />,
    tabBarLabel: title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
    hm('timeline', 'Timeline')
  }

  get style() {
    return IOS ? _.container.bg : _.container._plain
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
