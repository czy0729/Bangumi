/*
 * @Author: czy0729
 * @Date: 2023-06-23 14:19:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 06:28:02
 */
import React from 'react'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Web from '@screens/web-view/versions/component/web'
import { NavigationProps } from '@types'
import Header from './header'
import { useTipsPage } from './hooks'

/** 特色功能 */
const Tips = (props: NavigationProps) => {
  const { id, $ } = useTipsPage(props)

  return useObserver(() => {
    return (
      <Component id='screen-tips'>
        <StoreContext.Provider value={id}>
          <Page style={_.container.header}>{!!$.state._loaded && <Web uri={$.state.uri} />}</Page>
          <Header />
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default Tips
