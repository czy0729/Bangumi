/*
 * @Author: czy0729
 * @Date: 2019-04-28 18:38:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-10 13:51:45
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Tabs as CompTabs } from '@components'
import { IOS } from '@constants'

function Tabs({ tabBarStyle, $, children, ...other }) {
  const { page, _page, _loaded } = $.state
  if (!_loaded) {
    return null
  }

  const _tabBarStyle = IOS
    ? {
        ...tabBarStyle
      }
    : {
        ...tabBarStyle,
        elevation: 12
      }
  if (!IOS) {
    _tabBarStyle.backgroundColor = $.backgroundColor
  }
  return (
    <CompTabs
      tabBarStyle={_tabBarStyle}
      tabs={$.tabs}
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
