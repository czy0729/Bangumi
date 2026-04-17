/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:16:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 05:39:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Loading, Page } from '@components'
import { StoreContext } from '@stores'
import Cloud from './component/cloud'
import List from './component/list'
import Tips from './component/tips'
import Upload from './component/upload'
import Header from './header'
import { useBackupPage } from './hooks'

import type { NavigationProps } from '@types'

/** 本地备份 */
function Backup(props: NavigationProps) {
  const { id, $ } = useBackupPage(props)

  return (
    <Component id='screen-backup'>
      <StoreContext.Provider value={id}>
        <Page>
          <HeaderPlaceholder />
          <Upload />
          <Cloud />
          {$.state.progress.fetching ? <Loading /> : <List />}
        </Page>
        <Header />
        <Tips />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Backup)
