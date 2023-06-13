/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-12 04:26:34
 */
import React, { useEffect } from 'react'
import { Page, Header } from '@components'
import { TapListener } from '@_'
import { uiStore } from '@stores'
import { ic } from '@utils/decorators'
import { useIsFocused, useObserver, useRunAfter } from '@utils/hooks'
import Setting from './setting'
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
    const { type, list } = $.state
    return (
      <>
        <Header
          title='猜你喜欢'
          hm={['like', 'Like']}
          headerRight={() => <Setting length={list[type]?.length} />}
        />
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
