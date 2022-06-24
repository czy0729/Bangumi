/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-25 03:03:26
 */
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Page } from '@components'
import { privacy } from '@utils'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import { Track } from '@components'
import { StatusBarEvents, Auth, NavigationBarEvents } from '@_'
import { _ } from '@stores'
import { IOS } from '@constants'
import Header from './header'
import Tab from './tab-wrap'
import Modal from './modal'
import Heatmaps from './heatmaps'
import Store from './store'

const Home = (props, { $, navigation }) => {
  useRunAfter(() => {
    if (!IOS && !$.isLogin) privacy()
    $.updateInitialPage(navigation)
  })

  useFocusEffect(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <StatusBarEvents backgroundColor='transparent' />
      <Page style={_.ios(_.container.bg, _.container.plain)}>
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
