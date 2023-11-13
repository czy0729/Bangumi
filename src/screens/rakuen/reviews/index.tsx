/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:18:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 20:34:10
 */
import React from 'react'
import { Component, Page, ScrollView } from '@components'
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
    <Component id='screen-reviews'>
      <Header />
      <Page loaded={$.reviews._loaded}>
        <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
          <List />
        </ScrollView>
      </Page>
    </Component>
  ))
}

export default ic(Store, Reviews)
