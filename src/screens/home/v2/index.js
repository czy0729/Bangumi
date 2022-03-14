/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-14 18:06:58
 */
import React from 'react'
import { UM } from '@components'
import {
  StatusBarEvents,
  Auth,
  NavigationBarEvents,
  SafeAreaView,
  KeyboardAdjustPanResize
} from '@_'
import { _, userStore } from '@stores'
import { runAfter } from '@utils'
import { navigationReference } from '@utils/app'
import { inject, obc } from '@utils/decorators'
import { hm, t, ua } from '@utils/fetch'
import { IOS } from '@constants'
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
        if ($.isLogin) ua()
      }, 6400)
    })
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <SafeAreaView style={IOS ? _.container.bg : _.container.plain}>
        <StatusBarEvents backgroundColor='transparent' />
        <NavigationBarEvents />
        {!$.isLogin && <Auth />}
        {$.isLogin && _loaded && (
          <>
            <Header />
            <Tab length={$.tabs.length} />
            <Modal />
            <UM screen={title} />
            <KeyboardAdjustPanResize />
            <Heatmaps />
          </>
        )}
      </SafeAreaView>
    )
  }
}
