/*
 * @Author: czy0729
 * @Date: 2023-12-27 21:49:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 15:36:55
 */
import React from 'react'
import { NestedScrollParallaxHeader } from '@components'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import Menu from '../menu'
import TabBarLeft from '../tab/tab-bar-left'
import Label from '../tab/label'
import { TABS } from '../ds'
import { Ctx } from '../types'
import HeaderComponent from './header-component'
import TopNavbarComponent from './top-navbar-component'
import List from './list'

const PAGES = TABS.map(item => item.title)

function NestedScroll(props, { $ }: Ctx) {
  rerender('User.NestedScroll')

  const { page } = $.state
  return (
    <>
      <NestedScrollParallaxHeader
        pages={PAGES}
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

export default obc(NestedScroll)

function renderLabel({ style, title }) {
  return <Label style={style} title={title} />
}
