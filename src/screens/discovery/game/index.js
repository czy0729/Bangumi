/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:09:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 06:45:15
 */
import React from 'react'
import { Page } from '@components'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount } from '@utils/hooks'
import Extra from '../anime/extra'
import List from './list'
import Store from './store'

const Game = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })

    return () => {
      $.scrollToOffset = null
    }
  })

  return (
    <Page>
      <List />
    </Page>
  )
}

export default injectWithHeader(Store, Game, {
  screen: '找游戏',
  hm: ['game', 'Game'],
  defaultExtra: <Extra title='游戏' />
})
