/*
 * @Author: czy0729
 * @Date: 2026-08-15 05:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 05:50:00
 */
import { useEffect } from 'react'
import { ensureCacheReady, matchKatakanas, translate } from './utils'

import type { KatakanaContextValue } from './types'

/** 匹配片假名并请求翻译, 翻译完成后通过 onKatakana 上报给 Provider */
export function useKatakanaTranslate(
  isOn: boolean,
  text: string,
  onKatakana: KatakanaContextValue['onKatakana']
) {
  useEffect(() => {
    if (!isOn) return

    let cancelled = false

    const init = () => {
      if (cancelled) return

      const match = matchKatakanas(text)
      if (!match) return

      match.forEach(jp =>
        translate(jp, (item: { jp: string; en: string }) => {
          if (cancelled) return
          onKatakana(item)
        })
      )
    }

    ensureCacheReady().then(init)

    return () => {
      cancelled = true
    }
  }, [isOn, text, onKatakana])
}

export default useKatakanaTranslate
