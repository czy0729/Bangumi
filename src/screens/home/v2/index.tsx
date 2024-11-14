/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 06:14:56
 */
import React from 'react'
import { Component, Page } from '@components'
import { Auth } from '@_'
import { _, StoreContext, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { IOS, MODEL_SETTING_HOME_LAYOUT } from '@constants'
import { NavigationProps, ViewStyle } from '@types'
import Extra from './component/extra'
import Modal from './component/modal'
import Tab from './component/tab'
import Tips from './component/tips'
import Header from './header'
import { useHomePage } from './hooks'

/** 进度 */
const Home = (props: NavigationProps) => {
  const { id, $ } = useHomePage(props)

  return useObserver(() => {
    let style: ViewStyle
    if (IOS && systemStore.setting.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('列表')) {
      style = _.container.bg
    } else {
      style = _.container.plain
    }

    return (
      <Component id='screen-home'>
        <StoreContext.Provider value={id}>
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
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default Home
