/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:20:59
 */
import React from 'react'
import { Component, Page, Text } from '@components'
import { FilterSwitch } from '@_'
import { _, StoreContext, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Header from '../anime/header'
import List from './component/list'
import { useNSFWPage } from './hooks'
import { HM } from './ds'

/** 找番剧 */
const NSFW = (props: NavigationProps) => {
  const { id, $, navigation } = useNSFWPage(props)

  return useObserver(() => (
    <Component id='screen-nsfw'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          {userStore.isLimit ? (
            <>
              <FilterSwitch name='NSFW' />
              <Text style={_.mt.lg} align='center'>
                游客或您所在的用户组暂不开放此功能
              </Text>
            </>
          ) : (
            <List $={$} navigation={navigation} />
          )}
        </Page>
        <Header title='找条目' alias='NSFW' hm={HM} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default NSFW
