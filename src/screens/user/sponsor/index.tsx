/*
 * @Author: czy0729
 * @Date: 2022-09-07 00:07:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 21:23:08
 */
import React from 'react'
import { Component, Page } from '@components'
import { useObserver, useRunAfter } from '@utils/hooks'
import { ic } from '@utils/decorators'
import Header from './header'
import List from './list'
import Chart from './chart'
import Store from './store'
import { Ctx } from './types'

const Sponsor = (props, { $, navigation }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { list } = $.state
    return (
      <Component id='screen-sponsor'>
        <Page>
          <Header />
          {list ? <List /> : <Chart navigation={navigation} />}
        </Page>
      </Component>
    )
  })
}

export default ic(Store, Sponsor)
