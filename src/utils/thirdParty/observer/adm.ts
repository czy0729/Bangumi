/*
 * @Author: czy0729
 * @Date: 2026-11-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 15:20:00
 *
 * adm (实例状态) 的创建与 reaction 管理
 *  - 一个组件实例只建一次, 之后的渲染复用同一个对象
 *  - 订阅函数与 track 闭包创建时确定, 渲染热路径零分配
 */
import { Reaction } from 'mobx'

import type { IAdm, RenderFn } from './types'

/**
 * 创建 (或重建) reaction
 * - 重建时 version 自增, 让 getSnapshot 的返回值一定变化, React 才会重新渲染
 * - version 用 number 自增而不是像 mobx-react-lite 那样每次新建 Symbol:
 *   observable 每次变更都会走一遍 reaction 回调, Symbol 会带来持续的分配
 */
export function ensureReaction(adm: IAdm) {
  adm.reaction = new Reaction(adm.name, () => {
    adm.version += 1
    adm.listener?.()
  })
  adm.version += 1
}

export function createAdm(name: string, render: RenderFn): IAdm {
  const adm = {
    name,
    render,
    reaction: null,
    listener: null,
    version: 0,
    result: null,
    error: null
  } as unknown as IAdm

  adm.getSnapshot = () => adm.version

  // Suspense 靠抛 Promise 挂起渲染, 异常必须带出 track 之后再抛:
  // track 中途被异常打断时, 依赖只收集了一半, 组件之后的更新会静默丢失
  adm.track = (props: any, ref: any) => {
    try {
      adm.result = adm.render(props, ref)
    } catch (error) {
      adm.error = error
    }
  }

  // 订阅生命周期即 reaction 生命周期: 挂载时建, 卸载时销毁。
  // 放在 subscribe 而不是 useEffect 里, 是为了避开 render 结束到 effect 执行之间的窗口,
  // 也避免 StrictMode 的 mount -> unmount -> mount 把 reaction 丢在已销毁状态
  adm.subscribe = listener => {
    adm.listener = listener
    if (!adm.reaction) {
      ensureReaction(adm)
      // 重建的 reaction 依赖为空 (track 只能在渲染期执行), 主动通知一次,
      // 让 React 通过快照检查重渲染并补回依赖。正常挂载时 reaction 已在渲染期建好, 不会走到这里
      listener()
    }

    return () => {
      adm.listener = null
      adm.reaction?.dispose()
      adm.reaction = null
    }
  }

  return adm
}
