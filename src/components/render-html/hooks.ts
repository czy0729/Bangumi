/*
 * @Author: czy0729
 * @Date: 2026-11-24 11:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 11:30:00
 */
import { useEffect, useState } from 'react'
import { systemStore } from '@stores'
import { translateAll } from '../katakana/utils'

/** 片假名终结者翻译结果, 与原实现一致仅在挂载时翻译一次 */
export function useKatakana(html: string, katakana?: boolean) {
  const [katakanaResult, setKatakanaResult] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!katakana || !systemStore.setting.katakana) return

    let cancelled = false
    translateAll(html).then(result => {
      if (cancelled || !result) return

      setKatakanaResult(result)
    })

    return () => {
      cancelled = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return katakanaResult
}
