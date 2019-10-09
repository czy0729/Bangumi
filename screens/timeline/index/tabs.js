/*
 * @Author: czy0729
 * @Date: 2019-04-29 17:36:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-27 16:15:48
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Tabs as CompTabs } from '@components'
import TabBarLeft from './tab-bar-left'
import { tabs } from './store'

function Tabs({ $, children, ...other }) {
  const { page, _page } = $.state
  return (
    <CompTabs
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
