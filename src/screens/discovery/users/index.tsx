/*
 * @Author: czy0729
 * @Date: 2025-12-31 21:05:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-02 16:44:45
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'

/** 社区项目 */
const DiscoveryUsers = () => {
  return useObserver(() => (
    <Component id='screen-discovery-users'>
      <Page>
        <HeaderPlaceholder />
        <List />
      </Page>
      <Header />
    </Component>
  ))
}

export default DiscoveryUsers
