/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:09:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 14:47:10
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from '../anime/header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const ADV = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-adv'>
      <Header title='找 Gal' alias='Gal' hm={['adv', 'ADV']} />
      <Page loaded={$.state._loaded}>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, ADV)
