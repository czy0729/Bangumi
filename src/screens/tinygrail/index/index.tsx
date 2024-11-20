/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:20:15
 */
import React from 'react'
import { Component, Page } from '@components'
import { StatusBarPlaceholder } from '@_'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import StarsLogs from '@tinygrail/_/stars-logs'
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
        <Page style={_.container.tinygrail}>
          <StatusBarPlaceholder />
          <Scroll>
            <Auth />
            <Menus />
            <Footer />
          </Scroll>
          <BonusModal $={$} navigation={navigation} visible={$.state.visible} />
          <StarsLogs show={$.state.show} onToggle={$.onToggleLogs} />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default Tinygrail
