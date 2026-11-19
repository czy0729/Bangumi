/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 15:20:00
 *
 * autorun: 立即执行一次建立依赖, 依赖变化经 Reaction 调度重跑
 *  - 消费方: @utils/store/react.ts 的 useStoreSelector
 */
import { Reaction } from './engine'

import type { Reaction as ReactionType } from './engine'

export function autorun(
  view: (reaction?: ReactionType) => void,
  opts?: { name?: string }
): () => void {
  const reaction = new Reaction(opts?.name ?? 'autorun', () => track())

  function track(): void {
    if (!reaction.isDisposed_) reaction.track(() => view(reaction))
  }

  track()
  return () => reaction.dispose()
}
