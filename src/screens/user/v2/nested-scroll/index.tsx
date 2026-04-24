/*
 * @Author: czy0729
 * @Date: 2023-12-27 21:49:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-23 23:50:03
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { NestedScrollParallaxHeader } from '@components'
import { uiStore, useStore } from '@stores'
import BackgroundImage from '../component/background-image'
import HeaderComponent from '../component/header-component'
import Menu from '../component/menu'
import Sensor from '../component/sensor'
import TabBarLeft from '../component/tab-bar-left'
import { TABS } from '../ds'
import List from './list'
import TopNavbarComponent from './top-navbar-component'
import { renderLabel } from './utils'
import { COMPONENT, PAGES } from './ds'
import { styles } from './styles'

import type { Ctx } from '../types'

/** 安卓用 */
function NestedScroll() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elHeader = useMemo(
    () => (
      <>
        <HeaderComponent />
        <Sensor style={styles.sensor} />
      </>
    ),
    []
  )
  const elTopNavbar = useMemo(() => <TopNavbarComponent />, [])
  const elTabBarLeft = useMemo(() => <TabBarLeft />, [])

  const handleBackground = useCallback((fixed: boolean) => <BackgroundImage fixed={fixed} />, [])

  const handleIndexChange = useCallback(
    (page: number) => {
      $.onChange(page)

      uiStore.closeAll()
    },
    [$]
  )

  return (
    <>
      <NestedScrollParallaxHeader
        pages={PAGES}
        initialPage={$.state.page}
        tabBarLocalKey='UserV2|NestedScroll'
        HeaderComponent={elHeader}
        TopNavbarComponent={elTopNavbar}
        BackgroundComponent={handleBackground}
        TabBarLeft={elTabBarLeft}
        renderLabel={renderLabel}
        onIndexChange={handleIndexChange}
      >
        {TABS.map(({ title }) => (
          <List key={title} title={title} />
        ))}
      </NestedScrollParallaxHeader>
      <Menu />
    </>
  )
}

export default observer(NestedScroll)
