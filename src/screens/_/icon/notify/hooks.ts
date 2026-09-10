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

/** 全局单例定时器: 多个 header 的图标只注册一份轮询 */
const globalTimers: {
  first?: ReturnType<typeof setTimeout>
  notify?: ReturnType<typeof setInterval>
  pm?: ReturnType<typeof setInterval>
} = {}

/** 当前挂载的实例数: 由最后一个卸载的实例负责清理 */
let mountCount = 0

export function useIconNotify({
  navigation,
  event
}: Pick<IconNotifyProps, 'navigation' | 'event'>) {
  useMount(() => {
    mountCount += 1

    if (!globalTimers.notify) {
      globalTimers.first = setTimeout(() => {
        if (userStore.isWebLogin) rakuenStore.fetchNotify()
      }, 10000)

      globalTimers.notify = setInterval(() => {
        if (userStore.isWebLogin) rakuenStore.fetchNotify()
      }, M2 * 1000)

      globalTimers.pm = setInterval(() => {
        if (userStore.isWebLogin) userStore.fetchPM(true, 'pmIn')
      }, M5 * 1000)
    }

    /**
     * 卸载时停止轮询, 避免页面退出后定时器与 store 闭包常驻
     * 按引用计数清理: 只有最后一个实例卸载才真正清掉, 否则先卸载的实例会把其他实例仍在用的轮询一并停掉
     */
    return () => {
      mountCount -= 1
      if (mountCount > 0) return

      clearTimeout(globalTimers.first)
      clearInterval(globalTimers.notify)
      clearInterval(globalTimers.pm)
      globalTimers.first = undefined
      globalTimers.notify = undefined
      globalTimers.pm = undefined
    }
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
