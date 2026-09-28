/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 用户评分: 好友/所有人 SegmentedControl + 各收藏状态 TabView 列表
 */
import { observer } from 'mobx-react'
import { Component, Heatmap, Page } from '@components'
import { _, StoreContext } from '@stores'
import Tab from './component/tab'
import Header from './header'
import { useRatingPage } from './hooks'

import type { NavigationProps } from '@types'

/** 用户评分 */
function Rating(props: NavigationProps) {
  const { id, $ } = useRatingPage(props)

  return (
    <Component id='screen-rating'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <Tab />
          <Heatmap bottom={_.bottom} id='用户评分' screen='Rating' />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Rating)
