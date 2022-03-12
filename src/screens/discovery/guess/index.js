/*
 * @Author: czy0729
 * @Date: 2021-02-03 22:47:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 23:01:08
 */
import React, { useState } from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'

const Guess = (props, { $ }) => {
  const [rendered, setRendered] = useState(false)
  useRunAfter(() => {
    $.init()

    setTimeout(() => {
      setRendered(true)
    }, 240)
  })

  return useObserver(() => (
    <>
      <Header />
      <Page>
        <List rendered={rendered} />
      </Page>
    </>
  ))
}

export default ic(Store, Guess)
