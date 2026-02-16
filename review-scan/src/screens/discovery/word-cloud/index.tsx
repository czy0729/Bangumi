/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:18:18
 */
import React from 'react'
import { RefreshControl } from 'react-native'
import { useObserver } from 'mobx-react'
import { Component, Page, ScrollView } from '@components'
import { _, StoreContext } from '@stores'
import { NavigationProps } from '@types'
import Bg from './component/bg'
import Cavans from './component/cavans'
import Filter from './component/filter'
import Media from './component/media'
import SelectedList from './component/selected-list'
import Header from './header'
import { useWordCloudPage } from './hooks'

/** 词云 */
const WordCloud = (props: NavigationProps) => {
  const { id, $, refreshing, handleRefresh } = useWordCloudPage(props)

  return useObserver(() => (
    <Component id='screen-word-cloud'>
      <StoreContext.Provider value={id}>
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
        <Header />
        <SelectedList />
      </StoreContext.Provider>
    </Component>
  ))
}

export default WordCloud
