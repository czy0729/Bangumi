/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-30 10:22:38
 */
import React from 'react'
import { Component, Page } from '@components'
import { Auth } from '@_'
import { _, systemStore } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import { IOS, MODEL_SETTING_HOME_LAYOUT } from '@constants'
import { ViewStyle } from '@types'
import Extra from './component/extra'
import Modal from './component/modal'
import Tab from './component/tab'
import Tips from './component/tips'
import Header from './header'
import { useHomePage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 进度 */
const Home = (_props, context: Ctx) => {
  useHomePage(context)

  const { $ } = context
  return useObserver(() => {
    let style: ViewStyle
    if (IOS && systemStore.setting.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('列表')) {
      style = _.container.bg
    } else {
      style = _.container.plain
    }

    return (
      <Component id='screen-home'>
        <Page style={style} loaded={$.state._loaded}>
          {$.isLogin ? (
            <>
              <Header />
              <Tab keys={$.tabs.map(item => item.key)} />
              <Tips />
              <Modal />
            </>
          ) : (
            <Auth />
          )}
        </Page>
        <Extra />
      </Component>
    )
  })
}

export default ic(Store, Home)
