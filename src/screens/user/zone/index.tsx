/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 12:05:46
 */
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { uiStore } from '@stores'
import { ic } from '@utils/decorators'
import { useFocusEffect, useIsFocused, useRunAfter } from '@utils/hooks'
import { STORYBOOK } from '@constants'
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
    if (STORYBOOK) return

    setTimeout(() => {
      StatusBar.setBarStyle('light-content')
    }, 40)
  })

  return <Page />
}

export default ic(Store, Zone)
