/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:16:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:40:43
 */
import React from 'react'
import { Component, Loading, Page } from '@components'
import { ic } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Cloud from './cloud'
import Header from './header'
import List from './list'
import Store from './store'
import Tips from './tips'
import Upload from './upload'
import { Ctx } from './types'

/** 本地备份 */
const Backup = (props, { $ }: Ctx) => {
  useMount(() => {
    $.init()
  })

  return useObserver(() => {
    const { progress } = $.state
    return (
      <Component id='screen-backup'>
        <Header />
        <Page>
          <Upload />
          <Cloud />
          {progress.fetching ? <Loading /> : <List />}
        </Page>
        <Tips />
      </Component>
    )
  })
}

export default ic(Store, Backup)
