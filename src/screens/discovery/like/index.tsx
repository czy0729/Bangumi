/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-10 23:49:48
 */
import React from 'react'
import { Page, Header } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Cate from './cate'
import List from './list'
import Tips from './tips'
import Store from './store'
import { Ctx } from './types'

const Like = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    return (
      <>
        <Header title='猜你喜欢' hm={['like', 'Like']} />
        <Page>
          <Cate />
          <List />
          <Tips />
        </Page>
      </>
    )
  })
}

export default ic(Store, Like)
