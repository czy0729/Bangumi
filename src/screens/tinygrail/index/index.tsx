/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 11:49:34
 */
import React from 'react'
import { Page } from '@components'
import { StatusBarPlaceholder } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import StarsLogs from '@tinygrail/_/stars-logs'
import Auth from './component/auth'
import BonusModal from './component/bonus-modal'
import Footer from './component/footer'
import Menus from './component/menus'
import Scroll from './component/scroll'
import { useTinygrailPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 小圣杯首页 */
const Tinygrail = (props, context: Ctx) => {
  useTinygrailPage(context)

  const { $ } = context
  return useObserver(() => (
    <Page style={_.container.tinygrail}>
      <StatusBarPlaceholder />
      <Scroll>
        <Auth />
        <Menus />
        <Footer />
      </Scroll>
      <BonusModal visible={$.state.visible} />
      <StarsLogs show={$.state.show} onToggle={$.onToggleLogs} />
    </Page>
  ))
}

export default ic(Store, Tinygrail)
