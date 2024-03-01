/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-02 05:03:34
 */
import React from 'react'
import { Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailOverviewPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 热门榜单 */
const TinygrailOverview = (props, context: Ctx) => {
  useTinygrailOverviewPage(context)

  const { $ } = context
  return useObserver(() => (
    <>
      <Header />
      <Page
        style={_.container.tinygrail}
        loadingColor={_.colorTinygrailText}
        loaded={$.state._loaded}
      >
        <Tabs />
      </Page>
    </>
  ))
}

export default ic(Store, TinygrailOverview)
