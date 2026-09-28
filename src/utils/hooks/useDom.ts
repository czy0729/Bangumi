/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:01:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 05:19:21
 */
import { useEffect, useRef } from 'react'

/** Web 事件最小结构 (项目未启用 DOM lib) */
type DomEvent = {
  preventDefault: () => void
  pageX: number
}

/** Web 元素最小结构 (项目未启用 DOM lib) */
type DomElement = {
  classList: {
    add(cls: string): void
    remove(cls: string): void
  }
  style: Record<string, string>
  offsetLeft: number
  scrollLeft: number
  addEventListener(type: string, listener: (event: DomEvent) => void): void
  removeEventListener(type: string, listener: (event: DomEvent) => void): void
  remove(): void
}

/**
 * 为元素追加样式类 (web only)
 *
 * @param cls 要追加的样式类名
 * @returns 目标元素的 ref, 挂载到需要追加类名的元素上
 */
export default function useDom(cls: string) {
  const ref = useRef<DomElement | null>(null)
  useEffect(() => {
    if (cls) ref.current.classList.add(cls)
  }, [cls])
  return ref
}
