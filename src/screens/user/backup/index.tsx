/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:16:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 07:06:47
 */
import React from 'react'
import { Component, Loading, Page } from '@components'
import { ic } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Cloud from './component/cloud'
import List from './component/list'
import Tips from './component/tips'
import Upload from './component/upload'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 本地备份 */
const Backup = (_props, { $ }: Ctx) => {
  useMount(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-backup'>
      <Header />
      <Page>
        <Upload />
        <Cloud />
        {$.state.progress.fetching ? <Loading /> : <List />}
      </Page>
      <Tips />
    </Component>
  ))
}

export default ic(Store, Backup)
