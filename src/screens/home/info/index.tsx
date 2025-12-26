/*
 * @Author: czy0729
 * @Date: 2024-11-07 11:57:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:18:12
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page, ScrollView } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Info from './component/info'
import Summary from './component/summary'
import Type from './component/type'
import Header from './header'
import { useSubjectInfoPage } from './hooks'

import type { NavigationProps } from '@types'

/** 条目详情 */
const SubjectInfo = (props: NavigationProps) => {
  const { id, $ } = useSubjectInfoPage(props)

  return useObserver(() => (
    <Component id='screen-subject-info'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <Type />
          <ScrollView>{$.state.type === '简介' ? <Summary /> : <Info />}</ScrollView>
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default SubjectInfo
