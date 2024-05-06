/*
 * @Author: czy0729
 * @Date: 2022-11-22 22:39:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:40:30
 */
import React from 'react'
import { Component, Page, ScrollView } from '@components'
import { ic } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Create from './component/create'
import List from './component/list'
import Header from './header'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

/** 自定义跳转 */
const Actions = (props, { $ }: Ctx) => {
  useMount(() => {
    $.init()
  })

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-actions'>
        <Header />
        <Page loaded={$.state._loaded}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <List />
            <Create />
          </ScrollView>
        </Page>
      </Component>
    )
  })
}

export default ic(Store, Actions)
