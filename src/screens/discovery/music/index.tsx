/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 00:00:00
 *
 * 找音乐
 */
import { observer } from 'mobx-react'
import { Component, FooterEmptyData, HeaderPlaceholder, Page } from '@components'
import { FilterSwitch } from '@_'
import { StoreContext, userStore } from '@stores'
import Header from '../anime/header'
import List from './component/list'
import { useMusicPage } from './hooks'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 找音乐 */
function Music(props: NavigationProps) {
  const { id, $ } = useMusicPage(props)

  return (
    <Component id='screen-music'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          {userStore.isExtremeLimit ? (
            <>
              <FilterSwitch name='音乐' />
              <FooterEmptyData />
            </>
          ) : (
            <List />
          )}
        </Page>
        <Header title='找条目' alias='Music' hm={HM} />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Music)
