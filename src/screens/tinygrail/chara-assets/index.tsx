/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 03:43:23
 */
import React from 'react'
import { Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailCharaAssetsPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 我的持仓 */
const TinygrailCharaAssets = (_props, context: Ctx) => {
  useTinygrailCharaAssetsPage(context)

  const { $ } = context
  return useObserver(() => (
    <>
      <Header />
      <Page
        style={_.container.tinygrail}
        loaded={$.state._loaded}
        loadingColor={_.colorTinygrailText}
      >
        <Tabs />
      </Page>
    </>
  ))
}

export default ic(Store, TinygrailCharaAssets)
