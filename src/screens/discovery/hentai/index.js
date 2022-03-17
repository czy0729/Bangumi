/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 18:30:09
 */
import React from 'react'
import { Page, Text } from '@components'
import { FilterSwitch } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from '../anime/header'
import List from './list'
import Store from './store'

const Hentai = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header title='找番剧' alias='Hentai' hm={['hentai', 'Hentai']} />
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
    </>
  ))
}

export default ic(Store, Hentai)
