/* eslint-disable no-unused-vars */
/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-12 20:32:11
 */
import React from 'react'
import { NavigationEvents } from 'react-navigation'
import { UM } from '@components'
import {
  StatusBarEvents,
  IconTabBar,
  NavigationBarEvents,
  SafeAreaView,
  IconPortal
} from '@screens/_'
import { _, userStore } from '@stores'
import { runAfter } from '@utils'
import { navigationReference } from '@utils/app'
import { inject, obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { androidKeyboardAdjust } from '@utils/ui'
import { IOS } from '@constants'
import CheckLogin from './check-login'
import Header from './header'
import Tab from './tab-wrap'
import Modal from './modal'
import Heatmaps from './heatmaps'
import Store from './store'

const title = '首页'

export default
@inject(Store)
@obc
class Home extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <IconTabBar name='md-star-outline' size={24} color={tintColor} />
    ),
    tabBarLabel: '进度'
  }

  componentDidMount() {
    const { $, navigation } = this.context

    // App生命周期内保存首页的navigation引用
    navigationReference(navigation)
    runAfter(() => {
      $.updateInitialPage(navigation)
      setTimeout(() => {
        const id = userStore.userInfo.username || userStore.myUserId
        t('其他.启动', {
          userId: id,
          device: _.isPad ? 'pad' : 'mobile'
        })
        hm(`?id=${id}`, 'Home')
      }, 6400)
    })

    this.onDidFocus()
  }

  componentWillReceiveProps({ isFocused }) {
    const { $ } = this.context
    $.setState({
      isFocused
    })
  }

  onDidFocus = () => {
    androidKeyboardAdjust('setAdjustPan')

    const { $, navigation } = this.context
    setTimeout(() => {
      if (!$.isLogin) {
        navigation.navigate('Auth')
      }
    }, 1600)
  }

  onDidBlur = () => {
    androidKeyboardAdjust('setAdjustResize')
  }

  render() {
    const { $ } = this.context
    const { isFocused, _loaded } = $.state
    return (
      <SafeAreaView style={IOS ? _.container.bg : _.container._plain}>
        <StatusBarEvents backgroundColor='transparent' />
        <NavigationBarEvents />
        <CheckLogin />
        {$.isLogin && _loaded && (
          <>
            <UM screen={title} />
            <Header />
            <Tab length={$.tabs.length} />
            <Modal />
            {/* {isFocused && (
              <IconPortal index={2} onPress={$.onRefreshThenScrollTop} />
            )} */}
            <NavigationEvents
              onDidFocus={this.onDidFocus}
              onDidBlur={this.onDidBlur}
            />
            <Heatmaps />
          </>
        )}
      </SafeAreaView>
    )
  }
}
