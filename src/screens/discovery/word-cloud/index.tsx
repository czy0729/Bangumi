/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 03:45:50
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Component, Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter } from '@utils/hooks'
import Bg from './component/bg'
import Cavans from './component/cavans'
import Comment from './component/comment'
import Subject from './component/subject'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 词云 */
const WordCloud = (_props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-word-cloud'>
      <Header />
      <Page>
        <Bg />
        <View style={_.container.inner}>
          <Subject />
          <Cavans />
          <Comment />
        </View>
      </Page>
    </Component>
  ))
}

export default ic(Store, WordCloud)
