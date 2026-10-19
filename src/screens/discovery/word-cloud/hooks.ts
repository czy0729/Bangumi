/*
 * @Author: czy0729
 * @Date: 2024-09-27 16:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-29 17:44:07
 *
 * 词云页面逻辑
 */
import { useCallback, useRef, useState } from 'react'
import { StatusBar } from '@components'
import { systemStore, useInitStore } from '@stores'
import { info } from '@utils'
import { usePageLifecycle } from '@utils/hooks'
import { WEB } from '@constants'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 词云页面逻辑 */
export function useWordCloudPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  const [refreshing, setRefreshing] = useState(false)
  const statusBarTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)

    try {
      if (systemStore.advance) {
        if ($.subjectId) {
          await $.batchSubjectThenCut(true)
        } else if ($.topicId) {
          await $.cutTopic()
        } else if ($.monoId) {
          await $.cutMono()
        } else if ($.userId) {
          $.genSubjectCut()
        }
      } else {
        info('由于此服务需要消耗大量服务器资源\n暂不对非付费用户提供主动刷新功能', 5)
      }
    } catch {
      info('刷新失败, 请稍后重试')
    } finally {
      setRefreshing(false)
    }
  }, [$, setRefreshing])

  usePageLifecycle(
    {
      onEnter() {
        $.fetchTrend()
      },
      onFocus() {
        if (statusBarTimer.current) clearTimeout(statusBarTimer.current)
        statusBarTimer.current = setTimeout(() => {
          StatusBar.setBarStyle('light-content')
        }, 40)
      },
      onEnterComplete() {
        $.init()
      },
      onLeave() {
        if (statusBarTimer.current) {
          clearTimeout(statusBarTimer.current)
          statusBarTimer.current = null
        }

        if (!WEB) $.onClose()
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )

  return {
    ...context,

    /** 下拉刷新中 */
    refreshing,

    /** 下拉刷新 */
    handleRefresh
  }
}
