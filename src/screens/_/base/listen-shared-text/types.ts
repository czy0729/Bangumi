/*
 * @Author: czy0729
 * @Date: 2025-06-20 16:40:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:07:56
 */
import type { ReactNode } from '@types'

export type Props = {
  onTextReceived?: (text: string) => void
  render?: (props: { sharedText: string | null; clearSharedText: () => void }) => ReactNode
  children?: (props: { sharedText: string | null; clearSharedText: () => void }) => ReactNode
}
