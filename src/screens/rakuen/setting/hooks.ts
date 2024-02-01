/*
 * @Author: czy0729
 * @Date: 2024-01-30 16:24:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-30 16:48:17
 */
import { useEffect } from 'react'
import { rakuenStore, uiStore } from '@stores'
import { useIsFocused, useMount } from '@utils/hooks'

/** 超展开设置页面逻辑 */
export function useRakuenSettingPage() {
  const isFocused = useIsFocused()
  useEffect(() => {
    if (!isFocused) uiStore.closePopableSubject()
  }, [isFocused])

  useMount(() => {
    // rakuenStore.downloadSetting()
    rakuenStore.fetchPrivacy()
  })
}
