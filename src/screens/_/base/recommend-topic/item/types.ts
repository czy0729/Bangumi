/*
 * @Author: czy0729
 * @Date: 2026-05-15 21:47:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 06:39:49
 */
import type { Fn, WithIndex } from '@types'
import type { RecommendTopicItem } from '@utils/kv/type'

export type Props = WithIndex<RecommendTopicItem> & {
  openWebBrowser: boolean
  onClose: Fn
}
