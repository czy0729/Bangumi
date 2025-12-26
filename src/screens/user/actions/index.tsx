/*
 * @Author: czy0729
 * @Date: 2022-11-22 22:39:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:07:52
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page, ScrollView } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Create from './component/create'
import List from './component/list'
import Header from './header'
import { useActionsPage } from './hooks'
import { memoStyles } from './styles'

import type { NavigationProps } from '@types'

/** 自定义跳转 */
const Actions = (props: NavigationProps) => {
  const { id, $ } = useActionsPage(props)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Component id='screen-actions'>
        <StoreContext.Provider value={id}>
          <Page loaded={$.state._loaded}>
            <HeaderPlaceholder />
            <ScrollView contentContainerStyle={styles.scrollView}>
              <List />
              <Create />
            </ScrollView>
          </Page>
          <Header />
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default Actions
