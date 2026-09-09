/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:18:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:23:48
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import Header from './header'
import { useReviewsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 影评 (同条目中的评论) */
function Reviews(props: NavigationProps) {
  const { id, $ } = useReviewsPage(props)

  return (
    <Component id='screen-reviews'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.reviews._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Reviews)
