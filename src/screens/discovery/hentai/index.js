/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 07:03:37
 */
import React from 'react'
import { Page, Text } from '@components'
import { FilterSwitch } from '@screens/_'
import { _ } from '@stores'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Extra from '../anime/extra'
import List from './list'
import Store from './store'

const Wenku = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })

    return () => {
      $.scrollToOffset = null
    }
  })

  return useObserver(() => (
    <Page>
      {!$.access ? (
        <>
          <FilterSwitch name='Hentai' />
          <Text style={_.mt.lg} align='center'>
            此功能暂不开放
          </Text>
        </>
      ) : (
        <List />
      )}
    </Page>
  ))
}

export default injectWithHeader(Store, Wenku, {
  screen: '找番剧',
  alias: 'Hentai',
  hm: ['hentai', 'Hentai'],
  defaultExtra: <Extra title='Hentai' />
})
