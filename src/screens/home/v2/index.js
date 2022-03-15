/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 23:29:06
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import { UM } from '@components'
import { StatusBarEvents, Auth, NavigationBarEvents, KeyboardAdjustPanResize } from '@_'
import { _ } from '@stores'
import { hm, t, ua } from '@utils/fetch'
import { IOS } from '@constants'
import Header from './header'
import Tab from './tab-wrap'
import Modal from './modal'
import Heatmaps from './heatmaps'
import Store from './store'

const Home = (props, { $, navigation }) => {
  useRunAfter(() => {
    $.updateInitialPage(navigation)

    setTimeout(() => {
      t('其他.启动', {
        userId: $.userId,
        device: _.isPad ? 'pad' : 'mobile'
      })
      hm(`?id=${$.userId}`, 'Home')
      if ($.isLogin) ua()
    }, 6400)
  })

  return useObserver(() => (
    <>
      <Page style={IOS ? _.container.bg : _.container.plain}>
        {$.isLogin ? (
          <>
            <Header />
            {$.state._loaded && <Tab length={$.tabs.length} />}
            <UM screen='首页' />
            <Modal />
            <KeyboardAdjustPanResize />
          </>
        ) : (
          <Auth />
        )}
      </Page>
      <StatusBarEvents backgroundColor='transparent' />
      <NavigationBarEvents />
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Home)
