/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-26 00:24:34
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Tabs as CompTabs } from '@components'
import { tabs } from './store'

function Tabs({ $, children, ...other }) {
  const { page, _page } = $.state
  return (
    <CompTabs
      tabs={tabs}
      initialPage={page}
      page={children ? page : _page}
      onTabClick={$.onTabClick}
      onChange={$.onChange}
      {...other}
    >
      {children}
    </CompTabs>
  )
}

export default observer(Tabs)
