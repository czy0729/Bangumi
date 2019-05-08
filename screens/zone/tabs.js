/*
 * @Author: czy0729
 * @Date: 2019-05-06 13:00:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-06 13:40:15
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Tabs } from '@components'
import { tabs } from './store'

const _Tabs = ({ $, children, ...other }) => {
  const { page, _page } = $.state
  return (
    <Tabs
      tabs={tabs}
      initialPage={page}
      page={children ? page : _page}
      onTabClick={$.onTabClick}
      onChange={$.onChange}
      {...other}
    >
      {children}
    </Tabs>
  )
}

export default observer(_Tabs)
