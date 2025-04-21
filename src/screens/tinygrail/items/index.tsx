/*
 * @Author: czy0729
 * @Date: 2020-03-05 17:59:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 04:16:14
 */
import React from 'react'
import { Component, HeaderV2 } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
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
        <HeaderV2 backgroundStyle={_.container.tinygrail} title='我的道具' hm={HM} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailItems
