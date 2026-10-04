/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 *
 * 找文库
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import Header from '../anime/header'
import List from './component/list'
import { useWenkuPage } from './hooks'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 找文库 */
function Wenku(props: NavigationProps) {
  const { id, $ } = useWenkuPage(props)

  return (
    <Component id='screen-wenku'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header title='找文库' alias='文库' hm={HM} />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Wenku)
