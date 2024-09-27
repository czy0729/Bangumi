/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 18:00:32
 */
import React from 'react'
import { RefreshControl, View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Component, Page, ScrollView } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import Bg from './component/bg'
import Cavans from './component/cavans'
import Comment from './component/comment'
import Subject from './component/subject'
import Topic from './component/topic'
import Header from './header'
import { useWordCloudPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 词云 */
const WordCloud = (_props, context: Ctx) => {
  const { refreshing, handleRefresh } = useWordCloudPage(context)

  const { $ } = context
  return useObserver(() => (
    <Component id='screen-word-cloud'>
      <Header />
      <Page>
        <Bg />
        <View style={_.container.inner}>
          {$.subjectId ? <Subject /> : $.topicId ? <Topic /> : null}
          <ScrollView
            style={{
              height: '100%'
            }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          >
            <Cavans />
          </ScrollView>
          <Comment />
        </View>
      </Page>
    </Component>
  ))
}

export default ic(Store, WordCloud)
