/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-23 14:24:56
 */
import React from 'react'
import { Page, Header } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Tabs from './tabs'
import Store from './store'
import { TABS } from './ds'
import { Ctx } from './types'

const Versions = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    return (
      <>
        <Header title='更新内容' hm={['versions', 'Versions']} />
        <Page>{!!$.state._loaded && <Tabs routes={TABS} />}</Page>
      </>
    )
  })
}

export default ic(Store, Versions)
