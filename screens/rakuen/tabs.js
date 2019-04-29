/*
 * @Author: czy0729
 * @Date: 2019-04-28 18:38:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 00:32:32
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
