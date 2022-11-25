/*
 * @Author: czy0729
 * @Date: 2022-11-22 22:39:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-24 15:42:05
 */
import React from 'react'
import { ScrollView, Page } from '@components'
import { ic } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Create from './create'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

const Actions = (props, { $ }: Ctx) => {
  useMount(() => {
    $.init()
  })

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <Header />
        <Page loaded={$.state._loaded}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <List />
            <Create />
          </ScrollView>
        </Page>
      </>
    )
  })
}

export default ic(Store, Actions)
