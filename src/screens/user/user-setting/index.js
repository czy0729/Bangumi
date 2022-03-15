/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 02:16:11
 */
import React from 'react'
import { Header } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Page from './page'
import Check from './check'
import Store from './store'

const UserSetting = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header
        title='个人设置'
        hm={['userSetting', 'UserSetting']}
        headerRight={() => <Check $={$} />}
      />
      <Page />
    </>
  ))
}

export default ic(Store, UserSetting)
