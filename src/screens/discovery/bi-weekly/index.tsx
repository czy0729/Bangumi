/*
 * @Author: czy0729
 * @Date: 2024-05-14 04:14:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 22:51:19
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import List from './component/list'
import Header from './header'
import { useBiWeeklyPage } from './hooks'
import Store from './store'

/** Bangumi 半月刊 */
const BiWeekly = () => {
  const { loaded, data } = useBiWeeklyPage()
  return useObserver(() => (
    <Component id='screen-bi-weekly'>
      <Header />
      <Page loaded={loaded}>
        <List data={data} />
      </Page>
    </Component>
  ))
}

export default ic(Store, BiWeekly)
