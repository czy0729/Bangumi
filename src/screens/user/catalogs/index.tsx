/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:45:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 05:43:14
 */
import React from 'react'
import { Page, Heatmap } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Tabs from './tabs'
import Store from './store'
import { Ctx } from './types'

const Catelogs = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page loaded={$.state._loaded}>
        <Tabs />
      </Page>
      <Heatmap bottom={_.bottom} id='用户目录' screen='Catelogs' />
    </>
  ))
}

export default ic(Store, Catelogs)
