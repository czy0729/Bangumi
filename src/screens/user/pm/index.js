/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 01:52:12
 */
import React from 'react'
import { Header } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Page from './page'
import Heatmaps from './heatmaps'
import Store from './store'

const PM = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header title='短信' hm={['pm', 'PM']} />
      <Page />
      <Heatmaps />
    </>
  ))
}

export default ic(Store, PM)
