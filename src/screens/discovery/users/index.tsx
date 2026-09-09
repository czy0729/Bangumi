/*
 * @Author: czy0729
 * @Date: 2025-12-31 21:05:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 12:44:04
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import List from './component/list'
import Header from './header'

/** 社区项目 */
function DiscoveryUsers() {
  return (
    <Component id='screen-discovery-users'>
      <Page>
        <HeaderPlaceholder />
        <List />
      </Page>
      <Header />
    </Component>
  )
}

export default observer(DiscoveryUsers)
