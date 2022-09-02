/*
 * @Author: czy0729
 * @Date: 2021-04-07 10:23:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 04:07:06
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Board = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page loaded={$.board._loaded}>
        <List />
      </Page>
    </>
  ))
}

export default ic(Store, Board)
