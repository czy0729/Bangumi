/*
 * @Author: czy0729
 * @Date: 2026-03-21 15:41:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 15:57:38
 */
import type { ScrollToOffset } from '@components'
import type { Ctx } from '../../types'

export type Props = {
  $: Ctx['$']
  onScrollToOffset: ScrollToOffset
}
