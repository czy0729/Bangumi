/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 09:04:58
 */
import React from 'react'
import { Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailICOPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** ICO 榜单 */
const TinygrailICO = (props, context: Ctx) => {
  useTinygrailICOPage(context)

  const { $ } = context
  return useObserver(() => (
    <>
      <Header />
      <Page style={_.container.tinygrail} loaded={$.state._loaded}>
        <Tabs />
      </Page>
    </>
  ))
}

export default ic(Store, TinygrailICO)
