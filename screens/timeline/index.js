/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 17:37:30
 */
import React from 'react'
import { SafeAreaView } from 'react-navigation'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { IconTabBar } from '@screens/_'
import injectWithTabsHeader from '@utils/decorators/injectWithTabsHeader'
import _ from '@styles'
import Tabs from './tabs'
import List from './list'
import Store, { tabs } from './store'

class Timeline extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <IconTabBar name='time' tintColor={tintColor} />
    ),
    tabBarLabel: '时间胶囊'
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    // $不能通过contextType传递进去navigation里面, 只能通过下面的方法传递
    navigation.setParams({
      headerTabs: <Tabs $={$} />
    })
  }

  render() {
    const { $ } = this.context
    const { scope, _loaded } = $.state
    if (!_loaded) {
      return null
    }

    return (
      <SafeAreaView style={_.container.screen} forceInset={{ top: 'never' }}>
        <Tabs
          $={$}
          tabBarStyle={{
            display: 'none'
          }}
        >
          {tabs.map(item => (
            <List key={item.title} title={item.title} scope={scope} />
          ))}
        </Tabs>
      </SafeAreaView>
    )
  }
}

export default injectWithTabsHeader(Store)(observer(Timeline))
