/*
 * @Author: czy0729
 * @Date: 2024-03-22 05:02:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 06:10:52
 */
import React from 'react'
import { Component } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 我回复的话题 */
const Replies = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    return (
      <Component id='screen-replies'>
        <Header />
      </Component>
    )
  })
}

export default ic(Store, Replies)
