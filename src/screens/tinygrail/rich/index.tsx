/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:29:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:44:52
 */
import { observer } from 'mobx-react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import TinygrailPage from '@tinygrail/_/page'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailRichPage } from './hooks'

import type { NavigationProps } from '@types'

/** 番市首富 */
function TinygrailRich(props: NavigationProps) {
  const { id } = useTinygrailRichPage(props)

  return (
    <Component id='screen-tinygrail-rich'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <Tabs />
        </TinygrailPage>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(TinygrailRich)
