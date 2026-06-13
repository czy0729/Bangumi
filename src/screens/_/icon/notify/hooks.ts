/*
 * @Author: czy0729
 * @Date: 2026-06-13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-13 12:00:00
 */
import { useCallback } from 'react'
import { rakuenStore, userStore } from '@stores'
import { t } from '@utils/fetch'
import { useMount } from '@utils/hooks'
import { M2, M5 } from '@constants'

import type { Props as IconNotifyProps } from './types'

let isSetInterval = false

export function useIconNotify({
  navigation,
  event
}: Pick<IconNotifyProps, 'navigation' | 'event'>) {
  useMount(() => {
    if (isSetInterval) return
    isSetInterval = true

    setTimeout(() => {
      if (userStore.isWebLogin) rakuenStore.fetchNotify()
    }, 10000)

    setInterval(() => {
      if (userStore.isWebLogin) rakuenStore.fetchNotify()
    }, M2 * 1000)

    setInterval(() => {
      if (userStore.isWebLogin) userStore.fetchPM(true, 'pmIn')
    }, M5 * 1000)
  })

  const hasNewNotify = !!rakuenStore.notify.unread
  const { hasNewPM } = userStore

  const handlePress = useCallback(() => {
    if (!userStore.isWebLogin) {
      navigation.push('LoginV2')
      return
    }

    navigation.push('Notify', {
      type: hasNewPM ? 'pm' : 'notify'
    })

    const { id, data } = event
    t(id, {
      to: 'Notify',
      ...data
    })
  }, [event, hasNewPM, navigation])

  return {
    hasNewNotify,
    hasNewPM,
    handlePress
  }
}
