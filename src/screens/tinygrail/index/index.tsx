/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 04:01:17
 */
import React from 'react'
import { UM } from '@components'
import { StatusBarPlaceholder } from '@_'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import ScrollView from '@tinygrail/_/scroll-view'
import StarsLogs from '@tinygrail/_/stars-logs'
import Auth from './component/auth'
import BonusModal from './component/bonus-modal'
import Footer from './component/footer'
import Menus from './component/menus'
import { useTinygrailPage } from './hooks'
import Store from './store'
import { TITLE } from './ds'
import { memoStyles } from './styles'
import { Ctx } from './types'

/** 小圣杯首页 */
const Tinygrail = (props, context: Ctx) => {
  useTinygrailPage(context)

  const { $ } = context
  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainerStyle}
          onRefresh={$.refresh}
        >
          <UM title={TITLE} />
          <StatusBarPlaceholder />
          <Auth />
          <Menus />
          <Footer />
        </ScrollView>
        <BonusModal visible={$.state.visible} />
        <StarsLogs show={$.state.show} onToggle={$.onToggleLogs} />
      </>
    )
  })
}

export default ic(Store, Tinygrail)
