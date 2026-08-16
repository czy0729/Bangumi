/*
 * @Author: czy0729
 * @Date: 2026-08-16 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 10:00:00
 */
import { useCallback, useRef } from 'react'
import { systemStore } from '@stores'
import { copy, feedback, info } from '@utils'
import { t } from '@utils/fetch'
import { getTextSize } from './utils'
import { MUSUME_CONFIG } from './ds'

import type { MusumeKey, Props } from './types'

/** Bangumi 娘锐评框逻辑：文本派生 + 刷新节流 + 人格切换 + 复制 */
export function useMesumeChat({
  value,
  placeholder,
  onRefresh
}: Pick<Props, 'value' | 'placeholder' | 'onRefresh'>) {
  const lastRefreshTime = useRef<number | null>(null)
  const { musumePrompt } = systemStore.setting

  const text = value ? value.trim() : `${MUSUME_CONFIG[musumePrompt].name}${placeholder}`
  const size = getTextSize(text)

  const handleRefresh = useCallback(() => {
    if (!systemStore.advance) {
      const now = Date.now()
      if (lastRefreshTime.current && now - lastRefreshTime.current < 30000) {
        info('普通用户有 30 秒刷新间隔')
        return
      }

      lastRefreshTime.current = now
    }
    onRefresh?.()
  }, [onRefresh])

  const handleSelect = useCallback(
    (key: MusumeKey) => {
      systemStore.setSetting('musumePrompt', key)
      feedback(true)
      handleRefresh()

      t('其他.切换人格', {
        value: key
      })
    },
    [handleRefresh]
  )

  const handleCopy = useCallback(() => {
    copy(text, '已复制')
  }, [text])

  return {
    musumePrompt,
    text,
    size,
    handleRefresh,
    handleSelect,
    handleCopy
  }
}
