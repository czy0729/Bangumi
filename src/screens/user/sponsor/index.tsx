/*
 * @Author: czy0729
 * @Date: 2022-09-07 00:07:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-10 11:37:06
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Chart from './component/chart'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 赞助者 */
const Sponsor = (_props, { $, navigation }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-sponsor'>
      <Header />
      <Page loaded={$.state._loaded}>
        {$.state.list ? <List /> : <Chart navigation={navigation} />}
      </Page>
    </Component>
  ))
}

export default ic(Store, Sponsor)
