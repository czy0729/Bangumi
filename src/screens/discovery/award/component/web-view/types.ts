/*
 * @Author: czy0729
 * @Date: 2026-04-30 00:30:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-30 00:31:29
 */
import type { Fn } from '@types'

export type Props = {
  year: string
  source: {
    html: string
    baseUrl: string
  }
  onLoad: Fn
  onError: Fn
  onMessage: Fn
}
