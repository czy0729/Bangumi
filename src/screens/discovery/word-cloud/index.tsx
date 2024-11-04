/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 20:40:16
 */
import React from 'react'
import { RefreshControl } from 'react-native'
import { useObserver } from 'mobx-react'
import { Component, Page, ScrollView } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import Bg from './component/bg'
import Cavans from './component/cavans'
import Filter from './component/filter'
import Media from './component/media'
import SelectedList from './component/selected-list'
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
        <Media />
        {!!$.state._loaded && (
          <>
            <Filter />
            <ScrollView
              style={_.container.h100}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  colors={[_.colorMain]}
                  titleColor='rgba(255, 255, 255, 0.52)'
                  tintColor='rgba(255, 255, 255, 0.52)'
                  progressBackgroundColor={_._colorDarkModeLevel2}
                  onRefresh={handleRefresh}
                />
              }
            >
              <Cavans />
            </ScrollView>
          </>
        )}
      </Page>
      <SelectedList />
    </Component>
  ))
}

export default ic(Store, WordCloud)
