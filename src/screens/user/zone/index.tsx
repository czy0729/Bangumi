/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 07:20:48
 */
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { uiStore } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Page from './page'
import Store from './store'

const Zone = (props, { $ }) => {
  const isFocused = useIsFocused()

  useRunAfter(() => {
    $.init()
  })

  useEffect(() => {
    if (!isFocused) uiStore.closePopableSubject()
  }, [isFocused])

  return useObserver(() => <Page />)
}

export default ic(Store, Zone)
