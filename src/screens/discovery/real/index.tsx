/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 04:11:00
 *
 * 找三次元
 */
import { observer } from 'mobx-react'
import { Component, FooterEmptyData, HeaderPlaceholder, Page } from '@components'
import { FilterSwitch } from '@_'
import { StoreContext, userStore } from '@stores'
import Header from '../anime/header'
import List from './component/list'
import { useRealPage } from './hooks'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 找三次元 */
function Real(props: NavigationProps) {
  const { id, $ } = useRealPage(props)

  return (
    <Component id='screen-real'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          {userStore.isExtremeLimit ? (
            <>
              <FilterSwitch name='三次元' />
              <FooterEmptyData />
            </>
          ) : (
            <List />
          )}
        </Page>
        <Header title='找三次元' alias='Real' hm={HM} />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Real)
