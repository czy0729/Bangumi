/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 02:33:24
 */
import React from 'react'
import { Component, Page } from '@components'
import { Auth } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Extra from './component/extra'
import Modal from './component/modal'
import Tab from './component/tab'
import Tips from './component/tips'
import Header from './header'
import { useHomePage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 进度 */
const Home = (props, context: Ctx) => {
  useHomePage(context)

  const { $ } = context
  return useObserver(() => (
    <Component id='screen-home'>
      <Page style={_.ios(_.container.bg, _.container.plain)} loaded={$.state._loaded}>
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
      <Extra />
    </Component>
  ))
}

export default ic(Store, Home)
