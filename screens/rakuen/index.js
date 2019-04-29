/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 17:16:24
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

class Rakuen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <IconTabBar name='planet' tintColor={tintColor} />
    ),
    tabBarLabel: '超展开'
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
    const { _loaded } = $.state
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
            <List key={item.title} type={item.title} />
          ))}
        </Tabs>
      </SafeAreaView>
    )
  }
}

export default injectWithTabsHeader(Store)(observer(Rakuen))
