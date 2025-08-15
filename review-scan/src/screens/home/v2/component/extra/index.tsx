/*
 * @Author: czy0729
 * @Date: 2024-01-06 01:27:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-21 00:45:54
 */
import React, { useCallback } from 'react'
import { Track } from '@components'
import { ErrorNotice, ListenSharedText, LoginNotice } from '@_'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { ANDROID, WEB } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Extra() {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  const handleTextReceived = useCallback(
    (text: string) => {
      if (navigation) {
        navigation.push('Search', {
          value: text,
          _autoFocus: false
        })
      }
    },
    [navigation]
  )

  return useObserver(() => (
    <>
      <Track title='首页' hm={$.hm} />
      <ErrorNotice />
      {!WEB && <LoginNotice navigation={navigation} />}
      {ANDROID && <ListenSharedText onTextReceived={handleTextReceived} />}
    </>
  ))
}

export default Extra
