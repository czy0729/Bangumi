/*
 * @Author: czy0729
 * @Date: 2020-05-02 21:02:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-09 12:21:21
 */
import React from 'react'
import { Page, ScrollView } from '@components'
import { IconHoriz } from '@_'
import { _ } from '@stores'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import Rank from './rank'
import Friends from './friends'
import Blog from './blog'
import Discuss from './discuss'
import Tags from './tags'
import Store from './store'

const Channel = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })
  })

  return useObserver(() => (
    <Page loaded={$.channel._loaded}>
      <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
        <Rank />
        <Friends />
        <Blog />
        <Discuss />
        <Tags />
      </ScrollView>
    </Page>
  ))
}

export default injectWithHeader(Store, Channel, {
  title: ({ type } = {}) => `${MODEL_SUBJECT_TYPE.getTitle(type)}频道`,
  screen: '频道',
  hm: ['channel', 'Channel'],
  defaultExtra: <IconHoriz name='md-menu' />
})
