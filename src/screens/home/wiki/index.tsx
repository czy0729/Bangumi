/*
 * @Author: czy0729
 * @Date: 2021-07-12 09:55:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 02:34:49
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

/** 修订历史 */
const SubjectWiki = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-subject-wiki'>
      <Header />
      <Page>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, SubjectWiki)
