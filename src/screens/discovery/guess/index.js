/*
 * @Author: czy0729
 * @Date: 2021-02-03 22:47:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-09 15:18:59
 */
import React, { useState } from 'react'
import { Page } from '@components'
import { IconHoriz } from '@_'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import List from './list'
import Store from './store'

const Guess = (props, { $, navigation }) => {
  const [rendered, setRendered] = useState(false)
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()

      setTimeout(() => {
        setRendered(true)
      }, 240)
    })
  })

  return useObserver(() => (
    <Page>
      <List rendered={rendered} />
    </Page>
  ))
}

export default injectWithHeader(Store, Guess, {
  screen: '推荐',
  hm: ['guess', 'Guess'],
  defaultExtra: <IconHoriz />
})
