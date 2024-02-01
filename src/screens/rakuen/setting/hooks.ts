/*
 * @Author: czy0729
 * @Date: 2024-01-30 16:24:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-01 18:04:16
 */
import { useEffect } from 'react'
import { rakuenStore, uiStore, userStore } from '@stores'
import { useIsFocused, useMount } from '@utils/hooks'

/** 超展开设置页面逻辑 */
export function useRakuenSettingPage() {
  const isFocused = useIsFocused()
  useEffect(() => {
    if (!isFocused) uiStore.closePopableSubject()
  }, [isFocused])

  useMount(() => {
    if (!userStore.isWebLogin) return

    rakuenStore.downloadSetting()
    rakuenStore.fetchPrivacy()
  })
}
