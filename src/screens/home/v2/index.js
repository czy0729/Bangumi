/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 18:12:28
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import { Track } from '@components'
import { StatusBarEvents, Auth, NavigationBarEvents } from '@_'
import { _ } from '@stores'
import { t, ua } from '@utils/fetch'
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
      if ($.isLogin) ua()
    }, 6400)
  })

  return useObserver(() => (
    <>
      <StatusBarEvents backgroundColor='transparent' />
      <Page style={IOS ? _.container.bg : _.container.plain}>
        {$.isLogin ? (
          <>
            <Header />
            {$.state._loaded && <Tab length={$.tabs.length} />}
            <Track title='首页' hm={[`?id=${$.userId}`, 'Home']} />
            <Modal />
          </>
        ) : (
          <Auth />
        )}
      </Page>
      <NavigationBarEvents />
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Home)
