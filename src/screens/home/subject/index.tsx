/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 22:59:34
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { IOS } from '@constants'
import Bg from './component/bg'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import { useSubjectPage } from './hooks'

import type { NavigationProps } from '@types'

/** 条目 */
function Subject(props: NavigationProps) {
  const {
    id,
    handleForwardRef,
    handleBlockRef,
    handleScrollIntoViewIfNeeded,
    handleScrollTo,
    handleScrollToTop
  } = useSubjectPage(props)

  return (
    <Component id='screen-subject'>
      <StoreContext.Provider value={id}>
        <Page statusBarEvent={false}>
          {IOS && <Bg />}
          <List
            forwardRef={handleForwardRef}
            onScrollIntoViewIfNeeded={handleScrollIntoViewIfNeeded}
            onBlockRef={handleBlockRef}
          />
        </Page>
        <Header onScrollTo={handleScrollTo} onScrollToTop={handleScrollToTop} />
        <Extra />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Subject)
