/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 *
 * 找画集
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import Header from '../anime/header'
import List from './component/list'
import { useAlbumPage } from './hooks'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 找画集 */
function Album(props: NavigationProps) {
  const { id, $ } = useAlbumPage(props)

  return (
    <Component id='screen-album'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header title='找画集' alias='画集' hm={HM} />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Album)
