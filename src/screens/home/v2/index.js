/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-08 19:54:46
 */
import React from 'react'
import { BackHandler } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import PropTypes from 'prop-types'
import {
  StatusBarEventsDefault,
  OptimizeTabbarTransition,
  IconTabBar,
  NavigationBarEvents,
  SafeAreaView
} from '@screens/_'
import { _, userStore } from '@stores'
import { info } from '@utils/ui'
import { navigationReference } from '@utils/app'
import { inject, observer } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { IOS } from '@constants'
import { MODEL_SETTING_INITIAL_PAGE } from '@constants/model'
import Header from './header'
import Tab from './tab'
import Modal from './modal'
import Store from './store'

export default
@inject(Store)
@observer
class Home extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => <IconTabBar name='star' color={tintColor} />,
    tabBarLabel: '进度'
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  UNSAFE_componentWillMount() {
    const { $, navigation } = this.context

    // App生命周期内保存首页的navigation引用
    navigationReference(navigation)
    $.init()
    this.updateInitialPage()

    setTimeout(() => {
      const id = userStore.userInfo.username || userStore.myUserId
      t('其他.启动', {
        userId: id,
        device: _.isPad ? 'pad' : 'mobile'
      })
      hm(`?id=${id}`, 'Home')
    }, 6400)

    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
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
    const { navigation } = this.context
    navigation.navigate('Auth')
  }

  /**
   * 设置应用初始页面
   */
  updateInitialPage = () => {
    const { $, navigation } = this.context
    if ($.initialPage === MODEL_SETTING_INITIAL_PAGE.getValue('进度')) {
      return
    }

    if ($.initialPage === MODEL_SETTING_INITIAL_PAGE.getValue('小圣杯')) {
      navigation.push('Tinygrail')
      return
    }

    navigation.navigate($.initialPage)
  }

  get style() {
    if (IOS) {
      return _.container.bg
    }

    const { $ } = this.context
    return $.itemShadow ? _.container._bg : _.container.bg
  }

  render() {
    const { $ } = this.context
    if (!$.isLogin) {
      return (
        <SafeAreaView style={this.style}>
          <NavigationBarEvents />
          <NavigationEvents onWillFocus={this.onWillFocus} />
        </SafeAreaView>
      )
    }

    const { _loaded } = $.state
    return (
      <SafeAreaView style={this.style}>
        <StatusBarEventsDefault />
        {_loaded && (
          <OptimizeTabbarTransition>
            <Header />
            <Tab />
            <Modal />
          </OptimizeTabbarTransition>
        )}
        <NavigationBarEvents />
      </SafeAreaView>
    )
  }
}
