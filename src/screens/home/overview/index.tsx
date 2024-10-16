/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:20:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-15 17:14:16
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import Store from './store'

/** 条目封面一览 */
const Overview = _props => {
  return useObserver(() => (
    <Component id='screen-overview'>
      <Header />
      <Page>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Overview)
