/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 20:25:22
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import ListAll from './list-all'
import Store from './store'
import { Ctx } from './types'

const Mine = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { type } = $.state
    return (
      <Component id='screen-mine'>
        <Header />
        <Page>{type === 'mine' ? <List /> : <ListAll />}</Page>
      </Component>
    )
  })
}

export default ic(Store, Mine)
