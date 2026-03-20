/*
 * @Author: czy0729
 * @Date: 2024-01-06 01:27:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:13:56
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Track } from '@components'
import { ErrorNotice, ListenSharedText, LoginNotice } from '@_'
import { useStore } from '@stores'
import { appNavigate } from '@utils'
import { ANDROID, WEB } from '@constants'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Extra() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleTextReceived = useCallback(
    (text: string) => {
      if (!navigation) return

      const trimmedText = typeof text === 'string' ? text.trim() : ''
      if (trimmedText && /^https?:\/\//.test(trimmedText)) {
        appNavigate(trimmedText, navigation)
        return
      }

      navigation.push('Search', {
        value: trimmedText,
        _autoFocus: false
      })
    },
    [navigation]
  )

  return (
    <>
      <Track title='首页' hm={$.hm} />
      <ErrorNotice />
      {!WEB && <LoginNotice />}
      {ANDROID && <ListenSharedText onTextReceived={handleTextReceived} />}
    </>
  )
}

export default observer(Extra)
