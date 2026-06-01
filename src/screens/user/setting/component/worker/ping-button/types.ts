/*
 * @Author: czy0729
 * @Date: 2026-06-01 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 00:20:35
 */
import type { PingStatus } from '../types'

export type Props = {
  status: PingStatus
  ms: number
  onPress: () => void
}
