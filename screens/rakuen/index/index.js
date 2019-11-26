/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-26 20:55:59
 */
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { Popover, IconTabsHeader, IconTabBar, IconNotify } from '@screens/_'
import { open } from '@utils'
import { inject, withTabsHeader } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { HTML_NEW_TOPIC } from '@constants/html'
import _ from '@styles'
import Prefetch from './prefetch'
import Tabs from './tabs'
import List from './list'
import Store from './store'

const title = '超展开'

export default
@inject(Store)
@withTabsHeader({
  screen: title
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

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    // $不能通过contextType传递进去navigation里面, 只能通过下面的方法传递
    withTabsHeader.setTabs(navigation, <Tabs $={$} />)

    navigation.setParams({
      headerLeft: <IconNotify navigation={navigation} />,
      headerRight: (
        <Flex>
          <Prefetch $={$} />
          <Popover
            style={_.ml.sm}
            data={['设置', '新讨论', '社区指导原则']}
            onSelect={title => {
              switch (title) {
                case '设置':
                  navigation.push('RakuenSetting')
                  break
                case '新讨论':
                  open(HTML_NEW_TOPIC())
                  break
                case '社区指导原则':
                  navigation.push('UGCAgree')
                  break
                default:
                  break
              }
            }}
          >
            <IconTabsHeader name='more' position='right' />
          </Popover>
        </Flex>
      )
    })

    hm('rakuen', 'Rakuen')
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    if (!_loaded) {
      return <View style={_.container.screen} />
    }

    return (
      <SafeAreaView style={_.container.screen} forceInset={{ top: 'never' }}>
        <Tabs $={$} tabBarStyle={withTabsHeader.tabBarStyle}>
          {$.tabs.map((item, index) => (
            <List key={item._title} index={index} />
          ))}
        </Tabs>
      </SafeAreaView>
    )
  }
}
