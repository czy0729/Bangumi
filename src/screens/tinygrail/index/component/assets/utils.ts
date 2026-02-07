/*
 * @Author: czy0729
 * @Date: 2025-08-29 05:58:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 07:57:19
 */
import { formatNumber, toFixed } from '@utils'
import { M } from '@constants'

import type { TextType } from '@components'

export function formatValue(value: number, short: boolean): string {
  const isNegative = value < 0
  const abs = Math.abs(value)
  const body = short && abs >= 1000 ? `${toFixed(abs / M, 1)}万` : formatNumber(abs, 1)
  return isNegative && abs !== 0 ? `-${body}` : body
}

export function formatChange(current: number, last: number, short: boolean) {
  const diff = current - last
  if (diff === 0) {
    return {
      text: '',
      color: undefined as TextType | undefined
    }
  }

  const abs = Math.abs(diff)
  const formatted = short && abs >= 1000 ? `${toFixed(abs / M, 1)}万` : formatNumber(abs, 1)
  return {
    text: `${diff > 0 ? '+' : '-'}${formatted}`,
    color: diff > 0 ? 'bid' : ('ask' as TextType)
  }
}
