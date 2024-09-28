/*
 * @Author: czy0729
 * @Date: 2024-09-27 16:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 18:58:39
 */
import { useCallback, useState } from 'react'
import { StatusBar } from '@components'
import { systemStore } from '@stores'
import { info } from '@utils'
import { useFocusEffect, useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 词云页面逻辑 */
export function useWordCloudPage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
  })

  useFocusEffect(() => {
    setTimeout(() => {
      StatusBar.setBarStyle('light-content')
    }, 40)
  })

  const [refreshing, setRefreshing] = useState(false)
  const handleRefresh = useCallback(async () => {
    setRefreshing(true)

    if (systemStore.advance) {
      if ($.subjectId) {
        await $.batchSubjectThenCut(true)
      } else if ($.topicId) {
        await $.cutTopic()
      }
    } else {
      info('由于此服务需要消耗大量服务器资源\n暂不对非付费用户提供主动刷新功能', 5)
    }

    setRefreshing(false)
  }, [setRefreshing])

  return {
    refreshing,
    handleRefresh
  }
}
