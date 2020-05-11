/*
 * @Author: czy0729
 * @Date: 2019-04-29 17:36:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-10 04:02:10
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Tabs as CompTabs, Text } from '@components'
import { IOS } from '@constants'
import TabBarLeft from './tab-bar-left'
import { tabs } from './store'

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
      tabs={tabs.map(({ title }) => ({
        title: (
          <Text size={11} type='sub' lineHeight={14}>
            <Text size={14}>{title}</Text>
          </Text>
        )
      }))}
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
