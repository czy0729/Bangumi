/*
 * @Author: czy0729
 * @Date: 2021-11-20 12:26:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-17 05:38:21
 */
import { useEffect, useRef } from 'react'

/**
 * 获取上一次渲染的值, 首次渲染返回 `undefined`
 *
 * @param value 需要追踪的值
 */
export default function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
