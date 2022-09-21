/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-14 17:52:56
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
import { Ctx } from './types'

const Hentai = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header title='找番剧' alias='Hentai' hm={['hentai', 'Hentai']} />
      <Page loaded={$.state._loaded}>
        {!$.access ? (
          <>
            <FilterSwitch name='Hentai' />
            <Text style={_.mt.lg} align='center'>
              游客或您所在的用户组暂不开放此功能
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
