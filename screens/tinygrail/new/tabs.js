/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-15 02:40:38
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Tabs as CompTabs } from '@components'
import _ from '@styles'
import { colorText } from '../styles'
import { tabs } from './store'

function Tabs({ $, children, ...other }) {
  const { page, _page } = $.state
  return (
    <CompTabs
      tabs={tabs}
      initialPage={page}
      page={children ? page : _page}
      tabBarUnderlineStyle={{
        backgroundColor: _.colorWarning
      }}
      tabBarActiveTextColor={_.colorPlain}
      tabBarInactiveTextColor={colorText}
      onTabClick={$.onTabClick}
      onChange={$.onChange}
      {...other}
    >
      {children}
    </CompTabs>
  )
}

export default observer(Tabs)
