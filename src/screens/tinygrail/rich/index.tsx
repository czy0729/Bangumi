/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:29:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 17:07:38
 */
import React from 'react'
import { Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailRichPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 番市首富 */
const TinygrailRich = (props, context: Ctx) => {
  useTinygrailRichPage(context)

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

export default ic(Store, TinygrailRich)
