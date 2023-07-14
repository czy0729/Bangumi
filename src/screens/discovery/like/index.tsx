/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-13 07:19:33
 */
import React, { useEffect } from 'react'
import { Page } from '@components'
import { TapListener } from '@_'
import { uiStore } from '@stores'
import { ic } from '@utils/decorators'
import { useIsFocused, useObserver, useRunAfter } from '@utils/hooks'
import Header from './header'
import Cate from './cate'
import List from './list'
import Tips from './tips'
import Store from './store'
import { Ctx } from './types'

const Like = (props, { $ }: Ctx) => {
  const isFocused = useIsFocused()

  useRunAfter(() => {
    $.init()
  })

  useEffect(() => {
    if (!isFocused) uiStore.closePopableSubject()
  }, [isFocused])

  return useObserver(() => {
    return (
      <>
        <Header />
        <Page>
          <Cate />
          <TapListener>
            <List />
          </TapListener>
          <Tips />
        </Page>
      </>
    )
  })
}

export default ic(Store, Like)
