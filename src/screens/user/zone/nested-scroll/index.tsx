/*
 * @Author: czy0729
 * @Date: 2023-12-27 21:49:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-08 18:39:03
 */
import React from 'react'
import { NestedScrollParallaxHeader } from '@components'
import { obc } from '@utils/decorators'
import About from '../component/about'
import BangumiList from '../component/bangumi-list'
import Menu from '../component/menu'
import RakuenList from '../component/rakuen-list'
import Stats from '../component/stats'
import TimelineList from '../component/timeline-list'
import { TABS } from '../ds'
import { Ctx } from '../types'
import HeaderComponent from './header-component'
import TabBarLabel from './tab-bar-label'
import TopNavbarComponent from './top-navbar-component'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

/** 安卓用 */
function NestedScroll(props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <>
      <NestedScrollParallaxHeader
        tabStyle={styles.tab}
        pages={TABS.map(item => item.title)}
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

export default obc(NestedScroll, COMPONENT)

function renderLabel({ style, title }) {
  return <TabBarLabel style={style} title={title} />
}
