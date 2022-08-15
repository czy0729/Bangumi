/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-15 04:52:21
 */
import React from 'react'
import { Header } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Page from './page'
import Check from './check'
import Store from './store'
import { Ctx } from './types'

const UserSetting = (props, { $ }: Ctx) => {
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
