/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 22:44:37
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import Web from './component/web'
import Header from './header'
import { useVersionsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 更新内容 */
function Versions(props: NavigationProps) {
  const { id, $ } = useVersionsPage(props)

  return (
    <Component id='screen-versions'>
      <StoreContext.Provider value={id}>
        <Page>
          <HeaderPlaceholder />
          {!!$.state._loaded && <Web uri={$.state.uri} />}
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Versions)
