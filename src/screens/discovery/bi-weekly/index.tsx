/*
 * @Author: czy0729
 * @Date: 2024-05-14 04:14:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 12:16:18
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Type from './component/type'
import Header from './header'
import { useBiWeeklyPage } from './hooks'

import type { NavigationProps } from '@types'

/** Bangumi 半月刊 */
const BiWeekly = (props: NavigationProps) => {
  const { id, loaded, data } = useBiWeeklyPage(props)

  return useObserver(() => (
    <Component id='screen-bi-weekly'>
      <StoreContext.Provider value={id}>
        <Page loaded={loaded}>
          <HeaderPlaceholder />
          <Type />
          <List data={data} />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default BiWeekly
