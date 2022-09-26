/*
 * @Author: czy0729
 * @Date: 2019-05-11 04:19:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-26 20:43:07
 */
import React from 'react'
import { Page, Heatmap } from '@components'
import { useOnScroll } from '@components/header/utils'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from './header'
import List from './list'
import Item from './item'
import Store from './store'
import { Ctx } from './types'

const Topic = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  const { fixed, onScroll } = useOnScroll()
  return useObserver(() => (
    <>
      <Header fixed={fixed} />
      <Page>
        <List renderItem={renderItem} onScroll={onScroll} />
        <Heatmap id='人物' screen='Mono' />
      </Page>
    </>
  ))
}

export default ic(Store, Topic)

function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
