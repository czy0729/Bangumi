/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:16:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 05:39:57
 */
import React from 'react'
import { Component, Loading, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Cloud from './component/cloud'
import List from './component/list'
import Tips from './component/tips'
import Upload from './component/upload'
import Header from './header'
import { useBackupPage } from './hooks'

/** 本地备份 */
const Backup = (props: NavigationProps) => {
  const { id, $ } = useBackupPage(props)

  return useObserver(() => (
    <Component id='screen-backup'>
      <StoreContext.Provider value={id}>
        <Page style={_.container.header}>
          <Upload />
          <Cloud />
          {$.state.progress.fetching ? <Loading /> : <List />}
        </Page>
        <Header />
        <Tips />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Backup
