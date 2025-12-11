/*
 * @Author: czy0729
 * @Date: 2024-11-07 11:57:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-10 22:41:34
 */
import React from 'react'
import { Component, Page, ScrollView } from '@components'
import { _, StoreContext } from '@stores'
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
        <Page style={_.container.header} loaded={$.state._loaded}>
          <Type />
          <ScrollView>{$.state.type === '简介' ? <Summary /> : <Info />}</ScrollView>
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default SubjectInfo
