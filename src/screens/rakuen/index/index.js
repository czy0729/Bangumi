/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-25 17:57:51
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@components'
import {
  OptimizeTabbarTransition,
  HeaderBackground,
  IconTabsHeader,
  IconTabBar,
  SafeAreaView
} from '@screens/_'
import { _ } from '@stores'
import { inject, withTabsHeader, observer } from '@utils/decorators'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import { IOS } from '@constants'
import Prefetch from './prefetch'
import More from './more'
import Tabs from './tabs'
import List from './list'
import Store from './store'

const title = '超展开'

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
      headerLeft: (
        <IconTabsHeader
          name='app'
          onPress={() => {
            if (!$.isWebLogin) {
              info('请先登录')
              return
            }

            t('超展开.跳转', {
              to: 'Mine'
            })

            navigation.push('Mine')
          }}
        />
      ),
      headerRight: (
        <Flex>
          <Prefetch $={$} navigation={navigation} />
          <More style={_.ml.sm} navigation={navigation} />
        </Flex>
      ),
      headerBackground: <HeaderBackground />
    })
  }

  get style() {
    return IOS ? _.container.bg : _.container._plain
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <SafeAreaView style={this.style}>
        {_loaded && (
          <OptimizeTabbarTransition header>
            <Tabs $={$} tabBarStyle={withTabsHeader.tabBarStyle}>
              {$.tabs.map((item, index) => (
                <List key={item._title} index={index} />
              ))}
            </Tabs>
          </OptimizeTabbarTransition>
        )}
      </SafeAreaView>
    )
  }
}
