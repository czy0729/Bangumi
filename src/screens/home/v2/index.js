/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 00:40:39
 */
import React from 'react'
import { BackHandler } from 'react-native'
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
import { info } from '@utils/ui'
import { navigationReference } from '@utils/app'
import { inject, obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { IOS } from '@constants'
import { MODEL_SETTING_INITIAL_PAGE } from '@constants/model'
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
    tabBarIcon: ({ tintColor }) => <IconTabBar name='star' color={tintColor} />,
    tabBarLabel: '进度'
  }

  componentDidMount() {
    const { navigation } = this.context

    // App生命周期内保存首页的navigation引用
    navigationReference(navigation)
    runAfter(() => {
      this.updateInitialPage()
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)

      setTimeout(() => {
        const id = userStore.userInfo.username || userStore.myUserId
        t('其他.启动', {
          userId: id,
          device: _.isPad ? 'pad' : 'mobile'
        })
        hm(`?id=${id}`, 'Home')
      }, 6400)
    })
  }

  componentWillReceiveProps({ isFocused }) {
    const { $ } = this.context
    $.setState({
      isFocused
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    const { navigation } = this.context
    if (navigation.isFocused()) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        BackHandler.exitApp()
      }
      this.lastBackPressed = Date.now()
      info('再按一次退出应用')
      return true
    }
    return false
  }

  onWillFocus = () => {
    const { $, navigation } = this.context

    // popToTop回来时需要延时才能获得正确的登出后的isLogin状态
    setTimeout(() => {
      if (!$.isLogin) {
        navigation.navigate('Auth')
      }
    }, 160)

    const { _loaded } = $.state
    if (!_loaded) {
      $.init()
    }
  }

  /**
   * 设置应用初始页面
   */
  updateInitialPage = () => {
    const { $, navigation } = this.context
    if ($.initialPage === MODEL_SETTING_INITIAL_PAGE.getValue('进度')) {
      $.init()
      return
    }

    if ($.initialPage === MODEL_SETTING_INITIAL_PAGE.getValue('小圣杯')) {
      navigation.push('Tinygrail')
      return
    }

    setTimeout(() => {
      $.setState({
        isFocused: false
      })
      navigation.navigate($.initialPage)
    }, 0)
  }

  get style() {
    return IOS ? _.container.bg : _.container._plain
  }

  render() {
    const { $ } = this.context
    const { isFocused, _loaded } = $.state
    return (
      <SafeAreaView style={this.style}>
        <StatusBarEvents backgroundColor='transparent' />
        <NavigationBarEvents />
        <NavigationEvents onWillFocus={this.onWillFocus} />
        {$.isLogin && _loaded && (
          <>
            <UM screen={title} />
            <Header />
            <Tab length={$.tabs.length} />
            <Modal />
            {isFocused && (
              <IconPortal index={2} onPress={$.onRefreshThenScrollTop} />
            )}
            <Heatmaps />
          </>
        )}
      </SafeAreaView>
    )
  }
}
