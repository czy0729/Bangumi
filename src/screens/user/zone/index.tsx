/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 12:58:31
 */
import React, { useEffect } from 'react'
import { StatusBar } from '@components'
import { uiStore } from '@stores'
import { ic } from '@utils/decorators'
import { useFocusEffect, useIsFocused, useRunAfter } from '@utils/hooks'
import Page from './page'
import Store from './store'
import { Ctx } from './types'

const Zone = (props, { $ }: Ctx) => {
  const isFocused = useIsFocused()

  useRunAfter(() => {
    $.init()
  })

  useEffect(() => {
    if (!isFocused) uiStore.closePopableSubject()
  }, [isFocused])

  useFocusEffect(() => {
    setTimeout(() => {
      StatusBar.setBarStyle('light-content')
    }, 40)
  })

  return <Page />
}

export default ic(Store, Zone)
