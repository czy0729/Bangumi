/*
 * @Author: czy0729
 * @Date: 2024-11-07 11:57:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 09:55:58
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Component, Page, ScrollView } from '@components'
import { _, StoreContext } from '@stores'
import { NavigationProps } from '@types'
import Info from './component/info'
import Summary from './component/summary'
import Type from './component/type'
import Header from './header'
import { useSubjectInfoPage } from './hooks'

/** 条目详情 */
const SubjectInfo = (props: NavigationProps) => {
  const { id, $ } = useSubjectInfoPage(props)

  return useObserver(() => (
    <Component id='screen-info'>
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
