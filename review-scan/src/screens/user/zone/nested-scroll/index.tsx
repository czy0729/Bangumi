/*
 * @Author: czy0729
 * @Date: 2023-12-27 21:49:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:21:19
 */
import React from 'react'
import { NestedScrollParallaxHeader } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import About from '../component/about'
import BangumiList from '../component/bangumi-list'
import Menu from '../component/menu'
import RakuenList from '../component/rakuen-list'
import Stats from '../component/stats'
import TimelineList from '../component/timeline-list'
import { TABS } from '../ds'
import { Ctx } from '../types'
import HeaderComponent from './header-component'
import TopNavbarComponent from './top-navbar-component'
import { renderLabel } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

const PAGES = TABS.map(item => item.title)

/** 安卓用 */
function NestedScroll() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <>
      <NestedScrollParallaxHeader
        tabStyle={styles.tab}
        pages={PAGES}
        initialPage={$.state.page}
        imageSource={$.imageSource}
        blurRadius={$.blurRadius}
        tabBarLocalKey='Zone|NestedScroll'
        HeaderComponent={<HeaderComponent />}
        TopNavbarComponent={<TopNavbarComponent />}
        renderLabel={renderLabel}
        onIndexChange={$.onTabChange}
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

export default ob(NestedScroll, COMPONENT)
