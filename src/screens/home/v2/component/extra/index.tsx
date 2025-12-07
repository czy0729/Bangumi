/*
 * @Author: czy0729
 * @Date: 2024-01-06 01:27:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 16:55:33
 */
import React, { useCallback } from 'react'
import { Track } from '@components'
import { ErrorNotice, ListenSharedText, LoginNotice } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { ANDROID, WEB } from '@constants'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Extra() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleTextReceived = useCallback(
    (text: string) => {
      if (!navigation) return

      navigation.push('Search', {
        value: text,
        _autoFocus: false
      })
    },
    [navigation]
  )

  return useObserver(() => (
    <>
      <Track title='首页' hm={$.hm} />
      <ErrorNotice />
      {!WEB && <LoginNotice />}
      {ANDROID && <ListenSharedText onTextReceived={handleTextReceived} />}
    </>
  ))
}

export default Extra
