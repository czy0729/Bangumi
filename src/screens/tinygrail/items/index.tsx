/*
 * @Author: czy0729
 * @Date: 2020-03-05 17:59:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 05:12:05
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import TinygrailPage from '@tinygrail/_/page'
import { NavigationProps } from '@types'
import List from './component/list'
import Modal from './component/modal'
import { useTinygrailItemsPage } from './hooks'
import { HM } from './ds'

/** 我的道具 */
const TinygrailItems = (props: NavigationProps) => {
  const { id } = useTinygrailItemsPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-items'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <List />
          <Modal />
        </TinygrailPage>
        <TinygrailHeader title='我的道具' hm={HM} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailItems
