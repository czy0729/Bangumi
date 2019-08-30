/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-30 23:23:52
 */
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import PropTypes from 'prop-types'
import { StatusBarEvents, IconTabsHeader, IconTabBar } from '@screens/_'
import { open } from '@utils'
import { inject, withTabsHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { HTML_NEW_TIMELINE } from '@constants/html'
import _ from '@styles'
import Tabs from './tabs'
import List from './list'
import Store, { tabs } from './store'

const title = '时间胶囊'

export default
@inject(Store)
@withTabsHeader()
@observer
class Timeline extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <IconTabBar name='time' color={tintColor} />,
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
    withTabsHeader.setTabs(navigation, <Tabs $={$} />)
    navigation.setParams({
      headerRight: (
        <IconTabsHeader
          name='add'
          position='right'
          onPress={() => {
            open(HTML_NEW_TIMELINE($.myUserId))
            // if ($.isWebLogin) {
            //   navigation.push('WebView', {
            //     uri: HTML_NEW_TIMELINE($.myUserId),
            //     title: '添加新时间线'
            //   })
            // } else {
            //   navigation.push('LoginV2')
            // }
          }}
        />
      )
    })

    hm('timeline', title)
  }

  render() {
    const { $ } = this.context
    const { scope, _loaded } = $.state
    if (!_loaded) {
      return <View style={_.container.screen} />
    }

    return (
      <SafeAreaView style={_.container.screen} forceInset={{ top: 'never' }}>
        <StatusBarEvents />
        <Tabs $={$} tabBarStyle={withTabsHeader.tabBarStyle}>
          {tabs.map(item => (
            <List key={item.title} title={item.title} scope={scope} />
          ))}
        </Tabs>
      </SafeAreaView>
    )
  }
}
