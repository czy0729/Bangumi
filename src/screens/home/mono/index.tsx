/*
 * @Author: czy0729
 * @Date: 2019-05-11 04:19:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 17:42:14
 */
import React, { useCallback, useEffect } from 'react'
import { Page, Heatmap } from '@components'
import { useOnScroll } from '@components/header/utils'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter, useViewport } from '@utils/hooks'
import Header from './header'
import List from './list'
import Item from './item'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleBottom])

  const { fixed, onScroll: onUseOnScroll } = useOnScroll()
  const onScroll = useCallback(
    evt => {
      onUseViewport(evt)
      onUseOnScroll(evt)
    },
    [onUseOnScroll, onUseViewport]
  )

  return useObserver(() => (
    <>
      <Page>
        <List renderItem={renderItem} onScroll={onScroll} />
        <Heatmap id='人物' screen='Mono' />
      </Page>
      <Header fixed={fixed} />
    </>
  ))
}

export default ic(Store, Topic)

function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
