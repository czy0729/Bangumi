/*
 * @Author: czy0729
 * @Date: 2022-11-22 22:39:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:26:16
 */
import React from 'react'
import { Component, Page, ScrollView } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Create from './component/create'
import List from './component/list'
import Header from './header'
import { useActionsPage } from './hooks'
import { memoStyles } from './styles'

/** 自定义跳转 */
const Actions = (props: NavigationProps) => {
  const { id, $ } = useActionsPage(props)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-actions'>
        <StoreContext.Provider value={id}>
          <Header />
          <Page loaded={$.state._loaded}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <List />
              <Create />
            </ScrollView>
          </Page>
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default Actions
