/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:09:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 15:38:10
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from '../anime/header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Game = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header title='找游戏' alias='游戏' hm={['game', 'Game']} />
      <Page loaded={$.state._loaded}>
        <List />
      </Page>
    </>
  ))
}

export default ic(Store, Game)
