/*
 * @Author: czy0729
 * @Date: 2026-11-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 15:20:00
 *
 * React 侧的接入点, 只有两个 hook, 渲染热路径不做额外分配
 */
import { useRef, useSyncExternalStore } from 'react'
import { createAdm, ensureReaction } from './adm'

import type { ReactNode } from 'react'
import type { IAdm, RenderFn } from './types'

/**
 * 渲染 + 订阅
 * - 顺序固定: 先确保 reaction 存在, 再订阅, 最后 track
 * - track 必须包住被包裹组件的函数调用, 否则组件内读到的 observable 不会建立依赖,
 *   表现为数据变了但不重渲染 (class 组件同理, 见 ./class)
 */
export function useAdmRender(adm: IAdm, props: any, ref: any): ReactNode {
  if (!adm.reaction) ensureReaction(adm)

  useSyncExternalStore(adm.subscribe, adm.getSnapshot)

  const reaction = adm.reaction
  // props 由本次渲染的闭包带入, 不在实例字段上中转, 避免两次渲染交错时读到别人的 props
  reaction.track(() => adm.track(props, ref))
  if (adm.error) {
    const error = adm.error
    adm.error = null
    throw error
  }
  return adm.result
}

/** 取 (或首次创建) 实例级的 adm */
export function useAdm(name: string, render: RenderFn, props: any, ref: any): ReactNode {
  const admRef = useRef<IAdm>(null)
  if (!admRef.current) admRef.current = createAdm(name, render)

  return useAdmRender(admRef.current, props, ref)
}
