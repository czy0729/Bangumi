/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:31:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-12 00:06:11
 */
import React from 'react'
import { Component, Empty, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import { useSubjectLinkPage } from './hooks'

import type { NavigationProps } from '@types'

/** 条目关联 */
const SubjectLink = (props: NavigationProps) => {
  const { id, $ } = useSubjectLinkPage(props)

  return useObserver(() => {
    const { map, error } = $.state

    return (
      <Component id='screen-subject-link'>
        <StoreContext.Provider value={id}>
          <Page style={_.container.header} loaded={map._loaded}>
            {error ? <Empty text='该条目没有足够的动画类关联数据' /> : <List />}
          </Page>
          <Header />
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default SubjectLink
