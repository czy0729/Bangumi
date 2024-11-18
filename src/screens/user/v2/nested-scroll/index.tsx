/*
 * @Author: czy0729
 * @Date: 2023-12-27 21:49:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:31:45
 */
import React from 'react'
import { NestedScrollParallaxHeader } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import HeaderComponent from '../component/header-component'
import Menu from '../component/menu'
import TabBarLabel from '../component/tab-bar-label'
import TabBarLeft from '../component/tab-bar-left'
import { TABS } from '../ds'
import { Ctx } from '../types'
import List from './list'
import TopNavbarComponent from './top-navbar-component'
import { COMPONENT } from './ds'

/** 安卓用 */
function NestedScroll() {
  const { $ } = useStore<Ctx>()
  return (
    <>
      <NestedScrollParallaxHeader
        pages={TABS.map(item => item.title)}
        initialPage={$.state.page}
        imageSource={$.imageSource}
        blurRadius={$.blurRadius}
        tabBarLocalKey='UserV2|NestedScroll'
        HeaderComponent={<HeaderComponent />}
        TopNavbarComponent={<TopNavbarComponent />}
        TabBarLeft={<TabBarLeft />}
        renderLabel={renderLabel}
        onIndexChange={$.onChange}
      >
        {TABS.map(({ title }) => (
          <List key={title} title={title} />
        ))}
      </NestedScrollParallaxHeader>
      <Menu />
    </>
  )
}

export default ob(NestedScroll, COMPONENT)

function renderLabel({ style, title }) {
  return <TabBarLabel style={style} title={title} />
}
