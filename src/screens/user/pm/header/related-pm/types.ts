/*
 * @Author: czy0729
 * @Date: 2026-07-07 17:01:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-08 04:27:50
 */
import type { WithNavigation } from '@types'

export type Props = WithNavigation<{
  threads: {
    id: string
    title: string
    current: boolean
  }[]
  url: string
  isNewPM?: boolean
  peerUserId?: string
  peerUserName?: string
  pmFormhash?: string
  pmMsgReceivers?: string
  onThreadChange?: (id: string) => any
}>
