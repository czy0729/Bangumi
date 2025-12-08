/*
 * @Author: czy0729
 * @Date: 2023-12-27 21:49:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 00:04:41
 */
import React, { useMemo } from 'react'
import { NestedScrollParallaxHeader } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import HeaderComponent from '../component/header-component'
import Menu from '../component/menu'
import TabBarLeft from '../component/tab-bar-left'
import { TABS } from '../ds'
import List from './list'
import TopNavbarComponent from './top-navbar-component'
import { renderLabel } from './utils'
import { COMPONENT, PAGES } from './ds'

import type { Ctx } from '../types'

/** 安卓用 */
function NestedScroll() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elHeader = useMemo(() => <HeaderComponent />, [])
  const elTopNavbar = useMemo(() => <TopNavbarComponent />, [])
  const elTabBarLeft = useMemo(() => <TabBarLeft />, [])

  return useObserver(() => (
    <>
      <NestedScrollParallaxHeader
        pages={PAGES}
        initialPage={$.state.page}
        imageSource={$.imageSource}
        blurRadius={$.blurRadius}
        tabBarLocalKey='UserV2|NestedScroll'
        HeaderComponent={elHeader}
        TopNavbarComponent={elTopNavbar}
        TabBarLeft={elTabBarLeft}
        renderLabel={renderLabel}
        onIndexChange={$.onChange}
      >
        {TABS.map(({ title }) => (
          <List key={title} title={title} />
        ))}
      </NestedScrollParallaxHeader>
      <Menu />
    </>
  ))
}

export default NestedScroll
