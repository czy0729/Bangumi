/*
 * @Author: czy0729
 * @Date: 2021-07-12 09:55:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:30:26
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import Header from './header'
import { useSubjectWikiPage } from './hooks'

import type { NavigationProps } from '@types'

/** 修订历史 */
function SubjectWiki(props: NavigationProps) {
  const { id, $, navigation } = useSubjectWikiPage(props)

  return (
    <Component id='screen-subject-wiki'>
      <StoreContext.Provider value={id}>
        <Page>
          <HeaderPlaceholder />
          <List $={$} navigation={navigation} />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(SubjectWiki)
