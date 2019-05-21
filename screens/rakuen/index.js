/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-21 14:50:16
 */
import React from 'react'
import { SafeAreaView } from 'react-navigation'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { IconTabsHeader, IconTabBar } from '@screens/_'
import { inject, withTabsHeader } from '@utils/decorators'
import { HTML_NEW_TOPIC } from '@constants/html'
import _ from '@styles'
import Tabs from './tabs'
import Notify from './notify'
import List from './list'
import Store, { tabs } from './store'

export default
@inject(Store)
@withTabsHeader()
@observer
class Rakuen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <IconTabsHeader
        name='add'
        onPress={() => {
          navigation.push('WebView', {
            uri: HTML_NEW_TOPIC(),
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
    navigation.setParams({
      headerLeft: $.notifyUnread ? (
        <Notify navigation={navigation} />
      ) : (
        <IconTabsHeader
          style={_.ml.sm}
          name='mail'
          onPress={() => {
            navigation.push('Notify')
          }}
        />
      )
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
        <Tabs $={$} tabBarStyle={withTabsHeader.tabBarStyle}>
          {tabs.map(item => (
            <List key={item.title} type={item.title} />
          ))}
        </Tabs>
      </SafeAreaView>
    )
  }
}
