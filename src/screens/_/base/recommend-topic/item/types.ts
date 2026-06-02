/*
 * @Author: czy0729
 * @Date: 2026-05-15 21:47:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 10:00:00
 */
import type { Fn, WithIndex, WithNavigation } from '@types'
import type { RecommendTopicItem } from '@utils/kv/type'

export type Props = WithNavigation<WithIndex<RecommendTopicItem>> & {
  openWebBrowser: boolean
  onClose: Fn
}
