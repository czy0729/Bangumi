/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:21:45
 */
import React from 'react'
import { Component, Heatmap, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Tab from './component/tab'
import Header from './header'
import { useRatingPage } from './hooks'

import type { NavigationProps } from '@types'

/** 用户评分 */
const Rating = (props: NavigationProps) => {
  const { id, $ } = useRatingPage(props)

  return useObserver(() => (
    <Component id='screen-rating'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <Tab />
          <Heatmap bottom={_.bottom} id='用户评分' screen='Rating' />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Rating
