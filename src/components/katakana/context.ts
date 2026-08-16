/*
 * @Author: czy0729
 * @Date: 2026-08-15 05:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 06:16:57
 */
import { createContext } from 'react'
import { FROZEN_FN } from '@constants'

import type { KatakanaContextValue } from './types'

export const KatakanaContext = createContext<KatakanaContextValue>({
  enabled: false,
  onKatakana: FROZEN_FN
})
