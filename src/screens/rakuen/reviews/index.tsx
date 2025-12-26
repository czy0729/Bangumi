/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:18:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:32:21
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import { useReviewsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 影评 (同条目中的评论) */
const Reviews = (props: NavigationProps) => {
  const { id, $ } = useReviewsPage(props)

  return useObserver(() => (
    <Component id='screen-reviews'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.reviews._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Reviews
