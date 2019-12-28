/*
 * @Author: czy0729
 * @Date: 2019-04-29 17:36:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-11 00:12:30
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Tabs as CompTabs } from '@components'
import { IOS } from '@constants'
import TabBarLeft from './tab-bar-left'
import { tabs } from './store'

function Tabs({ tabBarStyle, $, children, ...other }) {
  const { page, _page } = $.state
  const _tabBarStyle = { ...tabBarStyle }
  if (!IOS) {
    _tabBarStyle.backgroundColor = $.backgroundColor
  }
  return (
    <CompTabs
      tabBarStyle={_tabBarStyle}
      tabs={tabs}
      initialPage={page}
      page={children ? page : _page}
      renderTabBarLeft={<TabBarLeft $={$} />}
      onTabClick={$.onTabClick}
      onChange={$.onChange}
      {...other}
    >
      {children}
    </CompTabs>
  )
}

export default observer(Tabs)
