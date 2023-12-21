/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-21 23:29:37
 */
import React, { useCallback } from 'react'
import { Page, Component } from '@components'
import { TapListener } from '@_'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Item from './item'
import TouchScroll from './touch-scroll'
import Heatmaps from './heatmaps'
import Bottom from './bottom'
import Store from './store'
import { useTopicPage } from './hooks'
import { Ctx } from './types'

const Topic = (props, { $ }: Ctx) => {
  const {
    fixed,
    rendered,
    forwardRef,
    fixedTextareaRef,
    onFloorPress,
    onScroll,
    onShowFixedTextarea,
    onScrollToIndexFailed,
    onDirect
  } = useTopicPage($)

  const renderItem = useCallback(
    ({ item, index }) => (
      <Item
        item={item}
        index={index}
        rendered={rendered}
        onShowFixedTextarea={onShowFixedTextarea}
      />
    ),
    [rendered, onShowFixedTextarea]
  )

  return useObserver(() => {
    return (
      <Component id='screen-topic'>
        <TapListener>
          <Page statusBarEvent={false}>
            <List
              forwardRef={forwardRef}
              renderItem={renderItem}
              onScroll={onScroll}
              onScrollToIndexFailed={onScrollToIndexFailed}
            />
            <TouchScroll onPress={onFloorPress} />
          </Page>
        </TapListener>
        <Header fixed={fixed} />
        <Bottom fixedTextareaRef={fixedTextareaRef} onDirect={onDirect} />
        <Heatmaps />
      </Component>
    )
  })
}

export default ic(Store, Topic)
