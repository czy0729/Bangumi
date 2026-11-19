/*
 * @Author: czy0729
 * @Date: 2026-11-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 15:20:00
 *
 * class 组件的 observer 支持: 直接 patch 原型并返回原类
 *  - 包一层组件会让 render 跑在 reaction.track 之外, 读到的 observable 不建立依赖
 *  - patch 后实例 ref / 生命周期 / static 属性保留, PureComponent 的 sCU 照常生效
 */
import { Reaction } from 'mobx'

import type { ReactNode } from 'react'

/**
 * patch 原型的 render 与 componentWillUnmount
 * - reaction 与 track 闭包按实例懒建, 每实例只建一次
 * - 不 patch constructor: 首次 render 前一定先经过 render, 懒建即可覆盖
 */
export function observeClassComponent<T>(component: T): T {
  const target = (component as any).prototype
  if (target.__mobxObserved) return component
  target.__mobxObserved = true

  const baseRender = target.render
  const baseWillUnmount = target.componentWillUnmount
  const name = `observer(${
    (component as any).displayName || (component as any).name || 'Component'
  })`

  target.render = function () {
    if (!this.__mobxReaction) {
      const instance = this
      this.__mobxReaction = new Reaction(name, () => {
        if (instance.__mobxReaction) instance.forceUpdate()
      })
      this.__mobxTrack = () => {
        instance.__mobxResult = baseRender.call(instance)
      }
    }

    this.__mobxReaction.track(this.__mobxTrack)
    return this.__mobxResult as ReactNode
  }

  target.componentWillUnmount = function () {
    if (baseWillUnmount) baseWillUnmount.call(this)
    if (this.__mobxReaction) {
      this.__mobxReaction.dispose()
      this.__mobxReaction = null
    }
  }

  return component
}
