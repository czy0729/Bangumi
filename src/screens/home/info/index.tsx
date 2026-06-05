/*
 * @Author: czy0729
 * @Date: 2024-11-07 11:57:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-05 21:57:47
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page, ScrollView } from '@components'
import { StoreContext } from '@stores'
import IconHtmlExpand from '@screens/home/subject/component/icon/html-expand'
import Info from './component/info'
import Summary from './component/summary'
import Type from './component/type'
import Header from './header'
import { useSubjectInfoPage } from './hooks'
import { styles } from './styles'

import type { NavigationProps } from '@types'

/** 条目详情 */
function SubjectInfo(props: NavigationProps) {
  const { id, $ } = useSubjectInfoPage(props)

  const isSummary = $.state.type === '简介'

  return (
    <Component id='screen-subject-info'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <Type />
          <ScrollView>
            {isSummary ? <Summary /> : <Info />}
            <IconHtmlExpand style={styles.settings} showPromoteAlias={!isSummary} />
          </ScrollView>
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(SubjectInfo)
