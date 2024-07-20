/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 00:07:04
 */
import React from 'react'
import { Component, Page, Text } from '@components'
import { FilterSwitch } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from '../anime/header'
import List from './component/list'
import Store from './store'
import { Ctx } from './types'

/** 找番剧 */
const NSFW = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-nsfw'>
      <Header title='找番剧' alias='NSFW' hm={['nsfw', 'NSFW']} />
      <Page loaded={$.state._loaded}>
        {!$.access ? (
          <>
            <FilterSwitch name='NSFW' />
            <Text style={_.mt.lg} align='center'>
              游客或您所在的用户组暂不开放此功能
            </Text>
          </>
        ) : (
          <List />
        )}
      </Page>
    </Component>
  ))
}

export default ic(Store, NSFW)
