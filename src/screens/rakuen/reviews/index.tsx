/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:18:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-26 21:20:03
 */
import React from 'react'
import { Page, ScrollView } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Reviews = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page loaded={$.reviews._loaded}>
        <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
          <List />
        </ScrollView>
      </Page>
    </>
  ))
}

export default ic(Store, Reviews)
