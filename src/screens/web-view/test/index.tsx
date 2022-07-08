/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-07 10:23:06
 */
import React from 'react'
import { toJS } from 'mobx'
import { Page, Header } from '@components'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Store from '../../home/v2/store'
import List from './list'

const Test = (props, { $ }) => {
  return useObserver(() => {
    return (
      <>
        <Header title='recyclerlistview' />
        <Page>
          <List list={toJS($.currentUserCollection('动画').list)} />
        </Page>
      </>
    )
  })
}

export default ic(Store, Test)
