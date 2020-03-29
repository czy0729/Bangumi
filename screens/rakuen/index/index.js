/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-29 14:28:06
 */
import React from 'react'
import { SafeAreaView } from 'react-navigation'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { IconTabBar, IconNotify, HeaderBackground } from '@screens/_'
import { _ } from '@stores'
import { inject, withTabsHeader } from '@utils/decorators'
import Prefetch from './prefetch'
import More from './more'
import Tabs from './tabs'
import List from './list'
import Store from './store'

const title = '超展开'
const forceInset = {
  top: 'never'
}
const event = {
  id: '超展开.跳转'
}

export default
@inject(Store)
@withTabsHeader({
  screen: title,
  hm: ['rakuen', 'Rakuen']
})
@observer
class Rakuen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <IconTabBar name='planet' color={tintColor} />
    ),
    tabBarLabel: title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    // $不能通过contextType传递进去navigation里面, 只能通过下面的方法传递
    withTabsHeader.setTabs(navigation, <Tabs $={$} />)
    navigation.setParams({
      headerLeft: <IconNotify navigation={navigation} event={event} />,
      headerRight: (
        <Flex>
          <Prefetch $={$} navigation={navigation} />
          <More style={_.ml.sm} navigation={navigation} />
        </Flex>
      ),
      headerBackground: <HeaderBackground />
    })
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <SafeAreaView style={_.container.screen} forceInset={forceInset}>
        {_loaded && (
          <Tabs $={$} tabBarStyle={withTabsHeader.tabBarStyle}>
            {$.tabs.map((item, index) => (
              <List key={item._title} index={index} />
            ))}
          </Tabs>
        )}
      </SafeAreaView>
    )
  }
}
