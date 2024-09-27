/*
 * @Author: czy0729
 * @Date: 2024-09-27 16:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 16:49:25
 */
import { useCallback, useState } from 'react'
import { StatusBar } from '@components'
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
    await $.batch(true)
    setRefreshing(false)
  }, [setRefreshing])

  return {
    refreshing,
    handleRefresh
  }
}
