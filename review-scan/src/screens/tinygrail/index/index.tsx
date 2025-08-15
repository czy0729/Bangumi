/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-21 12:34:14
 */
import React from 'react'
import { Component } from '@components'
import { StatusBarPlaceholder } from '@_'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailPage from '@tinygrail/_/page'
import TinygrailStarsLogs from '@tinygrail/_/stars-logs'
import { NavigationProps } from '@types'
import Auth from './component/auth'
import BonusModal from './component/bonus-modal'
import Footer from './component/footer'
import Menus from './component/menus'
import Scroll from './component/scroll'
import { useTinygrailPage } from './hooks'

/** 小圣杯首页 */
const Tinygrail = (props: NavigationProps) => {
  const { id, $, navigation } = useTinygrailPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail'>
      <StoreContext.Provider value={id}>
        <TinygrailPage header={false}>
          <StatusBarPlaceholder />
          <Scroll>
            <Auth />
            <Menus />
            <Footer />
          </Scroll>
          <BonusModal />
          <TinygrailStarsLogs
            navigation={navigation}
            show={$.state.show}
            onToggle={$.onToggleLogs}
          />
        </TinygrailPage>
      </StoreContext.Provider>
    </Component>
  ))
}

export default Tinygrail
