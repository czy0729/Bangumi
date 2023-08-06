/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-25 20:02:50
 */
import React from 'react'
import { Page } from '@components'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { ic } from '@utils/decorators'
import { useFocusEffect, useRunAfter, useObserver } from '@utils/hooks'
import { Track } from '@components'
import { Auth, LoginNotice } from '@_'
import { _ } from '@stores'
import Header from './header'
import Tab from './tab'
import Tips from './tips'
import Modal from './modal'
import Store from './store'
import { Ctx } from './types'

const Home = (props, { $, navigation }: Ctx) => {
  useRunAfter(() => {
    $.updateInitialPage(navigation)

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|Home`, () => {
      $.onRefreshThenScrollTop()
    })
  })

  useFocusEffect(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Page style={_.ios(_.container.bg, _.container.plain)}>
        {$.isLogin ? (
          <>
            <Header />
            {$.state._loaded && <Tab length={$.tabs.length} />}
            <Tips />
            <Modal />
          </>
        ) : (
          <Auth />
        )}
      </Page>
      <Track title='首页' hm={$.hm} />
      <LoginNotice navigation={navigation} />
    </>
  ))
}

export default ic(Store, Home)
