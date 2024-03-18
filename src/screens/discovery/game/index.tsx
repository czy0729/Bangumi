/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:09:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-18 21:32:40
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from '../anime/header'
import List from './components/list'
import Store from './store'
import { Ctx } from './types'

const Game = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-game'>
      <Header title='找游戏' alias='游戏' hm={['game', 'Game']} />
      <Page loaded={$.state._loaded}>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Game)
