/*
 * @Author: czy0729
 * @Date: 2023-12-27 21:49:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 20:10:59
 */
import React from 'react'
import { NestedScrollParallaxHeader } from '@components'
import { obc } from '@utils/decorators'
import Menu from '../component/menu'
import HeaderComponent from '../component/header-component'
import TabBarLeft from '../component/tab-bar-left'
import TabBarLabel from '../component/tab-bar-label'
import { TABS } from '../ds'
import { Ctx } from '../types'
import TopNavbarComponent from './top-navbar-component'
import List from './list'
import { COMPONENT } from './ds'

/** 安卓用 */
function NestedScroll(props, { $ }: Ctx) {
  const { page } = $.state
  return (
    <>
      <NestedScrollParallaxHeader
        pages={TABS.map(item => item.title)}
        initialPage={page}
        imageSource={$.imageSource}
        spacing={-14}
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

export default obc(NestedScroll, COMPONENT)

function renderLabel({ style, title }) {
  return <TabBarLabel style={style} title={title} />
}
