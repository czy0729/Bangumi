/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:15:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:13:50
 */
import React from 'react'
import { Page } from '@components'
import { useOnScroll } from '@components/header/utils'
import { ic } from '@utils/decorators'
import { useObserver, useKeyboardAdjustResize, useRunAfter } from '@utils/hooks'
import Header from './header'
import List from './list'
import Heatmaps from './heatmaps'
import Store from './store'
import { Ctx } from './types'

const Blog = (props, { $ }: Ctx) => {
  const { fixed, onScroll } = useOnScroll()
  useRunAfter(async () => {
    await $.init()
  })
  useKeyboardAdjustResize()

  return useObserver(() => (
    <>
      <Header fixed={fixed} />
      <Page>
        <List onScroll={onScroll} />
      </Page>
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Blog)
