/*
 * @Author: czy0729
 * @Date: 2019-05-11 04:19:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-12 10:25:23
 */
import React, { useCallback, useEffect } from 'react'
import { Page, Heatmap, Component } from '@components'
import { useOnScroll } from '@components/header/utils'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter, useViewport } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Topic = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  const { visibleBottom, onScroll: onUseViewport } = useViewport()
  useEffect(() => {
    $.setState({
      visibleBottom
    })
  }, [$, visibleBottom])

  const { fixed, onScroll: onUseOnScroll } = useOnScroll()
  const onScroll = useCallback(
    evt => {
      onUseViewport(evt)
      onUseOnScroll(evt)
    },
    [onUseOnScroll, onUseViewport]
  )

  return useObserver(() => (
    <Component id='screen-mono'>
      <Page statusBarEvent={false}>
        <List onScroll={onScroll} />
        <Heatmap id='人物' screen='Mono' />
      </Page>
      <Header fixed={fixed} />
    </Component>
  ))
}

export default ic(Store, Topic)
