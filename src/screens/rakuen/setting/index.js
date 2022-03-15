/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 23:11:04
 */
import React from 'react'
import { Header } from '@components'
import { useObserver } from '@utils/hooks'
import Page from './page'

const RakuenSetting = () => {
  return useObserver(() => (
    <>
      <Header title='超展开设置' hm={['rakuen/settings', 'RakuenSetting']} />
      <Page />
    </>
  ))
}

export default RakuenSetting
