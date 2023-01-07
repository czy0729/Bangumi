/*
 * @Author: czy0729
 * @Date: 2022-09-07 00:07:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-07 21:42:44
 */
import React from 'react'
import { Page } from '@components'
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
      <Page>
        <Header />
        {list ? <List /> : <Chart navigation={navigation} />}
      </Page>
    )
  })
}

export default ic(Store, Sponsor)
