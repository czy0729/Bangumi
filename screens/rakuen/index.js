/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-20 02:40:43
 */
import React from 'react'
import { SafeAreaView } from 'react-navigation'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { IconTabsHeader, IconTabBar } from '@screens/_'
import { inject, withTabsHeader } from '@utils/decorators'
import { HOST } from '@constants'
import _ from '@styles'
import Tabs from './tabs'
import List from './list'
import Store, { tabs } from './store'

export default
@inject(Store)
@withTabsHeader()
@observer
class Rakuen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <IconTabsHeader style={_.ml.sm} name='mail' />,
    headerRight: (
      <IconTabsHeader
        name='add'
        onPress={() => {
          navigation.push('WebView', {
            uri: `${HOST}/rakuen/new_topic`,
            title: '添加新讨论'
          })
        }}
      />
    ),
    tabBarIcon: ({ tintColor }) => (
      <IconTabBar name='planet' color={tintColor} />
    ),
    tabBarLabel: '超展开'
  })

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    // $不能通过contextType传递进去navigation里面, 只能通过下面的方法传递
    withTabsHeader.setTabs(navigation, <Tabs $={$} />)
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    if (!_loaded) {
      return null
    }

    return (
      <SafeAreaView style={_.container.screen} forceInset={{ top: 'never' }}>
        <Tabs $={$} tabBarStyle={withTabsHeader.tabBarStyle}>
          {tabs.map(item => (
            <List key={item.title} type={item.title} />
          ))}
        </Tabs>
      </SafeAreaView>
    )
  }
}
