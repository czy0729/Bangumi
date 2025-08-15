/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:41:45
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import TinygrailPage from '@tinygrail/_/page'
import { NavigationProps } from '@types'
import Tabs from './component/tabs'
import { useTinygrailOverviewPage } from './hooks'
import { HM } from './ds'

/** 热门榜单 */
const TinygrailOverview = (props: NavigationProps) => {
  const { id } = useTinygrailOverviewPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-overview'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <Tabs />
        </TinygrailPage>
        <TinygrailHeader title='热门榜单' hm={HM} go />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailOverview
