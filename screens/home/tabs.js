/*
 * @Author: czy0729
 * @Date: 2019-04-29 16:44:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-19 20:25:50
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Tabs as CompTabs } from '@components'
import { tabs } from './store'

const Tabs = ({ $, children, ...other }) => {
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
