/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:18:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 02:07:43
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { useReviewsPage } from './hooks'

/** 影评 */
const Reviews = (props: NavigationProps) => {
  const { id, $ } = useReviewsPage(props)

  return useObserver(() => (
    <Component id='screen-reviews'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page loaded={$.reviews._loaded}>
          <List />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default Reviews
