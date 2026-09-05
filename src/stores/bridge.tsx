/*
 * @Author: czy0729
 * @Date: 2026-09-05 23:11:54
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-05 23:11:54
 */
import React, { useContext, useMemo } from 'react'
import { StoreContext } from './utils'

/**
 * 页面 Store 上下文桥接
 *
 * 注册进 react-navigation 原生头部的 headerRight / headerLeft 等渲染函数,
 * 会在屏幕组件树 (StoreContext.Provider 之内) 以外的位置被调用, 导致其内部的
 * useStore 拿不到页面状态机。此 hook 需在树内调用, 捕获当前页面的上下文 id,
 * 返回一个包装函数, 把 render 的返回元素包上 StoreContext.Provider,
 * 使其在任意位置渲染时都能取到页面 Store。
 */
export function useStoreContextBridge() {
  const id = useContext(StoreContext)

  return useMemo(() => {
    return <T extends Function>(render: T): T => {
      if (!id || typeof render !== 'function') return render

      const wrapped = (...args: any[]) => (
        <StoreContext.Provider value={id}>{render(...args)}</StoreContext.Provider>
      )
      return wrapped as unknown as T
    }
  }, [id])
}
