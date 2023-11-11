/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:22:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 20:10:29
 */
import React, { useRef } from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver, useMount } from '@utils/hooks'
import Header from './header'
import Textarea from './textarea'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Dollars = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  const interval = useRef(null)
  useMount(() => {
    interval.current = setInterval(() => {
      $.updateDollars()
    }, 8000)

    return () => {
      $.scrollViewRef = null
      $.inputRef = null
      clearInterval(interval.current)
    }
  })

  return useObserver(() => (
    <Component id='screen-dollars'>
      <Header />
      <Page loaded={$.dollars._loaded}>
        <Textarea />
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Dollars)
