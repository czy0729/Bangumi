/*
 * @Author: czy0729
 * @Date: 2023-12-27 21:49:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-23 23:48:45
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { NestedScrollParallaxHeader } from '@components'
import { uiStore, useStore } from '@stores'
import About from '../component/about'
import BackgroundImage from '../component/background-image'
import BangumiList from '../component/bangumi-list'
import Menu from '../component/menu'
import RakuenList from '../component/rakuen-list'
import Sensor from '../component/sensor'
import Stats from '../component/stats'
import TimelineList from '../component/timeline-list'
import HeaderComponent from './header-component'
import TopNavbarComponent from './top-navbar-component'
import { renderLabel } from './utils'
import { COMPONENT, PAGES } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../types'

/** 安卓用 */
function NestedScroll() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const elTopNavbar = useMemo(() => <TopNavbarComponent />, [])
  const elHeader = useMemo(
    () => (
      <>
        <HeaderComponent />
        <Sensor style={styles.sensor} />
      </>
    ),
    [styles]
  )

  const handleBackground = useCallback((fixed: boolean) => <BackgroundImage fixed={fixed} />, [])
  const handleIndexChange = useCallback(
    (page: number) => {
      $.onTabChange(page)

      uiStore.closeAll()
    },
    [$]
  )

  return (
    <>
      <NestedScrollParallaxHeader
        tabStyle={styles.tab}
        pages={PAGES}
        initialPage={$.state.page}
        tabBarLocalKey='Zone|NestedScroll'
        HeaderComponent={elHeader}
        TopNavbarComponent={elTopNavbar}
        BackgroundComponent={handleBackground}
        renderLabel={renderLabel}
        onIndexChange={handleIndexChange}
      >
        <About />
        <BangumiList />
        <Stats />
        <TimelineList />
        <RakuenList />
      </NestedScrollParallaxHeader>
      <Menu />
    </>
  )
}

export default observer(NestedScroll)
