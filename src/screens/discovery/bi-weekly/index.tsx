/*
 * @Author: czy0729
 * @Date: 2024-05-14 04:14:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 11:00:00
 *
 * Bangumi 半月刊页面: 编排 useBiWeeklyPage 与列表 / 头部
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import Type from './component/type'
import Header from './header'
import { useBiWeeklyPage } from './hooks'

import type { NavigationProps } from '@types'

/** Bangumi 半月刊 */
function BiWeekly(props: NavigationProps) {
  const { id, loaded, data } = useBiWeeklyPage(props)

  return (
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
  )
}

export default observer(BiWeekly)
